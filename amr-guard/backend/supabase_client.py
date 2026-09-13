import os
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime

logger = logging.getLogger("supabase_client")

# In-memory storage cache used as a robust fallback and for instantaneous demo availability
_MEMORY_PATIENTS: List[Dict[str, Any]] = [
    {
        "id": "11111111-1111-1111-1111-111111111111",
        "patient_alias": "PT-1042",
        "age": 62,
        "sex": "Male",
        "ward": "Medicine / ICU Bed 08",
        "infection_site": "Bloodstream (Bacteremia)",
        "organism_isolated": "Escherichia coli (>10^5 CFU/mL)",
        "current_antibiotic": "Meropenem 1g IV TDS",
        "status": "Review required",
        "admission_date": datetime.now().isoformat()
    },
    {
        "id": "22222222-2222-2222-2222-222222222222",
        "patient_alias": "PT-1039",
        "age": 54,
        "sex": "Female",
        "ward": "Ward 3 (General)",
        "infection_site": "Complicated urinary tract infection",
        "organism_isolated": "Klebsiella pneumoniae",
        "current_antibiotic": "Piperacillin/Tazobactam 4.5g IV TDS",
        "status": "Timeout due",
        "admission_date": datetime.now().isoformat()
    },
    {
        "id": "33333333-3333-3333-3333-333333333333",
        "patient_alias": "PT-1035",
        "age": 70,
        "sex": "Male",
        "ward": "Surgical Ward 2",
        "infection_site": "Post-operative surgical site infection",
        "organism_isolated": "Gram-negative rod (Preliminary)",
        "current_antibiotic": "Meropenem vs Pip-Taz (Discrepancy)",
        "status": "Document conflict",
        "admission_date": datetime.now().isoformat()
    },
    {
        "id": "44444444-4444-4444-4444-444444444444",
        "patient_alias": "PT-1028",
        "age": 58,
        "sex": "Female",
        "ward": "Respiratory ICU",
        "infection_site": "Hospital-acquired pneumonia",
        "organism_isolated": "Pseudomonas aeruginosa",
        "current_antibiotic": "Cefepime 2g IV BD",
        "status": "Stable monitoring",
        "admission_date": datetime.now().isoformat()
    }
]

_MEMORY_PRESCRIPTIONS: List[Dict[str, Any]] = [
    {
        "id": "p1-1042",
        "patient_alias": "PT-1042",
        "drug_name": "Meropenem",
        "dosage": "1g",
        "frequency": "TDS (Every 8h)",
        "route": "IV",
        "indication": "Empiric coverage for suspected sepsis",
        "status": "Active",
        "prescribing_doctor": "Dr. Sharma (ICU)",
        "source_type": "OCR Extraction",
        "raw_ocr_snippet": "Inj. Meropenem 1g IV TDS started Day 1. Patient hemodynamically stable.",
        "gemini_extracted_notes": "Extracted via Gemini 2.5 Flash from Medication_Chart.pdf page 2. De-escalation candidate.",
        "created_at": datetime.now().isoformat()
    },
    {
        "id": "p2-1042",
        "patient_alias": "PT-1042",
        "drug_name": "Ceftriaxone",
        "dosage": "2g",
        "frequency": "OD (Once daily)",
        "route": "IV",
        "indication": "Targeted de-escalation based on blood AST",
        "status": "Pending Sign-off",
        "prescribing_doctor": "Dr. Mehta (Infectious Diseases)",
        "source_type": "Manual Entry",
        "raw_ocr_snippet": "Blood culture confirmed susceptible to Ceftriaxone (MIC <= 1).",
        "gemini_extracted_notes": "Targeted step-down according to ICMR Step 5 & WHO AWaRe guidelines.",
        "created_at": datetime.now().isoformat()
    },
    {
        "id": "p3-1039",
        "patient_alias": "PT-1039",
        "drug_name": "Piperacillin/Tazobactam",
        "dosage": "4.5g",
        "frequency": "TDS",
        "route": "IV",
        "indication": "Complicated pyelonephritis",
        "status": "Active",
        "prescribing_doctor": "Dr. Sen (Ward 3)",
        "source_type": "OCR Extraction",
        "raw_ocr_snippet": "Day 6 of IV Pip-Taz. Missing creatinine lab.",
        "gemini_extracted_notes": "Antimicrobial timeout scheduled.",
        "created_at": datetime.now().isoformat()
    }
]

