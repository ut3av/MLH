import os
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Optional
import json
import uuid
from dotenv import load_dotenv

# Ensure dotenv is loaded
load_dotenv()

from google import genai
from google.genai import types

from schemas import (
    AnalyzeResponse, PatientProfile, PatientFact, MissingInformation,
    Conflict, ReviewFlag, KnowledgeChunk
)
from rag_knowledge_base import retrieve_guidelines

app = FastAPI(title="Antigravity API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def run_deterministic_rules(profile: PatientProfile) -> List[ReviewFlag]:
    flags = []
    
    # Check 1: Broad-spectrum therapy and Culture results
    current_abx = next((m.value for m in profile.medications if m.name == "current_antibiotic"), None)
    if current_abx and current_abx.lower() in ["meropenem", "piperacillin", "cefepime"]:
        # Find if there's a susceptible narrower option
        susceptible_options = [c.name for c in profile.cultures if c.value == "SUSCEPTIBLE"]
        if susceptible_options:
            flags.append(ReviewFlag(
                id=str(uuid.uuid4()),
                type="stewardship_review",
                priority="high",
                rationale="Broad-spectrum therapy currently prescribed, but narrower susceptible options documented in culture.",
                patient_evidence=f"Current: {current_abx}. Susceptible: {', '.join(susceptible_options)}",
                guideline_evidence="De-escalation of empirical antimicrobial therapy should be performed as soon as culture and susceptibility results are available.",
                clinician_question="Can therapy be de-escalated to a narrower-spectrum agent based on these culture results?",
                confidence="high"
            ))
            
    # Check 2: Allergy clarification
    for allergy in profile.allergies:
        # Check if severity is missing or reaction is just 'rash'
        if not allergy.value or "rash" in allergy.value.lower() or "unknown" in allergy.value.lower():
             flags.append(ReviewFlag(
                id=str(uuid.uuid4()),
                type="allergy_clarification",
                priority="medium",
                rationale="Allergy severity is unclear or documented vaguely.",
                patient_evidence=f"Allergy reported: {allergy.name} - Reaction: {allergy.value}",
                guideline_evidence="Accurate allergy documentation is critical. Many patients labeled as 'penicillin allergic' can safely receive beta-lactams.",
                clinician_question=f"Can the severity of the '{allergy.name}' allergy be confirmed before avoiding first-line therapies?",
                confidence="high"
            ))
             
    # Check 3: Renal function
    renal_lab = next((l for l in profile.labs if "creatinine" in l.name.lower() or "egfr" in l.name.lower()), None)
    if not renal_lab or not renal_lab.source_reference or "recent" not in renal_lab.source_reference.lower():
         # In a real app we'd parse dates. For MVP we look for lack of recent date
         if current_abx and current_abx.lower() in ["meropenem", "vancomycin"]:
             flags.append(ReviewFlag(
                id=str(uuid.uuid4()),
                type="renal_review",
                priority="high",
                rationale="Renal result is absent or potentially outdated while receiving renally-cleared medication.",
                patient_evidence=f"Medication: {current_abx}. Lab: {renal_lab.value if renal_lab else 'Not documented'}.",
                guideline_evidence="A serum creatinine or eGFR measurement within the last 48 hours is required for all patients receiving nephrotoxic drugs.",
                clinician_question="Is there a more recent renal function test available to confirm dosing is appropriate?",
                confidence="medium"
            ))

    return flags

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
        # Demo Packet Logic
        profile = PatientProfile(
            age="65",
            sex="Male",
            infection_site="Urinary Tract",
            allergies=[
                PatientFact(category="Allergy", name="Amoxicillin", value="Rash, severity unclear", source_reference="allergy_history.pdf", evidence_text="Allergic to Amox - rash", confidence="high")
            ],
            medications=[
                PatientFact(category="Medication", name="current_antibiotic", value="Meropenem", source_reference="med_chart.pdf, pg 1", evidence_text="Inj Meropenem 1g IV TDS", confidence="high")
            ],
            cultures=[
                PatientFact(category="Microbiology", name="Nitrofurantoin", value="SUSCEPTIBLE", source_reference="culture_report.pdf", evidence_text="Nitrofurantoin: S", confidence="high"),
                PatientFact(category="Microbiology", name="Organism", value="Escherichia coli", source_reference="culture_report.pdf", evidence_text="Culture: E. coli >10^5", confidence="high")
            ],
            labs=[
                PatientFact(category="Lab", name="Creatinine", value="1.8 mg/dL (Outdated)", source_reference="lab_report.pdf", evidence_text="Creatinine 1.8 (3 days ago)", confidence="high")
            ],
            genetics=[]
        )
        
        missing = [
            MissingInformation(field="treatment_duration", reason="Planned duration not documented on med chart"),
            MissingInformation(field="allergy_severity", reason="Only 'rash' documented, severity unknown")
        ]
        
        conflicts = []
        
        flags = run_deterministic_rules(profile)
        
        keywords = ["de-escalation", "allergy", "renal"]
        sources = retrieve_guidelines(keywords)
        
        return AnalyzeResponse(
            case_id=case_id,
            patient_profile=profile,
            missing_information=missing,
            conflicts=conflicts,
            review_flags=flags,
            retrieved_sources=sources,
            disclaimer="For clinician/pharmacist review only."
        )

    # Real Gemini integration would go here. For MVP purposes, if not demo mode, we still return a response or error.
    raise HTTPException(status_code=501, detail="Live Gemini extraction is not fully implemented in this MVP. Please use Demo Mode.")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
