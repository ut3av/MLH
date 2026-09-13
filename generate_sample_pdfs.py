import os
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages
import matplotlib.patches as patches

def create_report_page(pdf, title_dict, patient_dict, specimen_dict, ast_rows, lab_rows, notes_dict):
    # A4 portrait: 8.27 x 11.69 inches
    fig = plt.figure(figsize=(8.27, 11.69), dpi=300)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.axis('off')
    
    # Background
    ax.add_patch(patches.Rectangle((0, 0), 1, 1, facecolor='#FFFFFF'))
    
    # Top Header Banner
    ax.add_patch(patches.Rectangle((0.05, 0.91), 0.90, 0.065, facecolor='#0F172A', edgecolor='none'))
    ax.text(0.08, 0.95, title_dict['hospital'], fontsize=13, fontweight='bold', color='#FFFFFF', family='sans-serif')
    ax.text(0.08, 0.925, title_dict['dept'], fontsize=8.5, color='#94A3B8', family='sans-serif')
    ax.text(0.88, 0.935, "NABH & NABL ACCREDITED", fontsize=7.5, fontweight='bold', color='#38BDF8', ha='right', family='sans-serif')
    
    # Barcode representation & Document title
    ax.text(0.05, 0.885, title_dict['report_type'].upper(), fontsize=12, fontweight='bold', color='#0F172A', family='sans-serif')
    ax.text(0.95, 0.885, f"REF: {title_dict['ref_no']}", fontsize=8, color='#64748B', ha='right', family='sans-serif')
    
    # Divider line
    ax.plot([0.05, 0.95], [0.875, 0.875], color='#CBD5E1', lw=1.2)
    
    # Patient Info Box
    ax.add_patch(patches.Rectangle((0.05, 0.77), 0.90, 0.095, facecolor='#F8FAFC', edgecolor='#E2E8F0', lw=1))
    
    # Left column patient info
    ax.text(0.07, 0.84, f"Patient ID / Alias: {patient_dict['id']}", fontsize=8.5, fontweight='bold', color='#1E293B', family='sans-serif')
    ax.text(0.07, 0.815, f"Age / Gender: {patient_dict['age']} / {patient_dict['gender']}", fontsize=8, color='#475569', family='sans-serif')
    ax.text(0.07, 0.79, f"Location: {patient_dict['ward']}", fontsize=8, color='#475569', family='sans-serif')
    
    # Middle column patient info
    ax.text(0.38, 0.84, f"Prescribing Dept: {patient_dict.get('dept', 'Inpatient Medicine')}", fontsize=8, color='#475569', family='sans-serif')
    ax.text(0.38, 0.815, f"Allergy Status: {patient_dict['allergy']}", fontsize=8, fontweight='bold', color='#B91C1C' if 'Allergy' in patient_dict['allergy'] or 'Discrepancy' in patient_dict['allergy'] or 'rash' in patient_dict['allergy'].lower() else '#15803D', family='sans-serif')
    ax.text(0.38, 0.79, f"Current Antibiotic: {patient_dict['current_abx']}", fontsize=8, fontweight='bold', color='#0369A1', family='sans-serif')
    
    # Right column patient info
    ax.text(0.72, 0.84, f"Collection Date: {patient_dict['col_date']}", fontsize=8, color='#475569', family='sans-serif')
    ax.text(0.72, 0.815, f"Reporting Date: {patient_dict['rep_date']}", fontsize=8, color='#475569', family='sans-serif')
    ax.text(0.72, 0.79, f"Consultant: {patient_dict['doctor']}", fontsize=8, color='#475569', family='sans-serif')
    
    # Specimen & Gram Stain Section
    ax.text(0.05, 0.74, "SPECIMEN & MICROBIOLOGICAL IDENTIFICATION", fontsize=9.5, fontweight='bold', color='#0F172A', family='sans-serif')
    ax.add_patch(patches.Rectangle((0.05, 0.675), 0.90, 0.055, facecolor='#F0FDF4', edgecolor='#BBF7D0', lw=1))
    ax.text(0.07, 0.71, f"Specimen Type: {specimen_dict['type']}", fontsize=8.5, fontweight='bold', color='#166534', family='sans-serif')
    ax.text(0.07, 0.688, f"Direct Smear: {specimen_dict['smear']}", fontsize=8, color='#15803D', family='sans-serif')
    ax.text(0.50, 0.71, f"Isolated Organism: {specimen_dict['organism']}", fontsize=9, fontweight='bold', color='#065F46', family='sans-serif')
    ax.text(0.50, 0.688, f"Colony Count: {specimen_dict['colony_count']}", fontsize=8, color='#047857', family='sans-serif')
    
    # AST Antibiogram Section Header
    ax.text(0.05, 0.645, "ANTIMICROBIAL SUSCEPTIBILITY TESTING (CLSI M100 / EUCAST CRITERIA)", fontsize=9.5, fontweight='bold', color='#0F172A', family='sans-serif')
    
    # Table Header
    y_table_top = 0.63
    ax.add_patch(patches.Rectangle((0.05, y_table_top - 0.025), 0.90, 0.025, facecolor='#E2E8F0', edgecolor='none'))
    ax.text(0.07, y_table_top - 0.017, "ANTIMICROBIAL AGENT", fontsize=8, fontweight='bold', color='#1E293B', family='sans-serif')
    ax.text(0.40, y_table_top - 0.017, "WHO AWARE", fontsize=8, fontweight='bold', color='#1E293B', family='sans-serif')
    ax.text(0.60, y_table_top - 0.017, "MIC (ug/mL)", fontsize=8, fontweight='bold', color='#1E293B', family='sans-serif')
    ax.text(0.80, y_table_top - 0.017, "INTERPRETATION", fontsize=8, fontweight='bold', color='#1E293B', family='sans-serif')
    
    y_cur = y_table_top - 0.025
    for i, row in enumerate(ast_rows):
        bg = '#FFFFFF' if i % 2 == 0 else '#F8FAFC'
        ax.add_patch(patches.Rectangle((0.05, y_cur - 0.024), 0.90, 0.024, facecolor=bg, edgecolor='#F1F5F9', lw=0.5))
        
        # Drug Name
        ax.text(0.07, y_cur - 0.016, row['drug'], fontsize=8, color='#0F172A', family='sans-serif')
        # WHO AWaRe
        aware_color = '#15803D' if 'Access' in row['aware'] else ('#B45309' if 'Watch' in row['aware'] else '#991B1B')
        ax.text(0.40, y_cur - 0.016, row['aware'], fontsize=7.5, color=aware_color, fontweight='semibold', family='sans-serif')
        # MIC
        ax.text(0.60, y_cur - 0.016, row['mic'], fontsize=8, color='#334155', family='sans-serif')
        # Interpretation
        is_s = row['interp'] == 'SUSCEPTIBLE'
        tag_color = '#15803D' if is_s else '#B91C1C'
        tag_bg = '#DCFCE7' if is_s else '#FEE2E2'
        ax.add_patch(patches.Rectangle((0.79, y_cur - 0.020), 0.14, 0.017, facecolor=tag_bg, edgecolor=tag_color, lw=0.6))
        ax.text(0.86, y_cur - 0.015, row['interp'], fontsize=7, fontweight='bold', color=tag_color, ha='center', family='sans-serif')
        
        y_cur -= 0.024
        
    # Baseline Laboratory & Renal Clearance Panel
    y_cur -= 0.015
    ax.text(0.05, y_cur, "BIOCHEMICAL & ORGAN FUNCTION BIOMARKERS", fontsize=9.5, fontweight='bold', color='#0F172A', family='sans-serif')
    
    y_cur -= 0.015
    ax.add_patch(patches.Rectangle((0.05, y_cur - 0.045), 0.90, 0.045, facecolor='#F8FAFC', edgecolor='#E2E8F0', lw=1))
    
    col_x = [0.07, 0.32, 0.55, 0.77]
    for idx, lab in enumerate(lab_rows):
        cx = col_x[idx % 4]
        ax.text(cx, y_cur - 0.018, lab['name'], fontsize=7.5, color='#64748B', family='sans-serif')
        ax.text(cx, y_cur - 0.034, lab['val'], fontsize=8.5, fontweight='bold', color='#0F172A' if not lab.get('flag') else '#B91C1C', family='sans-serif')
        
    # Clinical Decision & Stewardship Recommendation Box
    y_cur -= 0.065
    ax.text(0.05, y_cur, "ANTIMICROBIAL STEWARDSHIP CLINICAL SUMMARY & ACTION PLAN", fontsize=9.5, fontweight='bold', color='#0F172A', family='sans-serif')
    
    y_cur -= 0.015
    rec_box_h = 0.09
    ax.add_patch(patches.Rectangle((0.05, y_cur - rec_box_h), 0.90, rec_box_h, facecolor='#EFF6FF', edgecolor='#93C5FD', lw=1.2))
    ax.text(0.07, y_cur - 0.020, f"TARGETED RECOMMENDATION: {notes_dict['recommendation']}", fontsize=8.5, fontweight='bold', color='#1E40AF', family='sans-serif')
    ax.text(0.07, y_cur - 0.040, f"Clinical Rationale: {notes_dict['rationale']}", fontsize=7.5, color='#1E3A8A', family='sans-serif')
    ax.text(0.07, y_cur - 0.060, f"Safety & Monitoring: {notes_dict['safety']}", fontsize=7.5, color='#1E3A8A', family='sans-serif')
    ax.text(0.07, y_cur - 0.078, f"Stewardship & Economic Impact: {notes_dict['impact']}", fontsize=7.5, fontweight='bold', color='#0369A1', family='sans-serif')
    
    # Signature & Footer
    ax.plot([0.05, 0.95], [0.08, 0.08], color='#E2E8F0', lw=1)
    ax.text(0.05, 0.06, "Report electronically validated by DI-YA Clinical Decision Support System (ICMR-AMR & WHO AWaRe aligned).", fontsize=7, color='#64748B', family='sans-serif')
    ax.text(0.05, 0.045, "Confidential Medical Inpatient Record — For Authorized Clinical Personnel Only.", fontsize=6.5, color='#94A3B8', family='sans-serif')
    
    ax.text(0.95, 0.06, "Dr. Sunita Raman, MD (Microbiology)", fontsize=8, fontweight='bold', color='#1E293B', ha='right', family='sans-serif')
    ax.text(0.95, 0.045, "Consultant Microbiologist & Stewardship Lead", fontsize=7, color='#64748B', ha='right', family='sans-serif')
    
    pdf.savefig(fig)
    plt.close(fig)

