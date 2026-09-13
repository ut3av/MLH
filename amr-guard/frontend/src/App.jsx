import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MultiDocumentUpload from './components/MultiDocumentUpload';
import PatientSummaryPanel from './components/PatientSummaryPanel';
import ReviewFlagsDashboard from './components/ReviewFlagsDashboard';
import ExportReviewCard from './components/ExportReviewCard';

function App() {
  const [demoMode, setDemoMode] = useState(true);
  const [files, setFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  const [flags, setFlags] = useState([]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    // Simulate API call for Demo Mode
    setTimeout(() => {
      const mockResponse = {
        patient_profile: {
          age: "65",
          sex: "Male",
          infection_site: "Urinary Tract",
          allergies: [
            { category: "Allergy", name: "Amoxicillin", value: "Rash, severity unclear" }
          ],
          medications: [
            { category: "Medication", name: "current_antibiotic", value: "Meropenem 1g IV TDS" }
          ],
          cultures: [
            { category: "Microbiology", name: "Nitrofurantoin", value: "SUSCEPTIBLE" },
            { category: "Microbiology", name: "Organism", value: "Escherichia coli" }
          ],
          labs: [
            { category: "Lab", name: "Creatinine", value: "1.8 mg/dL (3 days ago)" }
          ],
          genetics: []
        },
        missing_information: [
          { field: "treatment_duration", reason: "Planned duration not documented on med chart" },
          { field: "allergy_severity", reason: "Only 'rash' documented, severity unknown" }
        ],
        conflicts: [],
        review_flags: [
          {
            id: "f1",
            type: "stewardship_review",
            priority: "high",
            rationale: "Broad-spectrum therapy currently prescribed, but narrower susceptible options documented.",
            patient_evidence: "Current: Meropenem. Susceptible: Nitrofurantoin",
            guideline_evidence: "De-escalation of empirical therapy should be performed as soon as culture results are available.",
            clinician_question: "Can therapy be de-escalated to oral Nitrofurantoin based on these culture results?",
            status: "open"
          },
          {
            id: "f2",
            type: "allergy_clarification",
            priority: "medium",
            rationale: "Allergy severity is unclear or documented vaguely.",
            patient_evidence: "Allergy reported: Amoxicillin - Reaction: Rash",
            guideline_evidence: "Many patients labeled as 'penicillin allergic' can safely receive beta-lactams.",
            clinician_question: "Can the severity of the Amoxicillin allergy be confirmed?",
            status: "open"
          },
          {
             id: "f3",
             type: "renal_review",
             priority: "high",
             rationale: "Renal result is absent or potentially outdated while receiving renally-cleared medication.",
             patient_evidence: "Medication: Meropenem. Lab: Creatinine 1.8 mg/dL (3 days ago).",
             guideline_evidence: "A serum creatinine or eGFR measurement within the last 48 hours is required.",
             clinician_question: "Is there a more recent renal function test available?",
             status: "open"
          }
        ]
      };
      
      setAnalysisData(mockResponse);
      setFlags(mockResponse.review_flags);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      <Navbar demoMode={demoMode} setDemoMode={setDemoMode} onHelpClick={() => {}} />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {!analysisData ? (
           <div className="max-w-3xl mx-auto space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
                 <h2 className="text-xl font-bold mb-4">Start New Case</h2>
                 <p className="text-slate-600 mb-6">Upload clinical documents to generate a patient-specific stewardship review.</p>
                 <MultiDocumentUpload files={files} setFiles={setFiles} />
                 
                 <div className="mt-6 flex justify-end">
                    <button 
                      onClick={handleAnalyze}
                      disabled={analyzing || files.length === 0}
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-medium rounded-lg shadow transition-colors flex items-center"
                    >
                      {analyzing ? 'Extracting & Analyzing...' : 'Generate Review Brief'}
                    </button>
                 </div>
                 {demoMode && (
                   <p className="mt-3 text-sm text-amber-600 text-right">
                     Running in Demo Mode. Results will be synthesized from demo packet.
                   </p>
                 )}
              </div>
           </div>
        ) : (
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1 space-y-6">
                 <PatientSummaryPanel profile={analysisData.patient_profile} />
                 <button onClick={() => setAnalysisData(null)} className="w-full py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-100">
                    Start New Case
                 </button>
              </div>
              <div className="lg:col-span-2 space-y-6">
                 <ReviewFlagsDashboard flags={flags} setFlags={setFlags} />
                 <ExportReviewCard analysisData={{...analysisData, review_flags: flags}} />
              </div>
           </div>
        )}
      </main>

      {/* Basic print styles */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body * { visibility: hidden; }
          #export-card, #export-card * { visibility: visible; }
          #export-card { position: absolute; left: 0; top: 0; width: 100%; border: none; box-shadow: none; }
          .no-print { display: none; }
        }
      `}} />
    </div>
  );
}

export default App;
