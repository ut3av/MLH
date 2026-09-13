-- ==============================================================================
-- DIYA ANTIMICROBIAL STEWARDSHIP CLINICAL DATABASE SCHEMA
-- Target Database: Supabase PostgreSQL (Run in Supabase Dashboard -> SQL Editor)
-- ==============================================================================

-- 1. Enable UUID Extension if not already present
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PATIENTS TABLE: Tracks active and past inpatient cases
CREATE TABLE IF NOT EXISTS public.patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_alias VARCHAR(50) NOT NULL UNIQUE,
    age INT,
    sex VARCHAR(20) DEFAULT 'Not Specified',
    ward VARCHAR(100) NOT NULL,
    infection_site VARCHAR(255) NOT NULL,
    admission_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'Review required', -- 'Review required', 'Timeout due', 'Stable monitoring', 'Discharged'
    organism_isolated VARCHAR(255),
    current_antibiotic VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. PRESCRIPTIONS TABLE: Tracks antibiotic courses, dosages, and review flags
CREATE TABLE IF NOT EXISTS public.prescriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    patient_alias VARCHAR(50) NOT NULL,
    drug_name VARCHAR(150) NOT NULL,
    dosage VARCHAR(100),
    frequency VARCHAR(50), -- e.g. 'TDS', 'BD', 'OD', 'Q6H'
    route VARCHAR(50) DEFAULT 'IV', -- 'IV', 'Oral', 'IM'
    indication VARCHAR(255),
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    planned_stop_date TIMESTAMP WITH TIME ZONE,
    status VARCHAR(50) DEFAULT 'Active', -- 'Active', 'De-escalated', 'Completed', 'Discontinued'
    prescribing_doctor VARCHAR(150),
    source_type VARCHAR(50) DEFAULT 'OCR Extraction', -- 'OCR Extraction', 'Manual Entry', 'EHR Sync'
    raw_ocr_snippet TEXT,
    gemini_extracted_notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. OCR SCANS TABLE: Tracks uploaded clinical charts, AST reports, and Gemini OCR confidence
