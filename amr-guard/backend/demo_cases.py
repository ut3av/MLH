import uuid
from typing import Dict
from schemas import (
    AnalyzeResponse, PatientProfile, PatientFact, MissingInformation,
    Conflict, ReviewFlag, KnowledgeChunk
)

def get_demo_cases() -> Dict[str, dict]:
    """
    Returns the 3 curated benchmark demo cases strictly specified in DIYA PRD Section 6:
    Case 1 — Stewardship Review (De-escalation opportunity from broad-spectrum Meropenem)
    Case 2 — Missing Information (Distinguishing UNKNOWN from NEGATIVE, missing duration, missing indication)
    Case 3 — Conflicting Documents (Conflicting allergy between nursing & ER, conflicting antibiotics)
    """
    return {
        "demo1": {
            "case_id": "diya_case_1_stewardship",
            "title": "Case 1 — Stewardship Review",
            "subtitle": "Broad-Spectrum Meropenem with Narrower Oral Nitrofurantoin Susceptible",
            "tag": "De-escalation Candidate",
            "patient_alias": "Patient S290 (ICU Bed 08)",
            "age": "62",
            "sex": "Female",
            "infection_site": "Urinary Tract (Complicated Catheter-Associated UTI)",
            "summary_en": "Patient S290 is an inpatient receiving empiric Meropenem 1g IV TDS for urosepsis. Urine culture AST reveals Escherichia coli (>10^5 CFU/mL) fully susceptible to Nitrofurantoin, Ertapenem, and Meropenem, but resistant to Ceftriaxone and Ciprofloxacin. Serum creatinine is 1.8 mg/dL (drawn 72h ago). Opportunity identified to de-escalate to targeted oral therapy, clarify penicillin allergy severity, and refresh renal labs.",
            "summary_hi": "मरीज S290 यूरोसेप्सिस के लिए अनुभवजन्य मेरोपेनेम (Meropenem 1g IV TDS) प्राप्त कर रही हैं। मूत्र संवर्धन (Urine Culture AST) से एस्चेरिचिया कोलाई (E. coli >10^5) का पता चला है जो नाइट्रोफ्यूरेंटोइन (Nitrofurantoin) और एर्टापेनेम के प्रति पूरी तरह संवेदनशील है, लेकिन सेफ्ट्रियाक्सोन और सिप्रोफ्लोक्सासिन के प्रति प्रतिरोधी है। सीरम क्रिएटिनिन 1.8 mg/dL (72 घंटे पहले) है। लक्षित मौखिक चिकित्सा में बदलने, पेनिसिलिन एलर्जी की गंभीरता को स्पष्ट करने और रीनल लैब को ताज़ा करने का अवसर मिला है।",
            "patient_profile": {
                "patient_alias": "Patient S290 (ICU Bed 08)",
                "age": "62",
                "sex": "Female",
                "infection_site": "Urinary Tract (Complicated Catheter-Associated UTI)",
                "comorbidities": [
                    {"category": "Comorbidity", "name": "Type 2 Diabetes Mellitus", "value": "HbA1c 8.1%", "source_reference": "admission_history.pdf", "page_number": "1", "evidence_text": "Known diabetic for 7 years on oral hypoglycemics", "confidence": "high"},
                    {"category": "Comorbidity", "name": "Hypertension", "value": "Stage 2 HTN", "source_reference": "admission_history.pdf", "page_number": "1", "evidence_text": "BP 148/92 on Amlodipine 5mg", "confidence": "high"}
                ],
                "prior_exposures": [
                    {"category": "Prior Exposure", "name": "Ciprofloxacin", "value": "Treated 3 months ago for uncomplicated UTI", "source_reference": "discharge_summary_prev.pdf", "page_number": "1", "evidence_text": "Completed 5 days Ciprofloxacin in June 2026", "confidence": "high"}
                ],
                "allergies": [
                    {"category": "Allergy", "name": "Amoxicillin", "value": "Mild childhood rash, severity unrecorded", "source_reference": "allergy_intake.pdf", "page_number": "1", "evidence_text": "Allergy: Amox -> rash in childhood, severity not documented", "confidence": "high"}
                ],
                "medications": [
                    {"category": "Medication", "name": "current_antibiotic", "value": "Meropenem 1g IV TDS", "source_reference": "medication_chart.pdf", "page_number": "2", "evidence_text": "Inj. Meropenem 1g IV every 8 hours", "confidence": "high"}
                ],
                "cultures": [
                    {"category": "Microbiology", "name": "Organism", "value": "Escherichia coli (>10^5 CFU/mL)", "source_reference": "culture_ast_report.pdf", "page_number": "1", "evidence_text": "Urine culture: Escherichia coli >10^5 CFU/mL isolated", "confidence": "high"},
                    {"category": "Microbiology", "name": "Nitrofurantoin", "value": "SUSCEPTIBLE", "source_reference": "culture_ast_report.pdf", "page_number": "1", "evidence_text": "Nitrofurantoin: Susceptible (MIC <=16)", "confidence": "high"},
                    {"category": "Microbiology", "name": "Meropenem", "value": "SUSCEPTIBLE", "source_reference": "culture_ast_report.pdf", "page_number": "1", "evidence_text": "Meropenem: Susceptible (MIC <=0.5)", "confidence": "high"},
                    {"category": "Microbiology", "name": "Ertapenem", "value": "SUSCEPTIBLE", "source_reference": "culture_ast_report.pdf", "page_number": "1", "evidence_text": "Ertapenem: Susceptible (MIC <=0.25)", "confidence": "high"},
                    {"category": "Microbiology", "name": "Ciprofloxacin", "value": "RESISTANT", "source_reference": "culture_ast_report.pdf", "page_number": "1", "evidence_text": "Ciprofloxacin: Resistant (MIC >=4)", "confidence": "high"},
                    {"category": "Microbiology", "name": "Ceftriaxone", "value": "RESISTANT", "source_reference": "culture_ast_report.pdf", "page_number": "1", "evidence_text": "Ceftriaxone: Resistant (ESBL Phenotype)", "confidence": "high"}
                ],
                "labs": [
                    {"category": "Lab", "name": "Serum Creatinine", "value": "1.8 mg/dL (Outdated, 72h ago)", "source_reference": "biochem_labs.pdf", "page_number": "1", "evidence_text": "Creatinine 1.8 mg/dL (tested 3 days ago)", "confidence": "high"},
                    {"category": "Lab", "name": "eGFR", "value": "38 mL/min/1.73m2", "source_reference": "biochem_labs.pdf", "page_number": "1", "evidence_text": "Estimated GFR: 38 (Outdated)", "confidence": "high"},
                    {"category": "Lab", "name": "WBC Count", "value": "13.8 x10^3/uL", "source_reference": "cbc_report.pdf", "page_number": "1", "evidence_text": "TLC 13,800/uL with 82% neutrophils", "confidence": "high"}
                ],
                "genetics": [
                    {"category": "Genetics", "name": "Pharmacogenomics", "value": "No verified genetic test uploaded. No genetic inference made.", "source_reference": "CPIC Genetic Safeguard", "page_number": "N/A", "evidence_text": "Clinical safeguard: Genetic phenotypes must not be inferred without assay.", "confidence": "high"}
                ]
            },
            "missing_information": [
                {"field": "treatment_duration", "reason": "Planned antibiotic duration or scheduled Day-5 review milestone not documented on medication chart"},
                {"field": "allergy_severity", "reason": "Allergy documented vaguely as 'rash'; IgE-mediated anaphylaxis status is UNKNOWN (not negative)"},
                {"field": "recent_creatinine", "reason": "Serum creatinine recency threshold (<48 hours) exceeded on renally cleared Meropenem"}
            ],
            "conflicts": [],
            "review_flags": [
                {
                    "id": "demo1_flag_1",
                    "title": "Broad-spectrum therapy requires review (De-escalation candidate)",
                    "type": "stewardship_deescalation",
                    "priority": "high",
                    "rationale": "Broad-spectrum Meropenem (Watch Group) is prescribed, but urine AST documents narrower susceptible option: oral Nitrofurantoin (Access Group).",
                    "rationale_hi": "व्यापक-स्पेक्ट्रम मेरोपेनेम (Watch Group) निर्धारित है, जबकि मूत्र संवर्धन में संकीर्ण संवेदनशील विकल्प उपलब्ध है: मौखिक नाइट्रोफ्यूरेंटोइन (Access Group)।",
                    "patient_evidence": "Medication Chart (pg 2): 'Inj. Meropenem 1g IV TDS'. Culture Report (pg 1): 'E. coli susceptible to Nitrofurantoin (MIC <=16)'.",
                    "guideline_evidence": "WHO AWaRe 2024 & ICMR Step 5 mandate de-escalating empirical carbapenems once narrower active Access agents are identified. Estimated drug cost reduction: ₹3,140/day.",
                    "missing_information": ["Patient oral tolerance and clinical stability confirmation"],
                    "clinician_question": "Does patient clinical stability permit de-escalating from IV Meropenem to oral Nitrofurantoin 100mg QID for complicated lower UTI?",
                    "clinician_question_hi": "क्या रोगी की नैदानिक स्थिरता यूटीआई के लिए आईवी मेरोपेनेम से मौखिक नाइट्रोफ्यूरेंटोइन (Nitrofurantoin 100mg) पर डी-एस्केलेट करने की अनुमति देती है?",
                    "next_review_step": "Discuss with attending physician: confirm clinical defervescence and step down to oral targeted therapy.",
                    "status": "open",
                    "confidence": "high"
                },
                {
                    "id": "demo1_flag_2",
                    "title": "Allergy severity is unverified (UNKNOWN vs NEGATIVE)",
                    "type": "allergy_clarification",
                    "priority": "medium",
                    "rationale": "Amoxicillin allergy is vaguely documented as 'rash' in childhood. Severity and IgE-mediated status are unknown, which may unnecessarily restrict beta-lactams.",
                    "rationale_hi": "एमोक्सिसिलिन एलर्जी बचपन के 'चकत्ते' के रूप में अस्पष्ट रूप से दर्ज है। गंभीरता और IgE-मध्यस्थता की स्थिति अज्ञात है, जिससे बीटा-लैक्टम दवाएं अनावश्यक रूप से प्रतिबंधित हो सकती हैं।",
                    "patient_evidence": "Allergy Intake (pg 1): 'Allergy: Amox -> rash in childhood, severity not documented'.",
                    "guideline_evidence": "ICMR Guidelines cite >90% of labeled penicillin allergies lack true anaphylaxis. Confirmation is required before avoiding first-line beta-lactam therapies.",
                    "missing_information": ["Reaction timing, presence of hives/wheezing, subsequent tolerance"],
                    "clinician_question": "Can the severity of the childhood Amoxicillin reaction be clarified to permit safe beta-lactam usage if needed?",
                    "clinician_question_hi": "क्या जरूरत पड़ने पर सुरक्षित बीटा-लैक्टम उपयोग की अनुमति देने के लिए बचपन की एमोक्सिसिलिन प्रतिक्रिया की गंभीरता को स्पष्ट किया जा सकता है?",
                    "next_review_step": "Conduct structured allergy reconciliation interview with patient or attendant.",
                    "status": "open",
                    "confidence": "high"
                },
                {
                    "id": "demo1_flag_3",
                    "title": "Renal laboratory monitoring recency (>48 hours) exceeded",
                    "type": "renal_review",
                    "priority": "high",
                    "rationale": "Patient receives renally cleared Meropenem with baseline CKD (eGFR 38), but serum creatinine was last checked 72 hours ago.",
                    "rationale_hi": "रोगी को गुर्दे से उत्सर्जित मेरोपेनेम दिया जा रहा है (बेसलाइन ईजीएफआर 38), लेकिन सीरम क्रिएटिनिन की अंतिम जांच 72 घंटे पहले की गई थी।",
                    "patient_evidence": "Biochem Labs (pg 1): 'Creatinine 1.8 mg/dL (tested 3 days ago)'. Medication Chart: 'Meropenem 1g IV TDS'.",
                    "guideline_evidence": "Hospital AMS Policy strictly requires serum creatinine / eGFR within 48 hours for renally eliminated drugs to verify dosage accuracy and prevent neurotoxicity.",
                    "missing_information": ["Stat repeat serum creatinine / eGFR"],
                    "clinician_question": "Is a recent serum creatinine available to verify if Meropenem dose should be adjusted from 1g TDS to 1g BD or 500mg BD?",
                    "clinician_question_hi": "क्या यह सत्यापित करने के लिए हाल ही का सीरम क्रिएटिनिन उपलब्ध है कि क्या मेरोपेनेम की खुराक को टीडीएस से बीडी में समायोजित किया जाना चाहिए?",
                    "next_review_step": "Order stat repeat serum creatinine/eGFR panel immediately.",
                    "status": "open",
                    "confidence": "high"
                }
            ]
        },

        "demo2": {
            "case_id": "diya_case_2_missing_info",
            "title": "Case 2 — Missing Information",
            "subtitle": "Distinguishing UNKNOWN from NEGATIVE: Duration, Indication & Allergy Data Absent",
            "tag": "Documentation Gaps",
            "patient_alias": "Patient JC1107638 (Respiratory ICU)",
            "age": "74",
            "sex": "Male",
            "infection_site": "Lower Respiratory / Hospital-Acquired Pneumonia",
            "summary_en": "Patient JC1107638 was initiated on Piperacillin-Tazobactam 4.5g IV QID 6 days ago. The clinical record demonstrates major missing information: treatment duration is absent (open-ended), clinical indication is undocumented, allergy details are listed as 'unknown', and hepatic/renal labs are overdue. Crucially, DIYA treats these as UNKNOWN rather than NEGATIVE, prompting clinician verification.",
            "summary_hi": "मरीज JC1107638 को 6 दिन पहले पिपेरासिलिन-टैज़ोबैक्टम (Piperacillin-Tazobactam 4.5g IV QID) शुरू किया गया था। नैदानिक रिकॉर्ड महत्वपूर्ण लापता जानकारी प्रदर्शित करता है: उपचार की अवधि अनुपस्थित है (अनिश्चितकालीन), संकेत दर्ज नहीं है, एलर्जी विवरण 'अज्ञात' के रूप में सूचीबद्ध हैं, और रीनल लैब विलंबित हैं। DIYA इन्हें नकारात्मक के बजाय अज्ञात मानता है।",
            "patient_profile": {
                "patient_alias": "Patient JC1107638 (Respiratory ICU)",
                "age": "74",
                "sex": "Male",
                "infection_site": "Lower Respiratory / Hospital-Acquired Pneumonia",
                "comorbidities": [
                    {"category": "Comorbidity", "name": "COPD", "value": "Severe, GOLD Stage 3", "source_reference": "pulmonary_consult.pdf", "page_number": "1", "evidence_text": "Underlying severe chronic obstructive pulmonary disease", "confidence": "high"}
                ],
                "prior_exposures": [],
                "allergies": [
                    {"category": "Allergy", "name": "Antibiotic Allergy Status", "value": "UNVERIFIED / UNKNOWN (Not documented)", "source_reference": "nursing_admission.pdf", "page_number": "1", "evidence_text": "Allergies: [Blank - Patient intubated upon transfer, no attendant present]", "confidence": "high"}
                ],
                "medications": [
                    {"category": "Medication", "name": "current_antibiotic", "value": "Piperacillin-Tazobactam 4.5g IV QID", "source_reference": "med_chart.pdf", "page_number": "1", "evidence_text": "Inj. Pip-Taz 4.5g IV q6h. Start: 07-Sep-2026. Stop date: [BLANK]", "confidence": "high"}
                ],
                "cultures": [
                    {"category": "Microbiology", "name": "Organism", "value": "Pending / Sputum Inadequate", "source_reference": "microbiology_log.pdf", "page_number": "1", "evidence_text": "Sputum sample rejected: >25 squamous epithelial cells, repeat requested", "confidence": "medium"}
                ],
                "labs": [
                    {"category": "Lab", "name": "Serum Creatinine", "value": "1.4 mg/dL (5 days ago)", "source_reference": "admission_chem.pdf", "page_number": "1", "evidence_text": "Creatinine 1.4 mg/dL on admission (08-Sep-2026)", "confidence": "high"},
                    {"category": "Lab", "name": "Procalcitonin", "value": "NOT DOCUMENTED", "source_reference": "System Audit", "page_number": "N/A", "evidence_text": "No inflammatory biomarker on file", "confidence": "high"}
                ],
                "genetics": [
                    {"category": "Genetics", "name": "Pharmacogenomics", "value": "No verified genetic test uploaded. No genetic inference made.", "source_reference": "CPIC Genetic Safeguard", "page_number": "N/A", "evidence_text": "Rule: Never infer genetics from clinical context without verified test.", "confidence": "high"}
                ]
            },
            "missing_information": [
                {"field": "treatment_duration", "reason": "Planned duration is absent; therapy has continued for 6 days without documented review milestone"},
                {"field": "clinical_indication", "reason": "Diagnostic indication (e.g. HAP vs aspiration vs acute COPD exacerbation) is absent from prescription"},
                {"field": "allergy_history", "reason": "Allergy status is UNKNOWN (blank due to intubation upon transfer); must not be assumed negative"},
                {"field": "repeat_microbiology", "reason": "Initial sputum was inadequate; no repeat culture order is recorded on chart"}
            ],
            "conflicts": [],
            "review_flags": [
                {
                    "id": "demo2_flag_1",
                    "title": "Treatment duration is absent — prolonged empiric therapy risk",
                    "type": "duration_not_documented",
                    "priority": "high",
                    "rationale": "Piperacillin-Tazobactam has been administered for 6 days with no documented planned stop date, clinical cessation criteria, or review milestone.",
                    "rationale_hi": "पिपेरासिलिन-टैज़ोबैक्टम 6 दिनों से बिना किसी निर्धारित समाप्ति तिथि या समीक्षा मील के पत्थर के दिया जा रहा है।",
                    "patient_evidence": "Medication Chart (pg 1): 'Inj. Pip-Taz 4.5g IV q6h. Start: 07-Sep-2026. Stop: [Blank]'.",
                    "guideline_evidence": "ICMR Guidelines mandate that all broad-spectrum prescriptions record an explicit planned duration or mandatory Day-5 review milestone to prevent fungal superinfections.",
                    "missing_information": ["Targeted duration, clinical response assessment, procalcitonin"],
                    "clinician_question": "Has the patient reached clinical stability criteria (afebrile for 48h, leukocytosis resolving) to allow defining a 7-day total course stop date?",
                    "clinician_question_hi": "क्या रोगी 7-दिवसीय कोर्स समाप्ति तिथि निर्धारित करने के लिए नैदानिक स्थिरता मानदंड तक पहुंच गया है?",
                    "next_review_step": "Establish an explicit planned stop date with primary ICU intensivist.",
                    "status": "open",
                    "confidence": "high"
                },
                {
                    "id": "demo2_flag_2",
                    "title": "Allergy status is UNKNOWN (Do not interpret blank as negative)",
                    "type": "allergy_clarification",
                    "priority": "medium",
                    "rationale": "Nursing intake left allergy section blank because patient was transferred intubated. This is UNKNOWN, not a confirmed absence of beta-lactam allergy.",
                    "rationale_hi": "नर्सिंग इंटेक ने एलर्जी अनुभाग खाली छोड़ दिया क्योंकि रोगी को इंटुबैटेड ट्रांसफर किया गया था। यह अज्ञात है, एलर्जी की पुष्टि अनुपस्थिति नहीं।",
                    "patient_evidence": "Nursing Admission (pg 1): 'Allergies: [Blank - transferred intubated]'.",
                    "guideline_evidence": "DIYA Safety Boundary & ICMR Protocol: Missing clinical fields must be categorized as 'UNKNOWN' rather than 'NEGATIVE' to prevent accidental exposure in allergic patients.",
                    "missing_information": ["Family reconciliation of drug allergies"],
                    "clinician_question": "Can allergy reconciliation be completed with patient's family to confirm absence of severe penicillin anaphylaxis?",
                    "clinician_question_hi": "क्या गंभीर पेनिसिलिन एनाफिलेक्सिस की अनुपस्थिति की पुष्टि के लिए परिवार के साथ एलर्जी समाधान किया जा सकता है?",
                    "next_review_step": "Request clinical pharmacist to interview family attendant.",
                    "status": "open",
                    "confidence": "high"
                },
                {
                    "id": "demo2_flag_3",
                    "title": "Renal laboratory data is outdated (5 days old)",
                    "type": "renal_review",
                    "priority": "high",
                    "rationale": "Piperacillin-Tazobactam requires dose titration for creatinine clearance <50 mL/min. The only lab on file is 5 days old, prior to current antibiotic course.",
                    "rationale_hi": "पिपेरासिलिन-टैज़ोबैक्टम को खुराक समायोजन की आवश्यकता होती है। फ़ाइल पर एकमात्र लैब 5 दिन पुरानी है।",
                    "patient_evidence": "Admission Chem: 'Creatinine 1.4 mg/dL on 08-Sep-2026'. No subsequent labs.",
                    "guideline_evidence": "Hospital AMS Policy: High-dose Piperacillin-Tazobactam requires creatinine check at least every 48 hours to detect synergistic acute kidney injury.",
                    "missing_information": ["Repeat serum creatinine / BUN"],
                    "clinician_question": "Can repeat serum creatinine and electrolytes be ordered to ensure renal clearance remains adequate for 4.5g q6h dosing?",
                    "clinician_question_hi": "क्या यह सुनिश्चित करने के लिए सीरम क्रिएटिनिन की दोबारा जांच की जा सकती है कि 4.5 ग्राम q6h खुराक के लिए रीनल क्लीयरेंस पर्याप्त बनी रहे?",
                    "next_review_step": "Order stat serum creatinine/eGFR.",
                    "status": "open",
                    "confidence": "high"
                }
            ]
        },

        "demo3": {
            "case_id": "diya_case_3_conflicts",
            "title": "Case 3 — Conflicting Records",
            "subtitle": "Inter-Document Discrepancies: Inconsistent Antibiotic & Conflicting Allergy History",
            "tag": "Document Conflicts",
            "patient_alias": "Patient JC685309 (Trauma ICU)",
            "age": "48",
            "sex": "Male",
            "infection_site": "Intra-abdominal / Sepsis Post-Laparotomy",
            "summary_en": "Patient JC685309 has contradictory documentation across records: Emergency Triage records 'Severe Penicillin Allergy: Hives, facial swelling, dyspnea in 2021', while the Ward Nursing Transfer sheet states 'No Known Drug Allergies (NKDA)'. Furthermore, the Surgical Operative Note prescribes 'Ceftriaxone 2g IV OD + Metronidazole', but the active Medication Chart administers 'Piperacillin-Tazobactam 4.5g IV QID'. DIYA detects and surfaces these conflicts for immediate human resolution.",
            "summary_hi": "मरीज JC685309 के रिकॉर्ड में परस्पर विरोधी दस्तावेज हैं: आपातकालीन ट्राइएज नोट करता है 'गंभीर पेनिसिलिन एलर्जी: 2021 में चेहरे पर सूजन और सांस फूलना', जबकि वार्ड नर्सिंग ट्रांसफर शीट 'कोई ज्ञात दवा एलर्जी नहीं (NKDA)' बताती है। इसके अलावा, सर्जिकल नोट 'Ceftriaxone + Metronidazole' निर्धारित करता है, लेकिन सक्रिय दवा चार्ट 'Piperacillin-Tazobactam' देता है।",
            "patient_profile": {
                "patient_alias": "Patient JC685309 (Trauma ICU)",
                "age": "48",
                "sex": "Male",
                "infection_site": "Intra-abdominal / Post-Laparotomy Peritonitis",
                "comorbidities": [
                    {"category": "Comorbidity", "name": "Exploratory Laparotomy", "value": "Perforated diverticulitis on 11-Sep-2026", "source_reference": "operative_note.pdf", "page_number": "1", "evidence_text": "Emergency laparotomy for perforated viscus", "confidence": "high"}
                ],
                "prior_exposures": [],
                "allergies": [
                    {"category": "Allergy", "name": "Penicillin (CONFLICT DETECTED)", "value": "ER: Severe hives & dyspnea (2021) VS Ward: NKDA", "source_reference": "er_triage.pdf vs ward_transfer.pdf", "page_number": "1 vs 1", "evidence_text": "ER: 'Severe Penicillin allergy - hives & swelling'. Ward: 'Allergies: NKDA'", "confidence": "high"}
                ],
                "medications": [
                    {"category": "Medication", "name": "current_antibiotic", "value": "Piperacillin-Tazobactam 4.5g IV QID (DISCREPANCY DETECTED)", "source_reference": "medication_chart.pdf vs op_note.pdf", "page_number": "2 vs 2", "evidence_text": "Chart: 'Pip-Taz 4.5g IV QID'. Op Note: 'Order Ceftriaxone 2g IV OD + Metronidazole 500mg TDS'", "confidence": "high"}
                ],
                "cultures": [
                    {"category": "Microbiology", "name": "Organism", "value": "Peritoneal Fluid: Mixed enteric flora (Gram-negative rods, awaiting sensitivities)", "source_reference": "intraop_culture.pdf", "page_number": "1", "evidence_text": "Peritoneal swab: heavy growth Gram-negative bacilli, final AST pending", "confidence": "high"}
                ],
                "labs": [
                    {"category": "Lab", "name": "Serum Creatinine", "value": "1.1 mg/dL (Normal)", "source_reference": "morning_labs.pdf", "page_number": "1", "evidence_text": "Creatinine 1.1 mg/dL (12-Sep-2026)", "confidence": "high"},
                    {"category": "Lab", "name": "WBC Count", "value": "16.4 x10^3/uL", "source_reference": "morning_labs.pdf", "page_number": "1", "evidence_text": "TLC 16,400 with left shift", "confidence": "high"}
                ],
                "genetics": [
                    {"category": "Genetics", "name": "Pharmacogenomics", "value": "No verified genetic test uploaded. No genetic inference made.", "source_reference": "CPIC Genetic Safeguard", "page_number": "N/A", "evidence_text": "Rule: Never infer genetics from clinical context without verified test.", "confidence": "high"}
                ]
            },
            "missing_information": [
                {"field": "final_ast", "reason": "Peritoneal fluid culture is pending final susceptibility report; empirical coverage required"},
                {"field": "allergy_verification", "reason": "Direct conflict between ER and Ward allergy documentation requires urgent confirmation"}
            ],
            "conflicts": [
                {
                    "description": "Critical Allergy Discrepancy: ER Triage records severe IgE-mediated Penicillin anaphylaxis (hives, swelling, dyspnea), whereas Ward Transfer records 'NKDA' (No Known Drug Allergies). Patient is currently on Piperacillin (a penicillin).",
                    "sources": ["er_triage.pdf (page 1)", "ward_transfer.pdf (page 1)"]
                },
                {
                    "description": "Medication Order Mismatch: Operative Plan directs Ceftriaxone 2g + Metronidazole, but the active bedside Medication Chart reflects Piperacillin-Tazobactam 4.5g IV QID.",
                    "sources": ["operative_note.pdf (page 2)", "medication_chart.pdf (page 2)"]
                }
            ],
            "review_flags": [
                {
                    "id": "demo3_flag_1",
                    "title": "Severe Allergy Conflict: Patient on Penicillin while ER records severe anaphylaxis",
                    "type": "document_conflict",
                    "priority": "high",
                    "rationale": "Patient is actively receiving Piperacillin-Tazobactam (a penicillin derivative), yet ER Triage documents prior severe hives and facial swelling to Penicillin. Ward chart mistakenly lists NKDA.",
                    "rationale_hi": "मरीज को पिपेरासिलिन दिया जा रहा है, जबकि आपातकालीन रिकॉर्ड पेनिसिलिन से गंभीर पित्ती और चेहरे की सूजन दर्ज करता है। वार्ड चार्ट गलती से NKDA दिखाता है।",
                    "patient_evidence": "ER Triage (pg 1): 'Severe Penicillin allergy - hives & swelling'. Bedside Chart: 'Inj. Piperacillin-Tazobactam 4.5g IV QID'.",
                    "guideline_evidence": "Patient Safety Alert & ICMR Protocol: Immediate verification required when beta-lactam is ordered in patient with conflicting records of IgE-mediated anaphylaxis.",
                    "missing_information": ["Attending physician clarification of allergy history"],
                    "clinician_question": "URGENT SAFETY CHECK: Can the treating team verify the ER allergy record immediately before administering next dose of Piperacillin?",
                    "clinician_question_hi": "तत्काल सुरक्षा जांच: क्या उपचार टीम पिपेरासिलिन की अगली खुराक देने से पहले तुरंत आपातकालीन एलर्जी रिकॉर्ड की पुष्टि कर सकती है?",
                    "next_review_step": "Halt next dose pending immediate attending physician and allergy verification.",
                    "status": "open",
                    "confidence": "high"
                },
                {
                    "id": "demo3_flag_2",
                    "title": "Medication Order Discrepancy between Operative Note and Chart",
                    "type": "document_conflict",
                    "priority": "high",
                    "rationale": "Surgeon prescribed Ceftriaxone + Metronidazole in post-op orders, but medication administration chart reflects Piperacillin-Tazobactam.",
                    "rationale_hi": "सर्जन ने ऑपरेशन के बाद के आदेशों में सेफ्ट्रियाक्सोन + मेट्रोनिडाजोल निर्धारित किया, लेकिन दवा प्रशासन चार्ट पिपेरासिलिन-टैज़ोबैक्टम को दर्शाता है।",
                    "patient_evidence": "Operative Note: 'Order Ceftriaxone 2g IV OD + Metronidazole'. Bedside Chart: 'Pip-Taz 4.5g IV QID'.",
                    "guideline_evidence": "Hospital Medication Safety Standard: Transcribing discrepancies between operative notes and pharmacy administration charts must be reconciled prior to ongoing dosing.",
                    "missing_information": ["Primary surgical team intention"],
                    "clinician_question": "Which regimen represents the intentional post-operative plan: Ceftriaxone + Metronidazole or Piperacillin-Tazobactam?",
                    "clinician_question_hi": "कौन सा नियम जानबूझकर ऑपरेशन के बाद की योजना का प्रतिनिधित्व करता है: सेफ्ट्रियाक्सोन + मेट्रोनिडाजोल या पिपेरासिलिन-टैज़ोबैक्टम?",
                    "next_review_step": "Clarify intended order with operating surgeon.",
                    "status": "open",
                    "confidence": "high"
                }
            ]
        }
    }
