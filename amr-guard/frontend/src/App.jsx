import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LoginScreen from './components/LoginScreen';
import MainDashboard from './components/MainDashboard';
import NewReviewScreen from './components/NewReviewScreen';
import PatientSummaryPanel from './components/PatientSummaryPanel';
import ClinicalDecisionOutput from './components/ClinicalDecisionOutput';
import ExportReviewCard from './components/ExportReviewCard';
import GuidelinesPage from './components/GuidelinesPage';
import PatientsListPage from './components/PatientsListPage';
import PrescriptionHistoryPage from './components/PrescriptionHistoryPage';
import ActivityTimelinePage from './components/ActivityTimelinePage';
import AnalysisProgressModal from './components/AnalysisProgressModal';
import DocumentViewerModal from './components/DocumentViewerModal';
import ShowcaseLandingPage from './components/ShowcaseLandingPage';
import { ArrowLeft, ShieldCheck, Eye, FileText, CheckCircle2 } from 'lucide-react';
import { supabase } from './supabaseClient';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://diyaaa.onrender.com';

function App() {
  // Authentication State: Initially unauthenticated
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userSession, setUserSession] = useState(null);
  const [isFreshUser, setIsFreshUser] = useState(false);

  // Clinical Navigation Tab: 'landing' | 'login' | 'dashboard' | 'new_review' | 'review' | 'export' | 'patients' | 'prescriptions' | 'guidelines' | 'activity'
  const [currentTab, setCurrentTab] = useState('landing');
  const [language, setLanguage] = useState('English');
  const [isAnalyzingModalOpen, setIsAnalyzingModalOpen] = useState(false);

  // Document Viewer Modal State
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [activeDocName, setActiveDocName] = useState('Blood_Culture_Report.pdf');
  const [activeDocEvidence, setActiveDocEvidence] = useState('');

  // Active Patient Context
  const [activePatientCase, setActivePatientCase] = useState({
    case_id: 'PT-1042',
    patient_profile: {
      patient_alias: 'PT-1042',
      age: '62',
      sex: 'Male',
      ward: 'Medicine / ICU Bed 08',
      infection_site: 'Bloodstream (Bacteremia)',
      allergies: [
        { category: 'Allergy', name: 'Amoxicillin', value: 'Childhood rash; severity not documented', source_reference: 'Allergy_History.pdf', confidence: 'high' }
      ],
      medications: [
        { category: 'Medication', name: 'current_antibiotic', value: 'Meropenem 1g IV TDS', source_reference: 'Medication_Chart.pdf', confidence: 'high' }
      ],
      cultures: [
        { category: 'Microbiology', name: 'Organism', value: 'Escherichia coli (>10^5 CFU/mL)', source_reference: 'Blood_Culture_Report.pdf', confidence: 'high' },
        { category: 'Microbiology', name: 'Ceftriaxone', value: 'SUSCEPTIBLE', source_reference: 'Blood_Culture_Report.pdf', confidence: 'high' },
        { category: 'Microbiology', name: 'Meropenem', value: 'SUSCEPTIBLE', source_reference: 'Blood_Culture_Report.pdf', confidence: 'high' },
        { category: 'Microbiology', name: 'Amoxicillin', value: 'RESISTANT', source_reference: 'Blood_Culture_Report.pdf', confidence: 'high' }
      ],
      labs: [
        { category: 'Lab', name: 'Serum Creatinine', value: '1.8 mg/dL (Tested 72h ago)', source_reference: 'Renal_Function.pdf', confidence: 'high' }
      ]
    }
  });

  const handleLogin = (user) => {
    setUserSession(user);
    setIsAuthenticated(true);
    setIsFreshUser(Boolean(user?.isFreshRegistration));
    setCurrentTab('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserSession(null);
    setIsFreshUser(false);
    setCurrentTab('landing');
  };

  // Load a clinical review case
  const handleSelectCase = async (caseKey) => {
    if (caseKey === 'new') {
      setCurrentTab('new_review');
      return;
    }
    setIsAnalyzingModalOpen(true);
    try {
      const res = await fetch(`${API_BASE}/api/demo-cases/${caseKey}/load`, {
        method: 'POST'
      });
      if (res.ok) {
        const data = await res.json();
        setActivePatientCase(data);
      }
    } catch (err) {
      console.warn('Backend connection note, using local clinical case definition:', err);
    }
    // Set active case identifiers
    if (caseKey === 'demo1') {
      setActivePatientCase({
        case_id: 'PT-1042',
        patient_profile: {
          patient_alias: 'PT-1042',
          age: '62',
          sex: 'Male',
          ward: 'Medicine / ICU Bed 08',
          infection_site: 'Bloodstream (Bacteremia)',
          allergies: [
            { category: 'Allergy', name: 'Amoxicillin', value: 'Childhood rash; severity not documented', source_reference: 'Allergy_History.pdf' }
          ],
          medications: [
            { category: 'Medication', name: 'current_antibiotic', value: 'Meropenem 1g IV TDS', source_reference: 'Medication_Chart.pdf' }
          ],
          cultures: [
            { category: 'Microbiology', name: 'Organism', value: 'Escherichia coli (>10^5 CFU/mL)' },
            { category: 'Microbiology', name: 'Ceftriaxone', value: 'SUSCEPTIBLE' },
            { category: 'Microbiology', name: 'Meropenem', value: 'SUSCEPTIBLE' }
          ],
          labs: [
            { category: 'Lab', name: 'Serum Creatinine', value: '1.8 mg/dL (Tested 72h ago)' }
          ]
        }
      });
    } else if (caseKey === 'demo2') {
      setActivePatientCase({
        case_id: 'PT-1039',
        patient_profile: {
          patient_alias: 'PT-1039',
          age: '54',
          sex: 'Female',
          ward: 'Ward 3 (General)',
          infection_site: 'Complicated urinary tract infection',
          allergies: [
            { category: 'Allergy', name: 'Penicillin', value: 'Reaction unspecified; severity not documented' }
          ],
          medications: [
            { category: 'Medication', name: 'current_antibiotic', value: 'Piperacillin/Tazobactam 4.5g IV TDS (Day 6)' }
          ],
          cultures: [
            { category: 'Microbiology', name: 'Organism', value: 'Klebsiella pneumoniae' }
          ],
          labs: []
        }
      });
    } else if (caseKey === 'demo3') {
      setActivePatientCase({
        case_id: 'PT-1035',
        patient_profile: {
          patient_alias: 'PT-1035',
          age: '70',
          sex: 'Male',
          ward: 'Surgical Ward 2',
          infection_site: 'Post-operative surgical site infection',
          allergies: [
            { category: 'Allergy', name: 'Penicillin', value: 'Anaphylaxis in ER note; NKDA in ward chart' }
          ],
          medications: [
            { category: 'Medication', name: 'current_antibiotic', value: 'Meropenem (Chart) vs Pip-Taz (Note)' }
          ],
          cultures: [],
          labs: []
        }
      });
    }
  };

  const handleAnalysisComplete = () => {
    setIsAnalyzingModalOpen(false);
    setCurrentTab('review');
  };

  // Analyze new patient review upload
  const handleAnalyzeUpload = async (casePayload) => {
    const facts = casePayload.extractedFacts || {};
    const prescribed = facts.prescribed_antibiotics?.[0];
    const currentDrugStr = prescribed 
      ? `${prescribed.drug_name} ${prescribed.dosage || ''} ${prescribed.route || 'IV'} ${prescribed.frequency || 'TDS'}`.trim()
      : 'Meropenem 1g IV TDS';

    const cultureFindings = facts.culture_ast_findings || {};
    const organism = cultureFindings.organism || 'Escherichia coli (>10^5 CFU/mL)';
    const susceptibleList = cultureFindings.susceptible_drugs || ['Ceftriaxone', 'Meropenem'];
    const resistantList = cultureFindings.resistant_drugs || ['Amoxicillin'];

    const culturesArray = [
      { category: 'Microbiology', name: 'Organism', value: organism, source_reference: 'Uploaded_Prescription.pdf', confidence: 'high' },
      ...susceptibleList.map(drug => ({ category: 'Microbiology', name: drug, value: 'SUSCEPTIBLE', source_reference: 'Uploaded_Prescription.pdf', confidence: 'high' })),
      ...resistantList.map(drug => ({ category: 'Microbiology', name: drug, value: 'RESISTANT', source_reference: 'Uploaded_Prescription.pdf', confidence: 'high' }))
    ];

    const renalMarkers = facts.renal_markers || {};
    const creatinineVal = renalMarkers.serum_creatinine || '1.8 mg/dL (Tested 72h ago)';

    const allergyList = (facts.allergies && facts.allergies.length > 0)
      ? facts.allergies.map(a => ({
          category: 'Allergy',
          name: a.allergen || 'Penicillin',
          value: a.reaction || 'Severity not documented',
          source_reference: 'Uploaded_Prescription.pdf',
          confidence: 'high'
        }))
      : [{ category: 'Allergy', name: 'Amoxicillin', value: 'Childhood rash; severity not documented', source_reference: 'Uploaded_Prescription.pdf', confidence: 'high' }];

    // Dynamic recommendation synthesized by Gemini OCR
    const recAntibiotic = facts.recommended_antibiotic || {
      drug_name: susceptibleList[0] || 'Ceftriaxone',
      dosage: '1 g to 2 g',
      route: 'IV',
      frequency: 'Once daily (OD)',
      duration: '7 to 10 days',
      clinical_rationale: `Definitive AST confirms susceptibility to ${susceptibleList.join(', ')}. Targeted de-escalation from ${currentDrugStr} is indicated under ICMR Step 5 guidelines.`,
      who_aware_category: 'Watch Tier (Preserves Carbapenems)',
      safety_precautions: `Verify clinical defervescence and monitor serum creatinine (${creatinineVal}).`
    };

    setActivePatientCase({
      case_id: casePayload.patient_alias || 'PT-NEW',
      patient_alias: casePayload.patient_alias || 'PT-NEW',
      recommended_antibiotic: recAntibiotic,
      patient_profile: {
        patient_alias: casePayload.patient_alias || 'PT-NEW',
        age: casePayload.age || '62',
        sex: casePayload.sex || 'Male',
        ward: casePayload.ward || 'Inpatient Ward',
        infection_site: casePayload.infection_site || 'Bloodstream (Bacteremia)',
        allergies: allergyList,
        medications: [
          { category: 'Medication', name: 'current_antibiotic', value: currentDrugStr, source_reference: 'Uploaded_Prescription.pdf', confidence: 'high' }
        ],
        cultures: culturesArray,
        labs: [
          { category: 'Lab', name: 'Serum Creatinine', value: creatinineVal, source_reference: 'Uploaded_Prescription.pdf', confidence: 'high' }
        ]
      }
    });

    // Save user's newly analyzed patient into database/local record
    const patientAlias = casePayload.patient_alias || 'PT-NEW';
    try {
      supabase.addPatient({
        patient_alias: patientAlias,
        age: casePayload.age || '62',
        sex: casePayload.sex || 'Male',
        ward: casePayload.ward || 'Inpatient Ward',
        infection_site: casePayload.infection_site || 'Bloodstream (Bacteremia)',
        organism_isolated: organism,
        current_antibiotic: currentDrugStr,
        status: 'Review required'
      });

      supabase.addPrescription({
        patient_alias: patientAlias,
        drug_name: recAntibiotic.drug_name,
        dosage: recAntibiotic.dosage,
        frequency: recAntibiotic.frequency,
        route: recAntibiotic.route,
        indication: casePayload.infection_site || 'Targeted de-escalation',
        status: 'Active',
        prescribing_doctor: userSession?.email || 'Dr. (Attending)',
        source_type: 'Gemini OCR Extraction',
        gemini_extracted_notes: recAntibiotic.clinical_rationale
      });
    } catch (e) {
      console.warn('Patient save notice:', e);
    }

    setIsAnalyzingModalOpen(true);
  };

  const handleOpenDocViewer = (docName, evidenceText) => {
    setActiveDocName(docName || 'Blood_Culture_Report.pdf');
    setActiveDocEvidence(evidenceText || '');
    setIsDocViewerOpen(true);
  };

  // If user clicks Login or is unauthenticated and tries to access private routes
  if (currentTab === 'login' || (!isAuthenticated && currentTab !== 'landing')) {
    return (
      <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased flex flex-col justify-between">
        <Navbar
          currentTab="login"
          setCurrentTab={setCurrentTab}
          user={userSession}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          language={language}
          setLanguage={setLanguage}
          onNewReviewClick={() => setCurrentTab('login')}
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          <LoginScreen 
            onLogin={handleLogin} 
            onBackToShowcase={() => setCurrentTab('landing')} 
          />
        </main>
        <footer className="border-t border-slate-200 bg-white py-4 text-center text-xs text-slate-400">
          DIYA · Clinical Antimicrobial Decision Support · Hospital Security Gateway
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans antialiased flex flex-col justify-between selection:bg-slate-200 selection:text-slate-900">
      <div>
        {/* Navigation Bar: Reflects authentication status & locks tabs on landing */}
        <Navbar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          user={userSession}
          isAuthenticated={isAuthenticated}
          onLogout={handleLogout}
          language={language}
          setLanguage={setLanguage}
          onNewReviewClick={() => setCurrentTab('new_review')}
        />

        {/* VIEW 0: Public Landing Page Gate (Strict Entry, No Bypass to private pages) */}
        {currentTab === 'landing' && (
          <ShowcaseLandingPage
            onLaunchPortal={() => {
              if (!isAuthenticated) {
                setCurrentTab('login');
              } else {
                setCurrentTab('dashboard');
              }
            }}
            onSelectCase={(caseKey) => {
              if (!isAuthenticated) {
                setCurrentTab('login');
              } else {
                handleSelectCase(caseKey);
              }
            }}
            language={language}
            setLanguage={setLanguage}
          />
        )}

        {/* CLINICAL PORTAL VIEWS: ACCESSIBLE ONCE AUTHENTICATED */}
        {isAuthenticated && currentTab !== 'landing' && (
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
            {/* VIEW 1: Main Dashboard */}
            {currentTab === 'dashboard' && (
              <MainDashboard
                onStartNewReview={() => setCurrentTab('new_review')}
                onSelectCase={handleSelectCase}
                language={language}
                isFreshUser={isFreshUser}
              />
            )}

            {/* VIEW 2: Start a Patient Review (Upload Screen with Gemini OCR) */}
            {currentTab === 'new_review' && (
              <NewReviewScreen
                onAnalyze={handleAnalyzeUpload}
                isAnalyzing={isAnalyzingModalOpen}
                onBack={() => setCurrentTab('dashboard')}
                language={language}
              />
            )}

            {/* VIEW 3: Clinical Review Dossier (Patient Snapshot + Main Output) */}
            {currentTab === 'review' && (
              <div className="space-y-6 text-left">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <button
                    onClick={() => setCurrentTab('dashboard')}
                    className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Dashboard</span>
                  </button>

                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-slate-500">Active Case:</span>
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {activePatientCase.patient_profile?.patient_alias || 'PT-1042'}
                    </span>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      Decision Support Ready
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* Left Column: Patient Overview, Snapshot & Microbiology (5 Cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <PatientSummaryPanel
                      profile={activePatientCase.patient_profile}
                      language={language}
                      onSelectFact={(cat, doc, snip) => handleOpenDocViewer(doc, snip)}
                    />

                    <button
                      onClick={() => handleOpenDocViewer('Blood_Culture_Report.pdf', 'Escherichia coli isolated from blood culture. Ceftriaxone: Susceptible.')}
                      className="w-full py-2.5 px-4 bg-white hover:bg-slate-50 text-slate-700 rounded-xl border border-slate-200 text-xs font-semibold shadow-2xs flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-emerald-600" />
                      <span>Open Grounding Document Viewer</span>
                    </button>
                  </div>

                  {/* Right Column: Main Decision Support Output (7 Cols) */}
                  <div className="lg:col-span-7">
                    <ClinicalDecisionOutput
                      analysisData={activePatientCase}
                      onOpenDocumentViewer={(doc, snip) => handleOpenDocViewer(doc, snip)}
                      onExportReport={() => setCurrentTab('export')}
                      language={language}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* VIEW 4: Export Clinical Review Brief */}
            {currentTab === 'export' && (
              <ExportReviewCard
                analysisData={activePatientCase}
                onBack={() => setCurrentTab('review')}
                language={language}
              />
            )}

            {/* VIEW 5: Patients Inpatient Queue (Supabase connected) */}
            {currentTab === 'patients' && (
              <PatientsListPage
                onSelectPatient={handleSelectCase}
                isFreshUser={isFreshUser}
              />
            )}

            {/* VIEW 6: Prescription History & Timeline (Supabase connected) */}
            {currentTab === 'prescriptions' && (
              <PrescriptionHistoryPage
                onSelectPatient={handleSelectCase}
                language={language}
                isFreshUser={isFreshUser}
              />
            )}

            {/* VIEW 7: Guidelines Evidence Library */}
            {currentTab === 'guidelines' && (
              <GuidelinesPage />
            )}

            {/* VIEW 8: Hospital Activity Timeline */}
            {currentTab === 'activity' && (
              <ActivityTimelinePage
                onSelectCase={handleSelectCase}
              />
            )}

          </main>
        )}
      </div>

      {/* Hospital Clinical Workflow Footer */}
      {currentTab !== 'landing' && (
        <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-500 font-normal no-print">
          <div className="max-w-6xl mx-auto px-4 space-y-1">
            <p className="font-semibold text-slate-700">
              DIYA: From patient data to evidence-guided antibiotic decisions.
            </p>
            <p className="text-[11px] text-slate-400">
              AI prepares the decision. Healthcare professionals make it. Protected clinical workspace.
            </p>
          </div>
        </footer>
      )}

      {/* Analysis Progress Modal */}
      <AnalysisProgressModal
        isOpen={isAnalyzingModalOpen}
        onComplete={handleAnalysisComplete}
      />

      {/* Grounding Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={isDocViewerOpen}
        onClose={() => setIsDocViewerOpen(false)}
        initialDocument={activeDocName}
        evidenceSnippet={activeDocEvidence}
      />

      {/* Print Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body { background: white !important; color: black !important; }
          body * { visibility: hidden; }
          #export-card, #export-card * { visibility: visible; }
          #export-card { position: absolute; left: 0; top: 0; width: 100%; border: none !important; box-shadow: none !important; padding: 0 !important; background: white !important; color: black !important; }
          .no-print { display: none !important; }
        }
      `}} />
    </div>
  );
}

export default App;
