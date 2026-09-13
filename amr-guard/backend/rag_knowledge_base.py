from typing import List
from schemas import KnowledgeChunk

# Synthetic Knowledge Base for MVP
KNOWLEDGE_BASE = [
    KnowledgeChunk(
        id="who_aware_001",
        source_title="WHO AWaRe Classification",
        organization="WHO",
        version="2023",
        section="Access Group",
        text="Access group antibiotics have lower resistance potential than antibiotics in the other groups. They should be widely available, affordable and quality-assured. Amoxicillin, ampicillin, and nitrofurantoin are examples."
    ),
    KnowledgeChunk(
        id="who_aware_002",
        source_title="WHO AWaRe Classification",
        organization="WHO",
        version="2023",
        section="Watch Group",
        text="Watch group antibiotics have higher resistance potential and includes most of the highest priority critically important antimicrobials for human medicine. Meropenem and ciprofloxacin are Watch group antibiotics."
    ),
    KnowledgeChunk(
        id="who_aware_003",
        source_title="WHO AWaRe Classification",
        organization="WHO",
        version="2023",
        section="Reserve Group",
        text="Reserve group antibiotics should be treated as 'last resort' options, which should be highly tailored and prescribed in highly specific patients and settings, when all other alternatives have failed. Examples include colistin and polymyxin B."
    ),
    KnowledgeChunk(
        id="icmr_ams_001",
        source_title="ICMR Antimicrobial Stewardship Guidelines",
        organization="ICMR",
        version="2024",
        section="De-escalation",
        text="De-escalation of empirical antimicrobial therapy should be performed as soon as culture and susceptibility results are available. Broad-spectrum therapy should be replaced with a narrower-spectrum agent if the isolated organism is susceptible."
    ),
    KnowledgeChunk(
        id="icmr_ams_002",
        source_title="ICMR Antimicrobial Stewardship Guidelines",
        organization="ICMR",
        version="2024",
        section="Allergy Documentation",
        text="Accurate allergy documentation is critical. Many patients labeled as 'penicillin allergic' can safely receive beta-lactams. If the severity or nature of the allergy is unknown or documented vaguely as 'rash', clarification is required before avoiding first-line therapies."
    ),
    KnowledgeChunk(
        id="synth_hosp_001",
        source_title="Local Hospital Antimicrobial Policy",
        organization="Synthetic General Hospital",
        version="2025",
        section="Renal Dosing",
        text="Antimicrobial doses must be adjusted for renal impairment. A serum creatinine or eGFR measurement within the last 48 hours is required for all patients receiving nephrotoxic drugs or drugs cleared renally, including meropenem, vancomycin, and aminoglycosides."
    )
]

def retrieve_guidelines(keywords: List[str]) -> List[KnowledgeChunk]:
    """
    Simple keyword-based retrieval for the MVP.
    Matches any keyword in the chunk's text or section.
    """
    results = []
    normalized_keywords = [k.lower() for k in keywords]
    
    for chunk in KNOWLEDGE_BASE:
        text_lower = chunk.text.lower()
        section_lower = chunk.section.lower()
        title_lower = chunk.source_title.lower()
        
        # Check if any keyword matches
        for keyword in normalized_keywords:
            if keyword in text_lower or keyword in section_lower or keyword in title_lower:
                if chunk not in results:
                    results.append(chunk)
    
    return results
