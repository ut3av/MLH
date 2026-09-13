from typing import List
from schemas import KnowledgeChunk

# Curated High-Authority Knowledge Base for DIYA v1.0
KNOWLEDGE_BASE = [
    KnowledgeChunk(
        id="who_aware_001",
        source_title="WHO AWaRe Classification of Antibiotics",
        organization="World Health Organization",
        version="2024 Edition",
        section="Access Group Principles",
        text="Access group antibiotics possess lower resistance potential and are foundational for empiric treatment of common clinical syndromes. They should be widely available, affordable, and prioritized. Examples include Amoxicillin, Ampicillin, Cefazolin, and Nitrofurantoin.",
        publication_date="2024-01-15",
        scope="Global"
    ),
    KnowledgeChunk(
        id="who_aware_002",
        source_title="WHO AWaRe Classification of Antibiotics",
        organization="World Health Organization",
        version="2024 Edition",
        section="Watch Group Stewardship",
        text="Watch group antibiotics have higher resistance potential and include highest-priority critically important antimicrobials (HPCIAs). Their use must be strictly audited and monitored. Meropenem, Ciprofloxacin, Ceftriaxone, and Piperacillin-Tazobactam are Watch group antibiotics.",
        publication_date="2024-01-15",
        scope="Global"
    ),
    KnowledgeChunk(
        id="who_aware_003",
        source_title="WHO AWaRe Classification of Antibiotics",
        organization="World Health Organization",
        version="2024 Edition",
        section="Reserve Group Conservation",
        text="Reserve group antibiotics are 'last resort' options indicated solely for confirmed or high-suspicion multi-drug resistant (MDR/XDR) pathogens when all other alternatives have failed. Colistin, Polymyxin B, and Ceftazidime-Avibactam must be protected by pre-authorization stewardship.",
        publication_date="2024-01-15",
        scope="Global"
    ),
    KnowledgeChunk(
        id="icmr_ams_001",
        source_title="ICMR Treatment Guidelines for Antimicrobial Use",
        organization="Indian Council of Medical Research (ICMR)",
        version="3rd Edition (2024)",
        section="Step 5: De-escalation & Rationalization",
        text="De-escalation of empirical therapy must be performed within 48-72 hours as soon as microbiological culture and susceptibility results are available. Broad-spectrum therapy should be stepped down to a targeted, narrow-spectrum agent whenever the isolated organism exhibits susceptibility.",
        publication_date="2024-03-20",
        scope="India"
    ),
    KnowledgeChunk(
        id="icmr_ams_002",
        source_title="ICMR Treatment Guidelines for Antimicrobial Use",
        organization="Indian Council of Medical Research (ICMR)",
        version="3rd Edition (2024)",
        section="Allergy Verification Protocol",
        text="Accurate documentation of reported drug allergies is crucial. Over 90% of patients labeled as 'penicillin allergic' lack true IgE-mediated anaphylaxis and can safely receive beta-lactams. If allergy severity is unknown or vaguely recorded as 'rash', allergy clarification is required before avoiding first-line beta-lactam therapies.",
        publication_date="2024-03-20",
        scope="India"
    ),
    KnowledgeChunk(
        id="icmr_ams_003",
        source_title="ICMR Antimicrobial Stewardship Curriculum",
        organization="Indian Council of Medical Research (ICMR)",
        version="2024",
        section="Antibiotic Duration & Planned Stop Dates",
        text="All antimicrobial prescriptions must document an explicit clinical indication and planned duration (or specific review date). Unplanned open-ended therapy contributes substantially to antimicrobial resistance and hospital-acquired fungal superinfections.",
        publication_date="2024-05-10",
        scope="India"
    ),
    KnowledgeChunk(
        id="synth_hosp_001",
        source_title="Hospital Antimicrobial Stewardship Policy",
        organization="Synthetic General Hospital AMS Committee",
        version="2025.1",
        section="Renal Dosing & Laboratory Recency",
        text="Antimicrobial dosing must be adjusted dynamically for estimated glomerular filtration rate (eGFR). Serum creatinine or eGFR measured within the past 48 hours is strictly required for patients receiving renally eliminated or nephrotoxic agents (Meropenem, Vancomycin, Aminoglycosides). If renal labs are >48 hours old, immediate repeat testing is warranted.",
        publication_date="2025-01-10",
        scope="Facility Level"
    ),
    KnowledgeChunk(
        id="synth_antibiogram_001",
        source_title="ICU Cumulative Antibiogram",
        organization="Tertiary Care Hospital Microbiology Department",
        version="2025 Annual Update",
        section="Gram-Negative Susceptibility Trends",
        text="Local ICU surveillance indicates 54% ESBL rate in E. coli isolates and 38% carbapenemase resistance in Klebsiella pneumoniae. De-escalation to oral Nitrofurantoin for urinary tract infections or targeted third-generation cephalosporins is highly recommended when susceptible to preserve carbapenem longevity.",
        publication_date="2025-02-01",
        scope="Local ICU (India)"
    ),
    KnowledgeChunk(
        id="cpic_genetics_001",
        source_title="CPIC Clinical Pharmacogenetics Guidelines",
        organization="Clinical Pharmacogenetics Implementation Consortium (CPIC)",
        version="2024 Update",
        section="Pharmacogenomics Safeguard & Anti-Infective Action",
        text="Pharmacogenomic interpretations must only be applied to verified, CLIA/CAP-certified laboratory genotyping results (e.g., CYP2C19 metabolizer status for Voriconazole, HLA-B*57:01 for Abacavir). Clinical decision support tools must never infer or predict genetic variants from patient ethnicity, geography, or clinical presentation. In the absence of a verified laboratory genotype, indicate 'no genetic inference made'.",
        publication_date="2024-04-18",
        scope="International / CPIC"
    )
]

def retrieve_guidelines(keywords: List[str]) -> List[KnowledgeChunk]:
    """
    Retrieve curated guidelines based on clinical keywords (organism, drug, allergy, renal, duration, genetics).
    """
    results = []
    normalized_keywords = [k.lower().strip() for k in keywords if k.strip()]
    
    for chunk in KNOWLEDGE_BASE:
        text_lower = chunk.text.lower()
        section_lower = chunk.section.lower()
        title_lower = chunk.source_title.lower()
        
        # Match keywords
        for keyword in normalized_keywords:
            if (keyword in text_lower or 
                keyword in section_lower or 
                keyword in title_lower):
                if chunk not in results:
                    results.append(chunk)
                    break
    
    return results