CREATE TABLE IF NOT EXISTS public.ocr_scans (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_alias VARCHAR(50),
    document_name VARCHAR(255) NOT NULL,
    document_category VARCHAR(100) DEFAULT 'Microbiology', -- 'Microbiology', 'Medication Chart', 'Lab Report', 'Clinical Note'
    extracted_text TEXT,
    extracted_facts JSONB DEFAULT '{}'::jsonb, -- Structured JSON returned by Gemini OCR
    gemini_model_version VARCHAR(50) DEFAULT 'gemini-2.5-flash',
    confidence_score NUMERIC(4,2) DEFAULT 0.95,
    review_status VARCHAR(50) DEFAULT 'Parsed', -- 'Parsed', 'Validated by Pharmacist', 'Pending'
    uploaded_by VARCHAR(150) DEFAULT 'Dr. Sharma (Clinical Pharmacist)',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. CLINICAL ACTIVITY AUDIT TRAIL TABLE: Detailed hospital AMS audit trail
CREATE TABLE IF NOT EXISTS public.clinical_activity (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_alias VARCHAR(50) NOT NULL,
    event_type VARCHAR(100) NOT NULL, -- 'review', 'escalation', 'de_escalation', 'ocr_scan', 'timeout'
    title VARCHAR(255) NOT NULL,
    actor VARCHAR(150) NOT NULL,
    details TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ==============================================================================
-- INDEXES FOR PERFORMANCE
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_patients_alias ON public.patients(patient_alias);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_id ON public.prescriptions(patient_id);
CREATE INDEX IF NOT EXISTS idx_prescriptions_patient_alias ON public.prescriptions(patient_alias);
CREATE INDEX IF NOT EXISTS idx_ocr_scans_patient_alias ON public.ocr_scans(patient_alias);
CREATE INDEX IF NOT EXISTS idx_clinical_activity_patient ON public.clinical_activity(patient_alias);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- Permissive for hospital clinical staff authorized under the DIYA portal
-- ==============================================================================
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prescriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ocr_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clinical_activity ENABLE ROW LEVEL SECURITY;

-- Allow read and write for authenticated and anonymous service clients (for hackathon / clinic demo)
CREATE POLICY "Allow select on patients" ON public.patients FOR SELECT USING (true);
CREATE POLICY "Allow insert on patients" ON public.patients FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on patients" ON public.patients FOR UPDATE USING (true);

CREATE POLICY "Allow select on prescriptions" ON public.prescriptions FOR SELECT USING (true);
CREATE POLICY "Allow insert on prescriptions" ON public.prescriptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update on prescriptions" ON public.prescriptions FOR UPDATE USING (true);

CREATE POLICY "Allow select on ocr_scans" ON public.ocr_scans FOR SELECT USING (true);
CREATE POLICY "Allow insert on ocr_scans" ON public.ocr_scans FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select on clinical_activity" ON public.clinical_activity FOR SELECT USING (true);
CREATE POLICY "Allow insert on clinical_activity" ON public.clinical_activity FOR INSERT WITH CHECK (true);

-- ==============================================================================
-- INITIAL SEED DATA
-- Demonstrates realistic clinical tracking in St. Jude Memorial Hospital
-- ==============================================================================

INSERT INTO public.patients (patient_alias, age, sex, ward, infection_site, status, organism_isolated, current_antibiotic)
VALUES 
('PT-1042', 62, 'Male', 'Medicine / ICU Bed 08', 'Bloodstream (Bacteremia)', 'Review required', 'Escherichia coli (>10^5 CFU/mL)', 'Meropenem 1g IV TDS'),
('PT-1039', 54, 'Female', 'Ward 3 (General)', 'Complicated urinary tract infection', 'Timeout due', 'Klebsiella pneumoniae', 'Piperacillin/Tazobactam 4.5g IV TDS'),
('PT-1035', 70, 'Male', 'Surgical Ward 2', 'Post-operative surgical site infection', 'Document conflict', 'Gram-negative rod (Preliminary)', 'Meropenem vs Pip-Taz (Discrepancy)'),
('PT-1028', 58, 'Female', 'Respiratory ICU', 'Hospital-acquired pneumonia', 'Stable monitoring', 'Pseudomonas aeruginosa', 'Cefepime 2g IV BD')
ON CONFLICT (patient_alias) DO UPDATE 
SET updated_at = NOW();

-- Seed Prescriptions
INSERT INTO public.prescriptions (patient_alias, drug_name, dosage, frequency, route, indication, status, prescribing_doctor, source_type, gemini_extracted_notes)
VALUES
('PT-1042', 'Meropenem', '1g', 'TDS (Every 8h)', 'IV', 'Empiric coverage for suspected sepsis', 'Active', 'Dr. Sharma (ICU)', 'OCR Extraction', 'Gemini OCR extracted from Medication_Chart.pdf page 2. De-escalation candidate.'),
('PT-1042', 'Ceftriaxone', '2g', 'OD', 'IV', 'Targeted de-escalation based on blood AST', 'Pending Sign-off', 'Dr. Mehta (Infectious Diseases)', 'Manual Entry', 'Susceptibility confirmed (MIC <= 1 mg/L).'),
('PT-1039', 'Piperacillin/Tazobactam', '4.5g', 'TDS', 'IV', 'Complicated pyelonephritis', 'Active', 'Dr. Sen (Ward 3)', 'OCR Extraction', 'Day 6 of therapy. 48h timeout evaluation pending.'),
('PT-1035', 'Meropenem', '1g', 'TDS', 'IV', 'Post-operative abdominal coverage', 'Active', 'Dr. Ray (Surgery)', 'OCR Extraction', 'Conflicting Penicillin allergy documentation in chart.')
ON CONFLICT DO NOTHING;

-- Seed Activity Audit
INSERT INTO public.clinical_activity (patient_alias, event_type, title, actor, details)
VALUES
('PT-1042', 'escalation', 'Case escalated to Infectious Disease Consultant', 'Dr. Sharma (Clinical Pharmacist)', 'Suggested Ceftriaxone de-escalation for clinical stability validation in ICU.'),
('PT-1042', 'review', 'Pharmacist reviewed antimicrobial susceptibility profile', 'Dr. Sharma (Clinical Pharmacist)', 'Confirmed susceptibility to Ceftriaxone (MIC <= 1 mg/L) from blood culture.'),
('PT-1042', 'ocr_scan', 'Blood_Culture_Report.pdf parsed with Gemini OCR', 'DIYA Gemini Engine', 'Extracted E. coli with Ceftriaxone (Susceptible) and Meropenem (Susceptible).'),
('PT-1039', 'timeout', 'Antimicrobial timeout scheduled: Piperacillin/Tazobactam', 'AMS Committee', 'Recommended 7-day fixed stop date established for complicated UTI course.');
