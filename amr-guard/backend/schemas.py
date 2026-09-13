from pydantic import BaseModel, Field
from typing import List, Optional

class PatientFact(BaseModel):
    category: str
    name: str
    value: Optional[str] = None
    source_reference: Optional[str] = None
    evidence_text: Optional[str] = None
    confidence: Optional[str] = None

class PatientProfile(BaseModel):
    age: Optional[str] = None
    sex: Optional[str] = None
    infection_site: Optional[str] = None
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

class ReviewFlag(BaseModel):
    id: str
    type: str
    priority: str
    rationale: str
    patient_evidence: str
    guideline_evidence: str
    clinician_question: str
    status: str = "open"
    confidence: str

class AnalyzeResponse(BaseModel):
    case_id: str
    patient_profile: PatientProfile
    missing_information: List[MissingInformation]
    conflicts: List[Conflict]
    review_flags: List[ReviewFlag]
    retrieved_sources: List[KnowledgeChunk]
    disclaimer: str = "For clinician/pharmacist review only."
