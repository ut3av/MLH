from pydantic import BaseModel, Field
from typing import List, Optional

class PatientFact(BaseModel):
    category: str
    name: str
    value: Optional[str] = None
    source_reference: Optional[str] = None
    page_number: Optional[str] = None
    evidence_text: Optional[str] = None
    confidence: Optional[str] = "high"

class PatientProfile(BaseModel):
    patient_alias: Optional[str] = "Patient Case"
    age: Optional[str] = None
    sex: Optional[str] = None
    infection_site: Optional[str] = None
    comorbidities: List[PatientFact] = []
    prior_exposures: List[PatientFact] = []
    allergies: List[PatientFact] = []
    medications: List[PatientFact] = []
    cultures: List[PatientFact] = []
    labs: List[PatientFact] = []
    genetics: List[PatientFact] = []

class MissingInformation(BaseModel):
    field: str
    reason: str

class Conflict(BaseModel):
    description: str
    sources: List[str]

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
    priority: str  # high, medium, low
    rationale: str
    rationale_hi: Optional[str] = None
    patient_evidence: str
    guideline_evidence: str
    clinician_question: str
    clinician_question_hi: Optional[str] = None
    recommended_next_step: Optional[str] = "Discuss with infectious-disease specialist or clinical pharmacist."
    status: str = "open"  # open, reviewed, escalated, needs_info, not_applicable
    confidence: str = "high"

class AnalyzeResponse(BaseModel):
    case_id: str
    patient_alias: Optional[str] = "Patient Case"
    user_role: Optional[str] = "Hospital Pharmacist"
    language: Optional[str] = "English"
    patient_profile: PatientProfile
    summary_en: Optional[str] = None
    summary_hi: Optional[str] = None
    missing_information: List[MissingInformation]
    conflicts: List[Conflict]
    review_flags: List[ReviewFlag]
    retrieved_sources: List[KnowledgeChunk]
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
