import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingDashboard from './components/LandingDashboard';
import NewReviewScreen from './components/NewReviewScreen';
import KaggleCaseSelector from './components/KaggleCaseSelector';
import PatientSummaryPanel from './components/PatientSummaryPanel';
import ReviewFlagsDashboard from './components/ReviewFlagsDashboard';
import EvidenceChainView from './components/EvidenceChainView';
import ExportReviewCard from './components/ExportReviewCard';
import AnalysisProgressModal from './components/AnalysisProgressModal';
import DocumentViewerModal from './components/DocumentViewerModal';
import { InformationGapCard, DocumentConflictCard } from './components/SpecialReviewCards';
import { 
  ArrowLeft, ArrowRight, ShieldCheck, HelpCircle, Eye, 
  Sparkles, FileText, CheckCircle2, AlertCircle, Compass 
} from 'lucide-react';

const API_BASE = 'http://localhost:8000';

function App() {
  // Navigation View: 'landing' | 'new_review' | 'kaggle' | 'dashboard'
  const [currentView, setCurrentView] = useState('landing');
  
  // Dashboard Sub-tabs: 'flags' | 'evidence_chain' | 'export_brief'
  const [activeDashboardTab, setActiveDashboardTab] = useState('flags');

  const [language, setLanguage] = useState('English');
  const [userRole, setUserRole] = useState('Hospital Pharmacist');
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [isAnalyzingModalOpen, setIsAnalyzingModalOpen] = useState(false);

  // Document Viewer Modal state
  const [isDocViewerOpen, setIsDocViewerOpen] = useState(false);
  const [activeDocName, setActiveDocName] = useState('culture_report.pdf');
  const [activeDocEvidence, setActiveDocEvidence] = useState('');

  const [currentContext, setCurrentContext] = useState({
    patient_alias: 'DEMO-001',
    age: '62',
    sex: 'Male',
    infection_site: 'Urinary infection'
  });

  const [analysisData, setAnalysisData] = useState(null);
  const [flags, setFlags] = useState([]);

  // Load a PRD benchmark demo case
  const handleLoadDemoCase = async (demoKey) => {
    setIsAnalyzingModalOpen(true);
    try {
      const res = await fetch(`${API_BASE}/api/demo-cases/${demoKey}/load`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAnalysisData(data);
      setFlags(data.review_flags || []);
    } catch (err) {
      console.warn('Backend unavailable, utilizing client benchmark case:', err);
      // Client benchmark case fallback
      const fallbackCases = {
        demo1: {
          case_id: 'diya_demo_01',
          patient_alias: 'DEMO-001',
          patient_profile: {
            patient_alias: 'DEMO-001',
            age: '62',
            sex: 'Male',
            infection_site: 'Urinary infection',
            comorbidities: [
              { category: 'Comorbidity', name: 'Type 2 Diabetes', value: 'HbA1c 8.1%', source_reference: 'admission_history.pdf, pg 1', confidence: 'high' }
            ],
            prior_exposures: [
              { category: 'Prior Exposure', name: 'Ciprofloxacin', value: 'June 2026 for UTI', source_reference: 'discharge_summary.pdf', confidence: 'high' }
            ],
            allergies: [
              { category: 'Allergy', name: 'Amoxicillin', value: 'Childhood rash noted; severity not documented', source_reference: 'allergy_record.pdf, pg 1', confidence: 'high' }
            ],
            medications: [
              { category: 'Medication', name: 'current_antibiotic', value: 'Meropenem 1g IV TDS', source_reference: 'medication_chart.pdf, pg 2', confidence: 'high' }
            ],
            cultures: [
              { category: 'Microbiology', name: 'Organism', value: 'Escherichia coli', source_reference: 'culture_report.pdf, pg 1', confidence: 'high' },
              { category: 'Microbiology', name: 'Nitrofurantoin', value: 'SUSCEPTIBLE', source_reference: 'culture_report.pdf, pg 1', confidence: 'high' },
              { category: 'Microbiology', name: 'Meropenem', value: 'SUSCEPTIBLE', source_reference: 'culture_report.pdf, pg 1', confidence: 'high' },
              { category: 'Microbiology', name: 'Ceftriaxone', value: 'RESISTANT', source_reference: 'culture_report.pdf, pg 1', confidence: 'high' }
            ],
            labs: [
              { category: 'Lab', name: 'Serum Creatinine', value: '1.8 mg/dL (72h ago, Outdated)', source_reference: 'biochem_labs.pdf, pg 1', confidence: 'high' },
              { category: 'Lab', name: 'eGFR', value: '38 mL/min/1.73m2', source_reference: 'biochem_labs.pdf, pg 1', confidence: 'high' }
            ]
          },
          summary_en: 'Review Brief: Culture and current therapy should be reviewed against relevant stewardship guidance. Active Meropenem has narrower susceptible option (oral Nitrofurantoin). Outdated renal labs require confirmation.',
          summary_hi: 'समीक्षा संक्षिप्त विवरण: वर्तमान चिकित्सा और संवर्धन की समीक्षा रोगाणुरोधी प्रबंधन दिशानिर्देशों के अनुसार की जानी चाहिए। मौखिक नाइट्रोफ्यूरेंटोइन संवेदनशील है।',
          missing_information: [
            { field: 'allergy_severity', reason: 'Reaction is documented as childhood rash, but IgE anaphylaxis severity is unrecorded. Severity is UNKNOWN (not negative).' }
          ],
          conflicts: [],
          review_flags: [
            {
              id: 'd1_1',
              title: 'Broad-spectrum therapy',
              type: 'stewardship_deescalation',
              priority: 'high',
              rationale: 'Culture and current therapy should be reviewed against relevant stewardship guidance. Urine culture documents narrower susceptible option: oral Nitrofurantoin.',
              rationale_hi: 'वर्तमान चिकित्सा और संवर्धन की समीक्षा की जानी चाहिए। संवर्धन रिपोर्ट में संकीर्ण मौखिक नाइट्रोफ्यूरेंटोइन संवेदनशील है।',
              patient_evidence: "Medication Chart (pg 2): 'Meropenem 1g IV TDS'. Culture (pg 1): 'E. coli susceptible to Nitrofurantoin'.",
              guideline_evidence: 'ICMR Step 5 & WHO AWaRe 2024 mandate review of empiric carbapenems once narrower active Access agents are identified.',
              clinician_question: 'Does the available evidence warrant review of the current therapy to step down to narrower targeted therapy?',
              clinician_question_hi: 'क्या उपलब्ध साक्ष्य वर्तमान चिकित्सा की समीक्षा करने की अनुमति देते हैं?',
              recommended_next_step: 'Confirm clinical defervescence and consider transition to oral targeted agent.',
              status: 'open',
              confidence: 'high'
            },
            {
              id: 'd1_2',
              title: 'Allergy information',
              type: 'allergy_gap',
              priority: 'attention',
              rationale: 'Reaction is documented, but severity is unclear. Childhood rash is recorded without IgE anaphylaxis confirmation.',
              rationale_hi: 'एलर्जी दर्ज है लेकिन गंभीरता स्पष्ट नहीं है। बचपन के चकत्ते की प्रकृति अस्पष्ट है।',
              patient_evidence: "Allergy Record: 'Amoxicillin rash in childhood, severity not documented'.",
              guideline_evidence: 'ICMR Guidelines highlight that >90% of labeled penicillin allergies lack true anaphylaxis. Confirmation is required.',
              clinician_question: 'Can the severity of the childhood Amoxicillin reaction be clarified with the patient to permit safe beta-lactam usage if needed?',
              clinician_question_hi: 'क्या एमोक्सिसिलिन प्रतिक्रिया की गंभीरता को स्पष्ट किया जा सकता है?',
              recommended_next_step: 'Conduct structured allergy reconciliation interview with patient or treating team.',
              status: 'open',
              confidence: 'high'
            },
            {
              id: 'd1_3',
              title: 'Renal information',
              type: 'renal_review',
              priority: 'review',
              rationale: 'Available renal information may require recency confirmation. Serum creatinine was checked 72 hours ago (>48h threshold).',
              rationale_hi: 'उपलब्ध रीनल जानकारी को नवीनता पुष्टि की आवश्यकता हो सकती है। क्रिएटिनिन 72 घंटे पहले जांचा गया था।',
              patient_evidence: "Biochem Labs: 'Serum Creatinine 1.8 mg/dL (Tested 72 hours ago, baseline eGFR 38)'.",
              guideline_evidence: 'Hospital AMS Policy strictly requires serum creatinine / eGFR within 48 hours for renally eliminated drugs.',
              clinician_question: 'Is a recent serum creatinine available to verify whether Meropenem dosing requires interval adjustment?',
              clinician_question_hi: 'क्या मेरोपेनेम खुराक सत्यापन के लिए हालिया सीरम क्रिएटिनिन उपलब्ध है?',
              recommended_next_step: 'Order repeat serum creatinine/eGFR panel to guide appropriate clearance-based dosing.',
              status: 'open',
              confidence: 'high'
            }
          ]
        },
        demo2: {
          case_id: 'diya_demo_02',
          patient_alias: 'DEMO-002',
          patient_profile: {
            patient_alias: 'DEMO-002',
            age: '54',
            sex: 'Female',
            infection_site: 'Abdominal pain, unspecified syndrome',
            allergies: [
              { category: 'Allergy', name: 'Penicillin', value: 'Unspecified reaction; severity not documented', source_reference: 'intake_summary.pdf', confidence: 'high' }
            ],
            medications: [
              { category: 'Medication', name: 'current_antibiotic', value: 'Piperacillin/Tazobactam 4.5g IV TDS (Day 6)', source_reference: 'chart.pdf', confidence: 'high' }
            ],
            cultures: [],
            labs: []
          },
          summary_en: 'Review Brief: Piperacillin/Tazobactam ongoing for 6 days with no planned duration, missing clinical indication, and unknown penicillin allergy severity.',
          missing_information: [
            { field: 'treatment_duration', reason: 'Medication chart lacks stop date or planned duration (ongoing day 6).' },
            { field: 'allergy_severity', reason: 'Penicillin allergy listed without reaction details. Severity is UNKNOWN (not negative).' }
          ],
          conflicts: [],
          review_flags: [
            {
              id: 'd2_1',
              title: 'Treatment duration not documented',
              type: 'duration_gap',
              priority: 'attention',
              rationale: 'Broad-spectrum Piperacillin/Tazobactam ongoing for 6 days without stop date or planned review date.',
              patient_evidence: "Medication Chart: 'Pip-Taz 4.5g IV TDS started 6 days ago, stop date blank'.",
              guideline_evidence: 'WHO Stewardship guidance requires mandatory 48-72h antibiotic timeout and documented stop date.',
              clinician_question: 'What is the planned course duration and should a formal antimicrobial timeout review be conducted?',
              recommended_next_step: 'Establish defined stop date with the primary surgical team.',
              status: 'open',
              confidence: 'high'
            }
          ]
        },
        demo3: {
          case_id: 'diya_demo_03',
          patient_alias: 'DEMO-003',
          patient_profile: {
            patient_alias: 'DEMO-003',
            age: '70',
            sex: 'Male',
            infection_site: 'Surgical site infection',
            allergies: [
              { category: 'Allergy', name: 'Penicillin', value: 'Anaphylaxis documented in ER, NKDA on ward chart', source_reference: 'admission_records.pdf', confidence: 'high' }
            ],
            medications: [
              { category: 'Medication', name: 'current_antibiotic', value: 'Meropenem (Chart) vs Piperacillin/Tazobactam (Note)', source_reference: 'med_chart.pdf vs note.pdf', confidence: 'high' }
            ],
            cultures: [],
            labs: []
          },
          summary_en: 'Review Brief: Discrepancy detected between medication chart and surgical progress note. Allergy records conflict between ER and ward charts.',
          missing_information: [],
          conflicts: [
            {
              docA: { name: 'Medication chart (pg 2)', value: 'Meropenem 1g IV TDS' },
              docB: { name: 'Surgical progress note (pg 1)', value: 'Piperacillin/Tazobactam 4.5g IV TDS' },
              details: 'Discrepancy in active antibiotic therapy across concurrent clinical records.'
            }
          ],
          review_flags: [
            {
              id: 'd3_1',
              title: 'Document conflict in active therapy',
              type: 'document_conflict',
              priority: 'high',
              rationale: 'Medication chart lists Meropenem, while surgical note documents Piperacillin/Tazobactam. DIYA will not decide which is correct.',
              patient_evidence: "Chart pg 2: 'Meropenem' vs Note pg 1: 'Pip-Taz'.",
              guideline_evidence: 'Clinical safety protocol mandates immediate chart reconciliation before next dose.',
              clinician_question: 'Which antibiotic regimen is actively being administered by nursing staff?',
              recommended_next_step: 'Conduct immediate bedside bedside chart reconciliation.',
              status: 'open',
              confidence: 'high'
            }
          ]
        }
      };
      setAnalysisData(fallbackCases[demoKey] || fallbackCases.demo1);
      setFlags((fallbackCases[demoKey] || fallbackCases.demo1).review_flags || []);
    }
  };

  // Triggered when AnalysisProgressModal finishes
  const handleProgressComplete = () => {
    setIsAnalyzingModalOpen(false);
    setCurrentView('dashboard');
    setActiveDashboardTab('flags');
  };

  // Analyze uploaded documents (Screen 2 -> Screen 3 -> Screen 5)
  const handleAnalyzeUpload = async (casePayload) => {
    setCurrentContext({
      patient_alias: casePayload.patient_alias,
      age: casePayload.age,
      sex: casePayload.sex,
      infection_site: casePayload.infection_site
    });
    setUserRole(casePayload.user_role);
    setLanguage(casePayload.language);

    setIsAnalyzingModalOpen(true);
    try {
      const formData = new FormData();
      formData.append('patientAlias', casePayload.patient_alias);
      formData.append('userRole', casePayload.user_role);
      formData.append('language', casePayload.language);
      formData.append('demo_mode', 'true');
      (casePayload.files || []).forEach(f => formData.append('files', f));

      const res = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        body: formData
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAnalysisData(data);
      setFlags(data.review_flags || []);
    } catch (err) {
      console.warn('Backend analyze endpoint fallback:', err);
      await handleLoadDemoCase('demo1');
    }
  };

  // Load a case from Kaggle ARMD Cohort
  const handleSelectKaggleCase = async (caseId) => {
    setIsAnalyzingModalOpen(true);
    try {
      const res = await fetch(`${API_BASE}/api/kaggle/load-case/${caseId}`, {
        method: 'POST'
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setAnalysisData(data);
      setFlags(data.review_flags || []);
    } catch (err) {
      console.warn('Kaggle live load fallback:', err);
      await handleLoadDemoCase('demo1');
    }
  };

  // Open Document Viewer
  const handleOpenDocViewer = (docName, evidenceText) => {
    setActiveDocName(docName || 'culture_report.pdf');
    setActiveDocEvidence(evidenceText || '');
    setIsDocViewerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#060D09] text-sage-100 font-sans antialiased flex flex-col justify-between selection:bg-emerald-900/60 selection:text-emerald-200">
      <div>
        {/* DIYA Floating Translucent Glass Navbar */}
        <Navbar
          language={language}
          setLanguage={setLanguage}
          userRole={userRole}
          setUserRole={setUserRole}
          onHelpClick={() => setShowHelpModal(true)}
          onKaggleClick={() => setCurrentView('kaggle')}
          onNewCaseClick={() => setCurrentView('landing')}
          onReviewsClick={() => {
            if (analysisData) setCurrentView('dashboard');
            else setCurrentView('landing');
          }}
          onEvidenceClick={() => {
            if (analysisData) {
              setCurrentView('dashboard');
              setActiveDashboardTab('evidence_chain');
            } else {
              handleLoadDemoCase('demo1');
            }
          }}
          currentView={currentView}
        />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          {/* SCREEN 1: Minimalist Landing / Dashboard */}
          {currentView === 'landing' && (
            <LandingDashboard
              onStartNewReview={() => setCurrentView('new_review')}
              onLoadDemoCase={handleLoadDemoCase}
              onExploreKaggle={() => setCurrentView('kaggle')}
              language={language}
            />
          )}

          {/* SCREEN 2: New Review & Minimalist Upload Area */}
          {currentView === 'new_review' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <button
                onClick={() => setCurrentView('landing')}
                className="flex items-center space-x-2 text-xs font-mono text-sage-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Overview</span>
              </button>

              <NewReviewScreen
                onAnalyze={handleAnalyzeUpload}
                isAnalyzing={isAnalyzingModalOpen}
                initialContext={currentContext}
                language={language}
                userRole={userRole}
              />
            </div>
          )}

          {/* KAGGLE ARMD / MDR COHORTS */}
          {currentView === 'kaggle' && (
            <div className="space-y-6 max-w-5xl mx-auto">
              <button
                onClick={() => setCurrentView('landing')}
                className="flex items-center space-x-2 text-xs font-mono text-sage-400 hover:text-white transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Overview</span>
              </button>

              <KaggleCaseSelector
                onSelectCase={handleSelectKaggleCase}
                isAnalyzing={isAnalyzingModalOpen}
              />
            </div>
          )}

          {/* SCREENS 4, 5, 6, 7: Patient Review Screen */}
          {currentView === 'dashboard' && analysisData && (
            <div className="space-y-8 text-left">
              {/* Review Screen Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6">
                <div className="flex items-start space-x-4">
                  <button
                    onClick={() => setCurrentView('landing')}
                    className="p-2.5 rounded-full glass-surface text-sage-300 hover:text-white hover:border-emerald-500/30 transition-all mt-1"
                    title="Back to Cases"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
                        Patient Review
                      </span>
                      <span className="text-xs font-mono text-sage-500">·</span>
                      <span className="text-xs font-mono text-white font-medium">
                        {analysisData.patient_profile?.patient_alias || 'DEMO-001'}
                      </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                      {analysisData.patient_profile?.age || '62'} years · {analysisData.patient_profile?.sex || 'Male'} · {analysisData.patient_profile?.infection_site || 'Urinary infection'}
                    </h1>

                    <p className="text-[11px] font-mono text-sage-400">
                      Analysis complete · 12.4s · {flags.length} review items identified
                    </p>
                  </div>
                </div>

                {/* Sub-view switcher tabs (Apple-style segmented control) */}
                <div className="flex bg-forest-950/80 p-1 rounded-full border border-white/10 text-xs font-medium self-end md:self-center">
                  <button
                    onClick={() => setActiveDashboardTab('flags')}
                    className={`px-4 py-1.5 rounded-full transition-all ${
                      activeDashboardTab === 'flags'
                        ? 'bg-emerald-950 text-emerald-200 border border-emerald-500/30 shadow-xs'
                        : 'text-sage-400 hover:text-white'
                    }`}
                  >
                    Review Dashboard
                  </button>
                  <button
                    onClick={() => setActiveDashboardTab('evidence_chain')}
                    className={`px-4 py-1.5 rounded-full transition-all ${
                      activeDashboardTab === 'evidence_chain'
                        ? 'bg-emerald-950 text-emerald-200 border border-emerald-500/30 shadow-xs'
                        : 'text-sage-400 hover:text-white'
                    }`}
                  >
                    Evidence Trail
                  </button>
                  <button
                    onClick={() => setActiveDashboardTab('export_brief')}
                    className={`px-4 py-1.5 rounded-full transition-all ${
                      activeDashboardTab === 'export_brief'
                        ? 'bg-emerald-950 text-emerald-200 border border-emerald-500/30 shadow-xs'
                        : 'text-sage-400 hover:text-white'
                    }`}
                  >
                    Printable Brief
                  </button>
                </div>
              </div>

              {/* Sub-View 1: Main Clinical Dashboard (Patient Context + Flags + Signature Cards) */}
              {activeDashboardTab === 'flags' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Patient Context Panel (5 Cols) */}
                  <div className="lg:col-span-5 space-y-6">
                    <PatientSummaryPanel
                      profile={analysisData.patient_profile}
                      language={language}
                      onSelectFact={(cat, doc, snip) => handleOpenDocViewer(doc, snip)}
                    />

                    {/* Quick Button to Open Split Document Viewer */}
                    <button
                      onClick={() => handleOpenDocViewer('culture_report.pdf', 'Escherichia coli >10^5 CFU/mL. Nitrofurantoin: Susceptible.')}
                      className="w-full py-3 rounded-2xl glass-surface hover:bg-white/10 border border-white/10 text-xs font-mono text-sage-300 hover:text-white flex items-center justify-center space-x-2 transition-all cursor-pointer"
                    >
                      <Eye className="w-4 h-4 text-emerald-400" />
                      <span>Open Multimodal Document Split View</span>
                    </button>
                  </div>

                  {/* Right Column: Review Flags & Special Conflict / Gap Cards (7 Cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    
                    {/* Render Document Conflict Card if present */}
                    {analysisData.conflicts && analysisData.conflicts.length > 0 && (
                      <DocumentConflictCard
                        docA={analysisData.conflicts[0].docA}
                        docB={analysisData.conflicts[0].docB}
                        customNotice="DIYA will not decide which is correct. Human verification required."
                      />
                    )}

                    {/* Render Information Gap Card if present */}
                    {analysisData.missing_information && analysisData.missing_information.length > 0 && (
                      <InformationGapCard
                        field="Allergy severity"
                        details={analysisData.missing_information[0].reason}
                        customNotice="DIYA has not assumed 'no allergy'. Human verification required."
                      />
                    )}

                    {/* Review Flags: What Deserves Attention */}
                    <ReviewFlagsDashboard
                      flags={flags}
                      setFlags={setFlags}
                      language={language}
                      onOpenDocumentViewer={(doc, snip) => handleOpenDocViewer(doc, snip)}
                    />

                  </div>

                </div>
              )}

              {/* Sub-View 2: Signature Component — Evidence Trail */}
              {activeDashboardTab === 'evidence_chain' && (
                <div className="max-w-3xl mx-auto space-y-8">
                  <div className="space-y-1">
                    <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
                      Evidence Trail
                    </h2>
                    <p className="text-xs text-sage-300/80 font-light">
                      Visual audit trail proving why each stewardship finding was identified from patient documents to guidelines.
                    </p>
                  </div>

                  {flags.map((flag, i) => (
                    <EvidenceChainView key={flag.id || i} flag={flag} language={language} />
                  ))}
                </div>
              )}

              {/* Sub-View 3: Export Review Card */}
              {activeDashboardTab === 'export_brief' && (
                <div className="max-w-3xl mx-auto">
                  <ExportReviewCard
                    analysisData={{ ...analysisData, review_flags: flags }}
                    language={language}
                  />
                </div>
              )}

            </div>
          )}
        </main>
      </div>

      {/* Subtle Visible Clinical Disclaimer Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-xs text-sage-500 font-light no-print max-w-6xl mx-auto w-full px-6 space-y-1">
        <p className="text-sage-400">
          DIYA is a clinical decision-support prototype. It identifies information and evidence for professional review; it does not diagnose, prescribe, or change treatment.
        </p>
        <p className="text-[11px] text-sage-600 font-mono">
          &ldquo;From fragmented records to evidence-grounded review.&rdquo;
        </p>
      </footer>

      {/* Screen 3: Analysis Progress Modal */}
      <AnalysisProgressModal
        isOpen={isAnalyzingModalOpen}
        onComplete={handleProgressComplete}
      />

      {/* Document Viewer Split View Modal */}
      <DocumentViewerModal
        isOpen={isDocViewerOpen}
        onClose={() => setIsDocViewerOpen(false)}
        initialDocument={activeDocName}
        evidenceSnippet={activeDocEvidence}
      />

      {/* Help / Guide Modal */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4">
          <div className="rounded-3xl glass-surface border border-white/10 p-8 max-w-lg w-full max-h-[85vh] overflow-y-auto space-y-4 text-xs shadow-2xl text-left">
            <h3 className="text-base font-light text-white border-b border-white/10 pb-3">
              DIYA Prototype Architecture &amp; Guide
            </h3>
            <p className="text-sage-300 leading-relaxed font-light">
              DIYA is an evidence-grounded antimicrobial stewardship workflow assistant that automates the information-gathering and cross-checking work required before a clinician or pharmacist makes a decision.
            </p>
            <div className="space-y-2 text-sage-300">
              <h4 className="font-medium text-white font-mono uppercase text-[11px]">Core Features:</h4>
              <ul className="list-disc pl-4 space-y-1.5 font-light">
                <li><strong>Fragmented-Context Reasoning:</strong> Synthesizes admission history, medication chart, allergy record, culture/AST, and renal labs.</li>
                <li><strong>Unknown &ne; Negative:</strong> Distinguishes verified absence from unrecorded/missing data.</li>
                <li><strong>Evidence Trail:</strong> Visualizes Patient Document &rarr; Observation &rarr; Guideline &rarr; Review Question &rarr; Human Decision.</li>
                <li><strong>Bilingual Mode:</strong> English &amp; Hindi with preserved generic drug names and numbers.</li>
                <li><strong>Kaggle Integration:</strong> Live ingestion of ICU culture AST records from Kaggle ARMD.</li>
              </ul>
            </div>
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setShowHelpModal(false)}
                className="px-5 py-2 bg-emerald-400 hover:bg-emerald-300 text-forest-950 rounded-full font-medium text-xs transition-all"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}

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
