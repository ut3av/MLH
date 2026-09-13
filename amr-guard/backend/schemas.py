from pydantic import BaseModel, Field
from typing import List, Optional

class RapidSummary(BaseModel):
    patient_alias: Optional[str] = None
    clinical_setting: Optional[str] = None
    infection_site: Optional[str] = None
    organism: Optional[str] = None
    current_antimicrobial: Optional[str] = None
    review_priority: str = Field(description="low | medium | high | unable_to_determine")
    one_sentence_summary: Optional[str] = None
    data_completeness: str = Field(description="complete | partial | poor")

class AntimicrobialAgent(BaseModel):
    original_document_text: Optional[str] = None
    generic_name: Optional[str] = None
    normalized_name: Optional[str] = None
    antimicrobial_class: Optional[str] = None
    route: Optional[str] = None
    documented_dose: Optional[str] = None
    frequency: Optional[str] = None
    start_date: Optional[str] = None
    intended_duration: Optional[str] = None
    indication_if_documented: Optional[str] = None
    current_or_previous_status: Optional[str] = None
    source_reference: Optional[str] = None
    evidence_text: Optional[str] = None
    extraction_confidence: Optional[str] = None

class SusceptibilityResult(BaseModel):
    antibiotic_original_text: Optional[str] = None
    antibiotic_normalized_name: Optional[str] = None
    interpretation: str = Field(description="S | I | R | Not documented")
    mic_value: Optional[str] = None
    mic_unit: Optional[str] = None
    evidence_text: Optional[str] = None
    source_reference: Optional[str] = None

class MicrobiologyReport(BaseModel):
    specimen_type: Optional[str] = None
    specimen_collection_date: Optional[str] = None
    report_date: Optional[str] = None
    organism: Optional[str] = None
    organism_count_or_burden: Optional[str] = None
    susceptibility_results: List[SusceptibilityResult] = []
    mic_values: List[str] = []
    laboratory_comments: List[str] = []
    source_reference: Optional[str] = None
    evidence_text: Optional[str] = None
    extraction_confidence: Optional[str] = None

class PatientFact(BaseModel):
    field: Optional[str] = None
    value: Optional[str] = None
    status: Optional[str] = None
    message: Optional[str] = None
    source_reference: Optional[str] = None
    evidence_text: Optional[str] = None

class Conflict(BaseModel):
    conflict_type: str
    description: str
    document_a: str
    document_b: str
    resolution: str
    confidence: str

class GuidelineEvidence(BaseModel):
    guideline_title: str
    issuing_organization: str
    publication_or_update_date: str
    section: str
    retrieved_passage: str
    document_reference: str
    scope: str
    applicability_note: str

class ReviewFlag(BaseModel):
    flag_id: str
    flag_type: str
    priority: str = Field(description="low | medium | high")
    title: str
    description: str
    why_it_matters: str
    patient_evidence: List[str] = []
    guideline_evidence_ids: List[str] = []
    missing_information: List[str] = []
    clinician_question: str
    recommended_next_review_step: str
    confidence: str = Field(description="low | medium | high")
    status: str = "open"

class ClinicianReviewQuestion(BaseModel):
    question_id: str
    priority: str
    question: str
    reason: str
    supporting_evidence: List[str] = []
    status: str = "open"

class AnalyzeResponse(BaseModel):
    rapid_summary: RapidSummary
    current_antimicrobials: List[AntimicrobialAgent] = []
    previous_antimicrobials: List[AntimicrobialAgent] = []
    microbiology: List[MicrobiologyReport] = []
    allergies: List[PatientFact] = []
    renal_hepatic_data: List[PatientFact] = []
    missing_information: List[PatientFact] = []
    conflicts: List[Conflict] = []
    review_flags: List[ReviewFlag] = []
    retrieved_guideline_evidence: List[GuidelineEvidence] = []
    clinician_review_questions: List[ClinicianReviewQuestion] = []
    disclaimer: str = "For qualified clinician/pharmacist review only. No automated prescription or treatment change generated."