def generate_all_demo_pdfs(output_dirs):
    for out_dir in output_dirs:
        os.makedirs(out_dir, exist_ok=True)
        
        # 1. PT-1042 Blood Culture & Bacteremia Report
        path1 = os.path.join(out_dir, "pt1042_blood_culture_report.pdf")
        with PdfPages(path1) as pdf:
            create_report_page(
                pdf=pdf,
                title_dict={
                    'hospital': 'APEX INSTITUTE OF MEDICAL SCIENCES & RESEARCH',
                    'dept': 'Department of Clinical Microbiology & Infectious Diseases',
                    'report_type': 'Blood Culture & Automated Antibiogram Report',
                    'ref_no': 'BC-2026-98241'
                },
                patient_dict={
                    'id': 'PT-1042 (ICU Bed 08)',
                    'age': '62 Y',
                    'gender': 'Male',
                    'ward': 'Intensive Care Unit (ICU)',
                    'dept': 'Critical Care Medicine',
                    'allergy': 'Childhood rash to Amoxicillin (Vague, non-anaphylactic)',
                    'current_abx': 'Meropenem 1g IV TDS (Empiric Broad-Spectrum)',
                    'col_date': '11-Sep-2026 08:30 AM',
                    'rep_date': '13-Sep-2026 10:15 AM',
                    'doctor': 'Dr. A. Verma, DM'
                },
                specimen_dict={
                    'type': 'Blood (Peripheral Venipuncture x 2 sets, Aerobic & Anaerobic)',
                    'smear': 'Gram-negative bacilli observed in aerobic blood bottle at 14.2h',
                    'organism': 'Escherichia coli (>10^5 CFU/mL)',
                    'colony_count': 'Pure culture, Bactec 9120 positive flag'
                },
                ast_rows=[
                    {'drug': 'Ceftriaxone', 'aware': 'Watch Tier', 'mic': '<=0.5', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Meropenem', 'aware': 'Watch Tier', 'mic': '<=0.25', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Piperacillin-Tazobactam', 'aware': 'Watch Tier', 'mic': '<=8/4', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Amikacin', 'aware': 'Access Tier', 'mic': '<=4.0', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Amoxicillin-Clavulanate', 'aware': 'Access Tier', 'mic': '>=32/16', 'interp': 'RESISTANT'},
                    {'drug': 'Ciprofloxacin', 'aware': 'Watch Tier', 'mic': '>=4.0', 'interp': 'RESISTANT'}
                ],
                lab_rows=[
                    {'name': 'Serum Creatinine', 'val': '1.8 mg/dL (Elevated)', 'flag': True},
                    {'name': 'eGFR Clearance', 'val': '38 mL/min/1.73m²', 'flag': True},
                    {'name': 'Total Leukocyte (TLC)', 'val': '14,200 /uL', 'flag': True},
                    {'name': 'Procalcitonin', 'val': '2.4 ng/mL', 'flag': True}
                ],
                notes_dict={
                    'recommendation': 'Ceftriaxone 2g IV Once Daily (OD) for 7 to 10 days.',
                    'rationale': 'Definitive blood culture confirms E. coli susceptible to Ceftriaxone. De-escalate from Meropenem to preserve Reserve/Watch carbapenems per ICMR Step 5 guidelines.',
                    'safety': 'Serum creatinine is elevated (1.8 mg/dL, tested 72h ago). Draw repeat renal panel within 48 hours. Verify patient remains afebrile.',
                    'impact': 'Carbapenem-sparing protocol saves estimated ₹3,140/day in medication cost and reduces selective pressure for Carbapenem-Resistant Enterobacteriaceae (CRE).'
                }
            )

        # 2. PT-1039 Urine AST & Inpatient Chart
        path2 = os.path.join(out_dir, "pt1039_urine_ast_prescription.pdf")
        with PdfPages(path2) as pdf:
            create_report_page(
                pdf=pdf,
                title_dict={
                    'hospital': 'METROPOLITAN TEACHING HOSPITAL & HEALTH SYSTEM',
                    'dept': 'Diagnostic Microbiology & Inpatient Urology Division',
                    'report_type': 'Urine Culture, AST & Medication Order Reconciliation',
                    'ref_no': 'UC-2026-64112'
                },
                patient_dict={
                    'id': 'PT-1039 (Ward 3 Bed 14)',
                    'age': '54 Y',
                    'gender': 'Female',
                    'ward': 'Ward 3B (General Inpatient)',
                    'dept': 'Urology & General Medicine',
                    'allergy': 'Penicillin (Unspecified reaction, no anaphylaxis)',
                    'current_abx': 'Piperacillin-Tazobactam 4.5g IV TDS (Day 6 Timeout)',
                    'col_date': '10-Sep-2026 11:15 AM',
                    'rep_date': '13-Sep-2026 09:30 AM',
                    'doctor': 'Dr. K. Saxena, MS'
                },
                specimen_dict={
                    'type': 'Mid-Stream Clean Catch Urine (Catheterized Patient)',
                    'smear': 'Moderate pus cells (25-30/HPF), Gram-negative rods present',
                    'organism': 'Klebsiella pneumoniae (>10^5 CFU/mL)',
                    'colony_count': 'Significant bacteriuria (>100,000 CFU/mL)'
                },
                ast_rows=[
                    {'drug': 'Nitrofurantoin', 'aware': 'Access Tier (Narrow PO)', 'mic': '<=16', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Ertapenem', 'aware': 'Watch Tier', 'mic': '<=0.5', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Amikacin', 'aware': 'Access Tier', 'mic': '<=4.0', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Ampicillin', 'aware': 'Access Tier', 'mic': '>=32', 'interp': 'RESISTANT'},
                    {'drug': 'Trimethoprim-Sulfamethoxazole', 'aware': 'Access Tier', 'mic': '>=4/76', 'interp': 'RESISTANT'},
                    {'drug': 'Ceftriaxone', 'aware': 'Watch Tier', 'mic': '>=16', 'interp': 'RESISTANT'}
                ],
                lab_rows=[
                    {'name': 'Serum Creatinine', 'val': '1.1 mg/dL (Normal)', 'flag': False},
                    {'name': 'Blood Urea Nitrogen', 'val': '16 mg/dL', 'flag': False},
                    {'name': 'Urine Pus Cells', 'val': '25-30 / HPF', 'flag': True},
                    {'name': 'Oral Intake', 'val': 'Tolerating liquids/solids', 'flag': False}
                ],
                notes_dict={
                    'recommendation': 'Step down to Nitrofurantoin 100mg PO QID for 5 to 7 days.',
                    'rationale': 'Patient is clinically stable, afebrile, and tolerating oral nutrition. AST confirms K. pneumoniae susceptibility to narrow-spectrum oral Nitrofurantoin. Discontinue IV Pip-Taz.',
                    'safety': 'Ensure patient renal clearance remains >30 mL/min (creatinine 1.1 mg/dL is safe for Nitrofurantoin concentration in lower urinary tract).',
                    'impact': 'Enables early IV-to-PO switch, WHO Access tier compliance, removes central line risk, and facilitates early inpatient discharge.'
                }
            )

        # 3. PT-1035 Surgical Site Wound Swab & Chart Discrepancy
        path3 = os.path.join(out_dir, "pt1035_wound_surgical_chart.pdf")
        with PdfPages(path3) as pdf:
            create_report_page(
                pdf=pdf,
                title_dict={
                    'hospital': 'REGIONAL TRAUMA & POST-SURGICAL CARE HOSPITAL',
                    'dept': 'Surgical Pathology & Hospital Infection Prevention',
                    'report_type': 'Surgical Wound Culture & Antimicrobial Review',
                    'ref_no': 'SW-2026-44019'
                },
                patient_dict={
                    'id': 'PT-1035 (Bed 22)',
                    'age': '70 Y',
                    'gender': 'Male',
                    'ward': 'Surgical Ward 2',
                    'dept': 'General Surgery',
                    'allergy': 'CHART DISCREPANCY: ER noted Penicillin Anaphylaxis; Ward noted NKDA',
                    'current_abx': 'ORDER CONFLICT: Meropenem 1g IV vs Pip-Taz 4.5g IV',
                    'col_date': '11-Sep-2026 04:00 PM',
                    'rep_date': '13-Sep-2026 11:00 AM',
                    'doctor': 'Dr. R. Mehta, MS (Ortho)'
                },
                specimen_dict={
                    'type': 'Deep Surgical Wound Swab / Subfascial Aspirate',
                    'smear': 'Numerous polymorphs, non-fermenting Gram-negative bacilli',
                    'organism': 'Pseudomonas aeruginosa (>10^5 CFU/mL)',
                    'colony_count': 'Moderate to heavy growth with pyocyanin production'
                },
                ast_rows=[
                    {'drug': 'Cefepime', 'aware': 'Watch Tier (Antipseudomonal)', 'mic': '<=2.0', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Meropenem', 'aware': 'Watch Tier', 'mic': '<=1.0', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Ciprofloxacin', 'aware': 'Watch Tier', 'mic': '<=0.5', 'interp': 'SUSCEPTIBLE'},
                    {'drug': 'Ceftriaxone', 'aware': 'Watch Tier', 'mic': '>=64', 'interp': 'RESISTANT'},
                    {'drug': 'Amoxicillin-Clavulanate', 'aware': 'Access Tier', 'mic': '>=32', 'interp': 'RESISTANT'},
                    {'drug': 'Gentamicin', 'aware': 'Access Tier', 'mic': '<=2.0', 'interp': 'SUSCEPTIBLE'}
                ],
                lab_rows=[
                    {'name': 'Serum Creatinine', 'val': '1.2 mg/dL', 'flag': False},
                    {'name': 'Total Leukocyte (TLC)', 'val': '14,200 /uL', 'flag': True},
                    {'name': 'Neutrophils %', 'val': '84%', 'flag': True},
                    {'name': 'Wound Status', 'val': 'Purulent drainage noted', 'flag': True}
                ],
                notes_dict={
                    'recommendation': 'Clarify allergy severity; reconcile MAR to Cefepime 2g IV q8h (7 days).',
                    'rationale': 'Reconciles conflicting empiric orders. Sputum/wound isolate is Pseudomonas aeruginosa. Cefepime offers targeted antipseudomonal bactericidal coverage without over-utilizing carbapenems.',
                    'safety': 'URGENT: Verify with patient family regarding the nature of the penicillin reaction (anaphylaxis vs benign rash) prior to fourth-generation cephalosporin dosing.',
                    'impact': 'Resolves multi-document order conflict, prevents adverse drug events, and maintains effective antipseudomonal stewardship.'
                }
            )

if __name__ == '__main__':
    dirs = [
        os.path.abspath("amr-guard/frontend/public/sample_reports"),
        os.path.abspath("amr-guard/frontend/src/assets/sample_reports")
    ]
    generate_all_demo_pdfs(dirs)
    print("All 3 clinical demonstration PDFs successfully generated!")
