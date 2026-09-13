from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class PatientFact(BaseModel):
    category: Optional[str] = None
    name: str
    value: str
    source_reference: Optional[str] = None
    page_number: Optional[str] = None
    evidence_text: Optional[str] = None
    confidence: Optional[str] = "high"

class MissingInformation(BaseModel):
    field: str
    reason: str
    impact: Optional[str] = None

class Conflict(BaseModel):
    docA: Optional[Dict[str, str]] = None
    docB: Optional[Dict[str, str]] = None
    details: str
    conflict_type: Optional[str] = "discrepancy"

class KnowledgeChunk(BaseModel):
    id: str
    source_title: str
    organization: str
    version: str
    section: str
    text: str
    publication_date: Optional[str] = "2024"
    scope: Optional[str] = "India / Global"

class ReviewFlag(BaseModel):
    id: str
    type: str
    priority: str  # high, medium, attention, review
    rationale: str
    rationale_hi: Optional[str] = None
    patient_evidence: str
    guideline_evidence: str
    clinician_question: str
    clinician_question_hi: Optional[str] = None
    recommended_next_step: Optional[str] = "Discuss with infectious-disease specialist or clinical pharmacist."
    status: str = "open"  # open, reviewed, escalated, needs_info, not_applicable
    confidence: str = "high"

class PatientProfile(BaseModel):
    patient_alias: Optional[str] = "Patient Case"
    age: Optional[str] = "62"
    sex: Optional[str] = "Male"
    ward: Optional[str] = "Medicine / ICU Bed 08"
    infection_site: Optional[str] = "Urinary Tract"
    comorbidities: List[PatientFact] = []
    prior_exposures: List[PatientFact] = []
    allergies: List[PatientFact] = []
    medications: List[PatientFact] = []
    cultures: List[PatientFact] = []
    labs: List[PatientFact] = []
    genetics: List[PatientFact] = []

class AnalyzeResponse(BaseModel):
    case_id: str
    patient_alias: Optional[str] = "Patient Case"
    user_role: Optional[str] = "Hospital Pharmacist"
    language: Optional[str] = "English"
    patient_profile: PatientProfile
    summary_en: Optional[str] = None
    summary_hi: Optional[str] = None
    missing_information: List[MissingInformation] = []
    conflicts: List[Conflict] = []
    review_flags: List[ReviewFlag] = []
    retrieved_sources: List[KnowledgeChunk] = []
    disclaimer: str = "DIYA is an assistive clinical decision-support tool. It does not diagnose, prescribe, change medication, or replace qualified clinician judgment. All flags must be evaluated by a healthcare professional."

class CaseCreateRequest(BaseModel):
    patient_alias: str
    age: Optional[str] = "65"
    sex: Optional[str] = "Male"
    infection_site: Optional[str] = "Urinary Tract"
    language: str = "English"
    user_role: str = "Hospital Pharmacist"

class ReviewStatusUpdateRequest(BaseModel):
    status: str
    note: Optional[str] = None

class KaggleCaseSummary(BaseModel):
    case_id: str
    patient_alias: str
    age: str
    gender: str
    infection_site: str
    organism: str
    susceptible_count: int
    resistant_count: int
    current_empirical_drug: str
    summary_text: str

class KaggleSyncResponse(BaseModel):
    status: str
    message: str
    dataset_slug: str
    dataset_path: str
    total_cases_indexed: int
    sample_cases: List[KaggleCaseSummary] = []

class LoginRequest(BaseModel):
    hospital: str
    email: str
    role: Optional[str] = "Clinical Pharmacist"

class LoginResponse(BaseModel):
    is_authorized: bool
    user: Dict[str, Any]
    token: str
    message: str

class PrescriptionCreateRequest(BaseModel):
    patient_alias: str
    drug_name: str
    dosage: Optional[str] = "1g"
    frequency: Optional[str] = "TDS"
    route: Optional[str] = "IV"
    indication: Optional[str] = None
    status: Optional[str] = "Active"
    prescribing_doctor: Optional[str] = "Dr. Sharma (Clinical Pharmacist)"
    source_type: Optional[str] = "Manual Entry"
    raw_ocr_snippet: Optional[str] = None
    gemini_extracted_notes: Optional[str] = None

