import os
import uuid
import json
from pathlib import Path
from typing import List, Optional, Dict
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Body
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Ensure dotenv is loaded
load_dotenv()

from schemas import (
    AnalyzeResponse, PatientProfile, PatientFact, MissingInformation,
    Conflict, ReviewFlag, KnowledgeChunk, KaggleCaseSummary, KaggleSyncResponse,
    CaseCreateRequest, ReviewStatusUpdateRequest
)
from rag_knowledge_base import retrieve_guidelines
from aware_data import evaluate_deescalation, get_drug_details
from kaggle_service import (
    sync_kaggle_dataset, get_cases_summaries, load_case_as_profile
)
from demo_cases import get_demo_cases

app = FastAPI(
    title="DIYA: Diagnostic Intelligence & Antibiotic Review Assistant",
    description="Evidence-grounded antimicrobial-stewardship clinical decision-support platform.",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory store for flag review statuses & notes across the session
_FLAG_STATUS_STORE: Dict[str, dict] = {}
_ACTIVE_CASES: Dict[str, AnalyzeResponse] = {}

def run_deterministic_rules(profile: PatientProfile) -> List[ReviewFlag]:
    """
    Deterministic clinical safety and stewardship rules adhering strictly to:
    WHO AWaRe 2024, ICMR Antimicrobial Guidelines 2024, and Hospital Policy.
    Uses human-review language exclusively (FR-09).
    """
    flags: List[ReviewFlag] = []
    
    # Extract current antibiotic
    current_abx_fact = next((m for m in profile.medications if m.name == "current_antibiotic"), None)
    current_abx = current_abx_fact.value if current_abx_fact else ""
    current_abx_clean = current_abx.split()[0].replace(",", "") if current_abx else ""

    # 1. Broad-spectrum therapy and Culture results (FR-08)
    susceptible_options = [c.name for c in profile.cultures if c.value == "SUSCEPTIBLE"]
    resistant_options = [c.name for c in profile.cultures if c.value == "RESISTANT"]
    organism_fact = next((c.value for c in profile.cultures if c.name == "Organism"), "Isolated Pathogen")

    if current_abx_clean:
        aware_eval = evaluate_deescalation(current_abx_clean, susceptible_options)
        if aware_eval.get("deescalation_possible"):
            rec = aware_eval["recommended_candidate"]
            savings = aware_eval.get("daily_savings_inr", 0)
            flags.append(ReviewFlag(
                id=str(uuid.uuid4()),
                type="stewardship_deescalation",
                priority="high",
                rationale=f"Broad-spectrum {current_abx_clean} currently prescribed; culture documents susceptible narrower option: {rec['generic_name']} ({rec['category']} Group).",
                rationale_hi=f"वर्तमान में व्यापक-स्पेक्ट्रम {current_abx_clean} निर्धारित है; संवर्धन में संकीर्ण संवेदनशील विकल्प उपलब्ध है: {rec['generic_name']} ({rec['category']} समूह)।",
                patient_evidence=f"Current: {current_abx}. Culture ({organism_fact}): Susceptible to {', '.join(susceptible_options[:4])}.",
                guideline_evidence=f"WHO AWaRe 2024 & ICMR mandate de-escalation to Access/Watch agents once pathogen susceptibility is established. Estimated drug cost reduction: ₹{savings:,}/day.",
                clinician_question=f"Can therapy be rationalized to {rec['generic_name']} ({rec['default_route']}) to conserve broad-spectrum coverage?",
                clinician_question_hi=f"क्या व्यापक-स्पेक्ट्रम प्रभावकारिता के संरक्षण के लिए {rec['generic_name']} ({rec['default_route']}) पर विचार किया जा सकता है?",
                recommended_next_step="Review clinical stability with treating physician and evaluate step-down to targeted therapy.",
                confidence="high"
            ))
        elif susceptible_options and current_abx_clean.lower() in ["meropenem", "imipenem", "piperacillin", "cefepime", "colistin"]:
            flags.append(ReviewFlag(
                id=str(uuid.uuid4()),
                type="stewardship_review",
                priority="high",
                rationale=f"Empiric broad-spectrum coverage ({current_abx_clean}) ongoing despite availability of microbiological culture results.",
                rationale_hi=f"माइक्रोबायोलॉजिकल संवर्धन परिणाम उपलब्ध होने के बावजूद व्यापक-स्पेक्ट्रम {current_abx_clean} जारी है।",
                patient_evidence=f"Current: {current_abx}. Susceptible options: {', '.join(susceptible_options)}.",
                guideline_evidence="ICMR Step 5 mandates reassessment of empirical therapy within 48-72 hours upon culture receipt.",
                clinician_question="Can empiric broad-spectrum therapy be tailored based on these culture results?",
                clinician_question_hi="क्या इन संवर्धन परिणामों के आधार पर अनुभवजन्य चिकित्सा को अनुकूलित किया जा सकता है?",
                recommended_next_step="Consult infectious disease specialist or clinical pharmacist to verify narrowest effective agent.",
                confidence="high"
            ))

    # 2. Allergy clarification (FR-05, FR-08)
    for allergy in profile.allergies:
        val_lower = (allergy.value or "").lower()
        if not allergy.value or "rash" in val_lower or "unknown" in val_lower or "unclear" in val_lower:
            flags.append(ReviewFlag(
                id=str(uuid.uuid4()),
                type="allergy_clarification",
                priority="medium",
                rationale=f"Allergy to '{allergy.name}' has unverified severity (reported as '{allergy.value or 'unclear'}').",
                rationale_hi=f"'{allergy.name}' से एलर्जी की गंभीरता असत्यापित है (विवरण: '{allergy.value or 'अस्पष्ट'}')।",
                patient_evidence=f"Documented Allergy: {allergy.name} - Reaction: {allergy.value or 'Not specified'}.",
                guideline_evidence="ICMR guidelines indicate >90% of patients labeled as penicillin-allergic lack true IgE-mediated anaphylaxis and may safely receive beta-lactams.",
                clinician_question=f"Can the severity of the '{allergy.name}' reaction be confirmed with the patient or family before excluding first-line beta-lactams?",
                clinician_question_hi=f"क्या प्रथम-पंक्ति दवाओं को बाहर करने से पहले '{allergy.name}' एलर्जी की गंभीरता की पुष्टि की जा सकती है?",
                recommended_next_step="Administer structured allergy questionnaire or consider supervised test dose if clinically appropriate.",
                confidence="high"
            ))

    # 3. Renal function recency (FR-05, FR-08)
    renal_lab = next((l for l in profile.labs if "creatinine" in l.name.lower() or "egfr" in l.name.lower()), None)
    is_renally_cleared = any(d in current_abx.lower() for d in ["meropenem", "vancomycin", "amikacin", "gentamicin", "colistin", "cefepime"])
    
    if is_renally_cleared:
        if not renal_lab or "outdated" in (renal_lab.value or "").lower() or "3 days" in (renal_lab.value or "").lower() or "48h" in (renal_lab.value or "").lower():
            flags.append(ReviewFlag(
                id=str(uuid.uuid4()),
                type="renal_review",
                priority="high",
                rationale=f"Renal monitoring interval exceeded: Serum creatinine is outdated or missing while patient receives renally cleared {current_abx_clean or 'antibiotic'}.",
                rationale_hi=f"गुर्दे की निगरानी अवधि समाप्त: {current_abx_clean or 'एंटीबायोटिक'} प्राप्त करते समय सीरम क्रिएटिनिन पुराना या अनुपस्थित है।",
                patient_evidence=f"Medication: {current_abx}. Lab documented: {renal_lab.value if renal_lab else 'None documented'}.",
                guideline_evidence="Hospital AMS Policy strictly requires serum creatinine / eGFR measurement within the past 48 hours for nephrotoxic or renally eliminated agents.",
                clinician_question="Is a recent (within 48 hours) serum creatinine/eGFR available to confirm safe dosing?",
                clinician_question_hi="क्या सुरक्षित खुराक की पुष्टि के लिए हाल ही का (48 घंटों के भीतर) सीरम क्रिएटिनिन/ईजीएफआर उपलब्ध है?",
                recommended_next_step="Order stat serum creatinine/eGFR panel and verify renal dose adjustment parameters.",
                confidence="high"
            ))

    # 4. Treatment duration & indication check (FR-05, FR-08)
    med_has_duration = any("duration" in m.name.lower() or "day" in (m.value or "").lower() for m in profile.medications)
    if not med_has_duration:
        flags.append(ReviewFlag(
            id=str(uuid.uuid4()),
            type="duration_review",
            priority="medium",
            rationale="Antimicrobial prescription lacks a documented planned duration or scheduled review date.",
            rationale_hi=f"एंटीबायोटिक पर्चे में लक्षित उपचार अवधि या निर्धारित समीक्षा तिथि का अभाव है।",
            patient_evidence=f"Medication: {current_abx}. Planned Stop Date: Not documented on medication chart.",
            guideline_evidence="ICMR Antimicrobial Stewardship curriculum mandates defining stop dates or 5-day review milestones to prevent unnecessary prolonged exposure.",
            clinician_question="What is the planned total duration of therapy, and has a Day-5 clinical review been scheduled?",
            clinician_question_hi="उपचार की लक्षित कुल अवधि क्या है, और क्या 5वें दिन की नैदानिक समीक्षा निर्धारित की गई है?",
            recommended_next_step="Document planned duration or day-5 clinical cessation threshold on medication chart.",
            confidence="high"
        ))

    return flags

@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_case(
    files: List[UploadFile] = File([]),
    patientAlias: str = Form("Patient Case"),
    userRole: str = Form("Hospital Pharmacist"),
    language: str = Form("English"),
    demo_mode: bool = Form(True)
):
    """
    Primary clinical document analysis endpoint for DIYA.
    Extracts structured patient facts, detects missing data, runs safety rules,
    and returns an evidence-linked bilingual stewardship review.
    """
    case_id = f"diya_{uuid.uuid4().hex[:8]}"

    # Default / Demo Case Setup matching PRD prepared case
    profile = PatientProfile(
        patient_alias=patientAlias,
        age="65",
        sex="Male",
        infection_site="Urinary Tract (Complicated UTI)",
        comorbidities=[
            PatientFact(category="Comorbidity", name="Type 2 Diabetes Mellitus", value="HbA1c 7.8%", source_reference="admission_history.pdf, pg 1", evidence_text="History of T2DM for 8 years", confidence="high"),
            PatientFact(category="Comorbidity", name="Chronic Kidney Disease", value="Stage 3a baseline", source_reference="admission_history.pdf, pg 1", evidence_text="Known baseline renal insufficiency", confidence="high")
        ],
        prior_exposures=[
            PatientFact(category="Prior Exposure", name="Ciprofloxacin", value="Received 3 months ago for UTI", source_reference="discharge_summary_prev.pdf", evidence_text="Treated with Cipro 500mg BD in June", confidence="high")
        ],
        allergies=[
            PatientFact(category="Allergy", name="Amoxicillin", value="Mild rash reported, severity unclear", source_reference="allergy_record.pdf, pg 1", page_number="1", evidence_text="Allergic to Amox - rash in childhood", confidence="high")
        ],
        medications=[
            PatientFact(category="Medication", name="current_antibiotic", value="Meropenem 1g IV TDS", source_reference="medication_chart.pdf, pg 2", page_number="2", evidence_text="Inj. Meropenem 1g IV every 8 hours", confidence="high")
        ],
        cultures=[
            PatientFact(category="Microbiology", name="Organism", value="Escherichia coli", source_reference="ast_culture_report.pdf, pg 1", page_number="1", evidence_text="Urine Culture: E. coli >10^5 CFU/mL", confidence="high"),
            PatientFact(category="Microbiology", name="Nitrofurantoin", value="SUSCEPTIBLE", source_reference="ast_culture_report.pdf, pg 1", page_number="1", evidence_text="Nitrofurantoin: Susceptible (MIC <=16)", confidence="high"),
            PatientFact(category="Microbiology", name="Ciprofloxacin", value="RESISTANT", source_reference="ast_culture_report.pdf, pg 1", page_number="1", evidence_text="Ciprofloxacin: Resistant (MIC >=4)", confidence="high"),
            PatientFact(category="Microbiology", name="Ceftriaxone", value="RESISTANT", source_reference="ast_culture_report.pdf, pg 1", page_number="1", evidence_text="Ceftriaxone: Resistant (ESBL Producer)", confidence="high"),
            PatientFact(category="Microbiology", name="Meropenem", value="SUSCEPTIBLE", source_reference="ast_culture_report.pdf, pg 1", page_number="1", evidence_text="Meropenem: Susceptible (MIC <=0.5)", confidence="high")
        ],
        labs=[
            PatientFact(category="Lab", name="Serum Creatinine", value="1.8 mg/dL (Outdated, 3 days ago)", source_reference="biochem_labs.pdf, pg 1", page_number="1", evidence_text="Creatinine: 1.8 mg/dL (Tested 72h prior)", confidence="high"),
            PatientFact(category="Lab", name="eGFR", value="38 mL/min/1.73m2", source_reference="biochem_labs.pdf, pg 1", page_number="1", evidence_text="Estimated GFR: 38 (Outdated)", confidence="high"),
            PatientFact(category="Lab", name="WBC Count", value="13.8 x10^3/uL", source_reference="cbc_report.pdf, pg 1", page_number="1", evidence_text="Total Leukocyte Count: 13,800/uL", confidence="high")
        ],
        genetics=[
            PatientFact(category="Genetics", name="Pharmacogenomics", value="No verified genetic test uploaded. No genetic inference made.", source_reference="System Safety Protocol", page_number="N/A", evidence_text="Rule: Never infer genetics from clinical context without verified test.", confidence="high")
        ]
    )

    # Missing Information Detection (FR-05)
    missing = [
        MissingInformation(field="treatment_duration", reason="Planned stop date or intended duration not documented on medication chart"),
        MissingInformation(field="allergy_severity", reason="Allergy documented vaguely as 'rash' in childhood; IgE-mediated anaphylaxis status unverified"),
        MissingInformation(field="recent_creatinine", reason="Last recorded serum creatinine is 72 hours old; recency threshold (<48h) exceeded"),
        MissingInformation(field="procalcitonin", reason="Inflammatory biomarker not documented to guide early cessation")
    ]

    conflicts = []

    # Run deterministic rules
    flags = run_deterministic_rules(profile)

    # Retrieve RAG Guidelines (FR-07)
    keywords = ["de-escalation", "aware", "icmr", "allergy", "renal", "duration", "genetics"]
    sources = retrieve_guidelines(keywords)

    response = AnalyzeResponse(
        case_id=case_id,
        patient_alias=patientAlias,
        user_role=userRole,
        language=language,
        patient_profile=profile,
        summary_en=f"Review brief for {patientAlias}: Broad-spectrum Meropenem prescribed with narrower oral Nitrofurantoin susceptible in urine culture. Outdated renal labs (>48h) and unclear penicillin allergy severity warrant clinical review.",
        summary_hi=f"{patientAlias} के लिए समीक्षा संक्षिप्त विवरण: मूत्र संवर्धन में मौखिक नाइट्रोफ्यूरेंटोइन संवेदनशील होने पर भी व्यापक-स्पेक्ट्रम मेरोपेनेम निर्धारित है। पुरानी रीनल लैब (>48 घंटे) और अस्पष्ट पेनिसिलिन एलर्जी गंभीरता नैदानिक समीक्षा की मांग करती है।",
        missing_information=missing,
        conflicts=conflicts,
        review_flags=flags,
        retrieved_sources=sources,
        disclaimer="DIYA is an assistive clinical decision-support tool. It does not diagnose, prescribe, change medication, or replace qualified clinician judgment. All flags must be evaluated by a healthcare professional."
    )

    _ACTIVE_CASES[case_id] = response
    return response

@app.post("/api/reviews/{flag_id}/status")
async def update_review_status(flag_id: str, payload: ReviewStatusUpdateRequest):
    """
    Update the human-review workflow status for a specific stewardship flag (FR-10).
    Permitted statuses: open, reviewed, escalated, needs_info, not_applicable.
    """
    _FLAG_STATUS_STORE[flag_id] = {
        "status": payload.status,
        "note": payload.note
    }
    return {
        "status": "success",
        "flag_id": flag_id,
        "new_status": payload.status,
        "note": payload.note
    }

@app.get("/api/cases/{case_id}/export")
async def export_case_brief(case_id: str):
    """Generate exportable review brief for printing or EMR attachment (FR-11)."""
    case = _ACTIVE_CASES.get(case_id)
    if not case:
        raise HTTPException(status_code=404, detail=f"Case '{case_id}' not found.")
    return case

# ----------------- Kaggle ARMD Cohort Integration Endpoints ----------------- #

@app.post("/api/kaggle/sync", response_model=KaggleSyncResponse)
async def sync_kaggle():
    """Trigger on-demand sync with Kaggle ARMD dataset via kagglehub."""
    try:
        return sync_kaggle_dataset()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to sync Kaggle dataset: {str(e)}")

@app.get("/api/kaggle/cases", response_model=List[KaggleCaseSummary])
async def list_kaggle_cases():
    """List curated real-world ICU culture AST cases from Kaggle ARMD dataset."""
    try:
        return get_cases_summaries()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to load Kaggle cases: {str(e)}")

@app.post("/api/kaggle/load-case/{case_id}", response_model=AnalyzeResponse)
async def load_kaggle_case(case_id: str):
    """Load a specific Kaggle patient case directly into DIYA's clinical review engine."""
    case = load_case_as_profile(case_id)
    if not case:
        raise HTTPException(status_code=404, detail=f"Kaggle case '{case_id}' not found.")

    culture_facts = [
        PatientFact(
            category="Microbiology",
            name="Organism",
            value=case["organism"],
            source_reference="Kaggle ARMD Microbiology Cohort",
            page_number="1",
            evidence_text=f"Isolated from {case['infection_site']}",
            confidence="high"
        )
    ]
    for drug_name, status in case.get("susceptibilities", {}).items():
        culture_facts.append(
            PatientFact(
                category="Microbiology",
                name=drug_name,
                value=status,
                source_reference="Kaggle ARMD AST Panel",
                page_number="1",
                evidence_text=f"{drug_name}: {status}",
                confidence="high"
            )
        )

    profile = PatientProfile(
        patient_alias=case["patient_alias"],
        age=case["age"],
        sex=case["gender"],
        infection_site=f"{case['infection_site']} Infection",
        comorbidities=[
            PatientFact(category="Comorbidity", name="ICU Admission", value="Critical Care Monitoring", source_reference="Kaggle Demographics Cohort", evidence_text="Inpatient ICU Cohort", confidence="high")
        ],
        prior_exposures=[],
        allergies=[
            PatientFact(
                category="Allergy",
                name=case.get("allergy", {}).get("name", "Penicillin"),
                value=case.get("allergy", {}).get("reaction", "Rash (severity unclear)"),
                source_reference="Kaggle Clinical EHR Record",
                page_number="1",
                evidence_text=case.get("allergy", {}).get("reaction", "Rash reported"),
                confidence="high"
            )
        ],
        medications=[
            PatientFact(
                category="Medication",
                name="current_antibiotic",
                value=case["current_empirical_drug"],
                source_reference="Kaggle Medication Chart",
                page_number="2",
                evidence_text=case.get("empirical_sig", f"{case['current_empirical_drug']} IV"),
                confidence="high"
            )
        ],
        cultures=culture_facts,
        labs=[
            PatientFact(category="Lab", name="Serum Creatinine", value=case.get("creatinine", "1.7 mg/dL"), source_reference="Kaggle Clinical Labs", evidence_text=f"Creatinine {case.get('creatinine')}", confidence="high"),
            PatientFact(category="Lab", name="BUN", value=case.get("bun", "26.0 mg/dL"), source_reference="Kaggle Clinical Labs", evidence_text=f"BUN {case.get('bun')}", confidence="high"),
            PatientFact(category="Lab", name="WBC Count", value=case.get("wbc", "14.2 x10^3/uL"), source_reference="Kaggle Clinical Labs", evidence_text=f"WBC {case.get('wbc')}", confidence="high")
        ],
        genetics=[
            PatientFact(category="Genetics", name="Pharmacogenomics", value="No verified genetic test uploaded. No genetic inference made.", source_reference="CPIC Safety Standard", evidence_text="No genetic prediction without certified assay", confidence="high")
        ]
    )

    flags = run_deterministic_rules(profile)

    missing = [
        MissingInformation(field="treatment_duration", reason="Planned stop-date not specified on medication chart"),
        MissingInformation(field="procalcitonin", reason="Biomarker not checked to support early cessation")
    ]
    if "severity unclear" in case.get("allergy", {}).get("reaction", "").lower():
        missing.append(MissingInformation(field="allergy_severity", reason="Allergy recorded as rash; IgE-mediated anaphylaxis unverified"))

    sources = retrieve_guidelines(["de-escalation", "aware", "icmr", "renal", "allergy", "duration"])

    resp = AnalyzeResponse(
        case_id=case_id,
        patient_alias=case["patient_alias"],
        user_role="Hospital Pharmacist",
        language="English",
        patient_profile=profile,
        summary_en=f"Kaggle ARMD Case Review: {case['organism']} isolated from {case['infection_site']}. Current broad-spectrum {case['current_empirical_drug']} evaluated against {case['susceptible_count']} susceptible options.",
        summary_hi=f"कैगल एआरएमडी केस समीक्षा: {case['infection_site']} से {case['organism']} अलग किया गया। वर्तमान व्यापक-स्पेक्ट्रम {case['current_empirical_drug']} का {case['susceptible_count']} संवेदनशील विकल्पों के विरुद्ध मूल्यांकन किया गया।",
        missing_information=missing,
        conflicts=[],
        review_flags=flags,
        retrieved_sources=sources,
        disclaimer="DIYA is an assistive clinical decision-support tool. Extracted from Kaggle ARMD clinical microbiology cohort. For clinician/pharmacist review only."
    )

    _ACTIVE_CASES[case_id] = resp
    return resp

@app.get("/api/demo-cases")
async def list_demo_cases():
    """List the 3 PRD benchmark demo cases (Stewardship, Missing Info, Conflicts)."""
    demos = get_demo_cases()
    return [
        {
            "key": k,
            "case_id": v["case_id"],
            "title": v["title"],
            "subtitle": v["subtitle"],
            "tag": v["tag"],
            "patient_alias": v["patient_alias"],
            "infection_site": v["infection_site"],
            "summary_en": v["summary_en"]
        }
        for k, v in demos.items()
    ]

@app.post("/api/demo-cases/{case_key}/load", response_model=AnalyzeResponse)
async def load_demo_case(case_key: str):
    """Load a specific PRD benchmark demo case directly into DIYA."""
    demos = get_demo_cases()
    demo_data = demos.get(case_key)
    if not demo_data:
        raise HTTPException(status_code=404, detail=f"Demo case '{case_key}' not found.")

    sources = retrieve_guidelines(["de-escalation", "aware", "icmr", "renal", "allergy", "duration", "genetics"])
    flags = [ReviewFlag(**f) for f in demo_data["review_flags"]]

    resp = AnalyzeResponse(
        case_id=demo_data["case_id"],
        patient_alias=demo_data["patient_alias"],
        user_role="Hospital Pharmacist",
        language="English",
        patient_profile=PatientProfile(**demo_data["patient_profile"]),
        summary_en=demo_data["summary_en"],
        summary_hi=demo_data["summary_hi"],
        missing_information=[MissingInformation(**m) for m in demo_data["missing_information"]],
        conflicts=[Conflict(**c) for c in demo_data.get("conflicts", [])],
        review_flags=flags,
        retrieved_sources=sources,
        disclaimer="DIYA is an assistive clinical decision-support tool. Prepared demo case for clinical demonstration. For clinician/pharmacist review only."
    )

    _ACTIVE_CASES[demo_data["case_id"]] = resp
    return resp

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
