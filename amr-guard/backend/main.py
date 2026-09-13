import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import json
import uuid
from dotenv import load_dotenv

# Ensure dotenv is loaded
load_dotenv()

from schemas import (
    AnalyzeResponse, RapidSummary, AntimicrobialAgent, MicrobiologyReport,
    SusceptibilityResult, PatientFact, Conflict, ReviewFlag,
    ClinicianReviewQuestion, GuidelineEvidence
)
from rag_knowledge_base import retrieve_guidelines

app = FastAPI(title="Antigravity API v2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_case(
    files: List[UploadFile] = File([]),
    patientAlias: str = Form("Unknown"),
    userRole: str = Form("Pharmacist"),
    language: str = Form("English"),
    demo_mode: bool = Form(False)
):
    case_id = str(uuid.uuid4())
    
    if demo_mode:
        # V2 Demo Packet (based on PRD Demonstration Scenario)
        
        rapid_summary = RapidSummary(
            patient_alias=patientAlias,
            clinical_setting="Inpatient / ICU",
            infection_site="Urinary Tract",
            organism="Escherichia coli",
            current_antimicrobial="Meropenem",
            review_priority="high",
            one_sentence_summary="Patient is on broad-spectrum Meropenem for an E. coli UTI with missing duration and unclear allergy history.",
            data_completeness="partial"
        )
        
        current_antimicrobials = [
            AntimicrobialAgent(
                original_document_text="Inj Meropenem 1g IV TDS",
                generic_name="Meropenem",
                normalized_name="Meropenem",
                antimicrobial_class="Carbapenem",
                route="IV",
                documented_dose="1g",
                frequency="TDS",
                start_date="2026-09-10",
                intended_duration=None,
                indication_if_documented="Sepsis",
                current_or_previous_status="Current",
                source_reference="medication_chart.pdf, pg 1",
                evidence_text="Inj Meropenem 1g IV TDS",
                extraction_confidence="high"
            )
        ]
        
        microbiology = [
            MicrobiologyReport(
                specimen_type="Urine",
                specimen_collection_date="2026-09-11",
                report_date="2026-09-13",
                organism="Escherichia coli",
                organism_count_or_burden=">10^5 CFU/mL",
                susceptibility_results=[
                    SusceptibilityResult(antibiotic_original_text="Nitrofurantoin", interpretation="S"),
                    SusceptibilityResult(antibiotic_original_text="Meropenem", interpretation="S"),
                    SusceptibilityResult(antibiotic_original_text="Ciprofloxacin", interpretation="R")
                ],
                source_reference="culture_report.pdf",
                extraction_confidence="high"
            )
        ]
        
        allergies = [
            PatientFact(
                field="Allergy: Amoxicillin",
                value="Rash",
                status="Requires confirmation",
                message="Severity is unclear.",
                source_reference="allergy_history.pdf",
                evidence_text="Allergic to Amox - rash"
            )
        ]
        
        renal_hepatic_data = [
            PatientFact(
                field="Creatinine",
                value="1.8 mg/dL",
                status="Information unavailable",
                message="Lab is 5 days old. Outdated.",
                source_reference="lab_report.pdf",
                evidence_text="Creatinine 1.8 (5 days ago)"
            )
        ]
        
        missing_info = [
            PatientFact(field="treatment_duration", status="Not documented", message="Planned duration not documented on med chart")
        ]
        
        # We simulate fetching RAG guidelines
        rag_results = retrieve_guidelines(["de-escalation", "allergy", "renal"])
        guideline_evidence = [
            GuidelineEvidence(
                guideline_title=chunk.source_title,
                issuing_organization=chunk.organization,
                publication_or_update_date=chunk.version,
                section=chunk.section,
                retrieved_passage=chunk.text,
                document_reference=chunk.id,
                scope="General",
                applicability_note="Standard guidance"
            ) for chunk in rag_results
        ]
        
        review_flags = [
            ReviewFlag(
                flag_id="f1",
                flag_type="stewardship_review",
                priority="high",
                title="Broad-spectrum therapy requires review",
                description="Patient is on Meropenem, but narrower options (Nitrofurantoin) are susceptible.",
                why_it_matters="Reduces resistance pressure and collateral damage.",
                patient_evidence=["Current: Meropenem", "Culture: E. coli susceptible to Nitrofurantoin"],
                guideline_evidence_ids=["icmr_ams_001"],
                clinician_question="Can therapy be de-escalated to a narrower-spectrum agent based on these culture results?",
                recommended_next_review_step="Review culture results with treating team.",
                confidence="high"
            ),
            ReviewFlag(
                flag_id="f2",
                flag_type="allergy_clarification",
                priority="medium",
                title="Allergy history is incomplete",
                description="Amoxicillin allergy is listed as 'rash' without severity.",
                why_it_matters="May inappropriately exclude first-line beta-lactam therapies.",
                patient_evidence=["Allergy: Amoxicillin - Rash"],
                guideline_evidence_ids=["icmr_ams_002"],
                clinician_question="Can the severity of the Amoxicillin allergy be confirmed?",
                recommended_next_review_step="Interview patient or check historical records.",
                confidence="high"
            )
        ]
        
        questions = [
            ClinicianReviewQuestion(
                question_id="q1",
                priority="high",
                question="Can therapy be de-escalated to a narrower-spectrum agent based on these culture results?",
                reason="Culture shows susceptibility to Nitrofurantoin.",
                supporting_evidence=["Culture report: E. coli (S) to Nitrofurantoin"]
            ),
            ClinicianReviewQuestion(
                question_id="q2",
                priority="medium",
                question="Can the severity of the Amoxicillin allergy be confirmed?",
                reason="Only 'rash' is documented.",
                supporting_evidence=["Allergy record"]
            )
        ]
        
        return AnalyzeResponse(
            rapid_summary=rapid_summary,
            current_antimicrobials=current_antimicrobials,
            microbiology=microbiology,
            allergies=allergies,
            renal_hepatic_data=renal_hepatic_data,
            missing_information=missing_info,
            conflicts=[],
            review_flags=review_flags,
            retrieved_guideline_evidence=guideline_evidence,
            clinician_review_questions=questions
        )

    raise HTTPException(status_code=501, detail="Live Gemini extraction is not fully implemented in this MVP. Please use Demo Mode.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