_MEMORY_OCR_SCANS: List[Dict[str, Any]] = []

def get_supabase():
    """Initializes and returns Supabase client if keys are set in environment."""
    url = os.getenv("SUPABASE_URL")
    key = os.getenv("SUPABASE_KEY")
    if not url or not key or "your-project" in url or "your_supabase" in key:
        return None
    try:
        from supabase import create_client, Client
        return create_client(url, key)
    except Exception as e:
        logger.warning(f"Supabase connection notice: {e}")
        return None

def fetch_patients() -> List[Dict[str, Any]]:
    """Fetches patients from Supabase or fallback memory store."""
    client = get_supabase()
    if client:
        try:
            res = client.table("patients").select("*").order("created_at", desc=True).execute()
            if res.data and len(res.data) > 0:
                return res.data
        except Exception as e:
            logger.warning(f"Supabase fetch_patients fallback: {e}")
    return _MEMORY_PATIENTS

def create_patient(data: Dict[str, Any]) -> Dict[str, Any]:
    """Creates a new patient record in Supabase or fallback memory."""
    client = get_supabase()
    alias = data.get("patient_alias", "PT-NEW")
    if client:
        try:
            res = client.table("patients").upsert(data, on_conflict="patient_alias").execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logger.warning(f"Supabase create_patient error: {e}")

    # Fallback memory insertion
    existing = next((p for p in _MEMORY_PATIENTS if p["patient_alias"] == alias), None)
    if existing:
        existing.update(data)
        return existing
    else:
        new_p = {
            "id": f"p-{len(_MEMORY_PATIENTS) + 1}",
            "patient_alias": alias,
            "age": data.get("age", 60),
            "sex": data.get("sex", "Male"),
            "ward": data.get("ward", "Inpatient Ward"),
            "infection_site": data.get("infection_site", "Bacterial Infection"),
            "organism_isolated": data.get("organism_isolated", "Pending"),
            "current_antibiotic": data.get("current_antibiotic", "Pending"),
            "status": data.get("status", "Review required"),
            "admission_date": datetime.now().isoformat()
        }
        _MEMORY_PATIENTS.insert(0, new_p)
        return new_p

def fetch_prescriptions(patient_alias: Optional[str] = None) -> List[Dict[str, Any]]:
    """Retrieves prescription records, optionally filtered by patient alias."""
    client = get_supabase()
    if client:
        try:
            query = client.table("prescriptions").select("*").order("created_at", desc=True)
            if patient_alias:
                query = query.eq("patient_alias", patient_alias)
            res = query.execute()
            if res.data and len(res.data) > 0:
                return res.data
        except Exception as e:
            logger.warning(f"Supabase fetch_prescriptions fallback: {e}")

    if patient_alias:
        return [p for p in _MEMORY_PRESCRIPTIONS if p["patient_alias"] == patient_alias]
    return _MEMORY_PRESCRIPTIONS

def add_prescription(data: Dict[str, Any]) -> Dict[str, Any]:
    """Adds a new prescription entry to Supabase or fallback memory."""
    client = get_supabase()
    if client:
        try:
            res = client.table("prescriptions").insert(data).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logger.warning(f"Supabase add_prescription error: {e}")

    new_rx = {
        "id": f"rx-{len(_MEMORY_PRESCRIPTIONS) + 1}",
        "created_at": datetime.now().isoformat(),
        **data
    }
    _MEMORY_PRESCRIPTIONS.insert(0, new_rx)
    return new_rx

def save_ocr_scan_record(data: Dict[str, Any]) -> Dict[str, Any]:
    """Saves an OCR extraction record for audit trail."""
    client = get_supabase()
    if client:
        try:
            res = client.table("ocr_scans").insert(data).execute()
            if res.data:
                return res.data[0]
        except Exception as e:
            logger.warning(f"Supabase save_ocr_scan_record error: {e}")

    rec = {
        "id": f"scan-{len(_MEMORY_OCR_SCANS) + 1}",
        "created_at": datetime.now().isoformat(),
        **data
    }
    _MEMORY_OCR_SCANS.insert(0, rec)
    return rec
