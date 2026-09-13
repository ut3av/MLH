import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MultiDocumentUpload from './components/MultiDocumentUpload';
import PatientSummaryPanel from './components/PatientSummaryPanel';
import ReviewFlagsDashboard from './components/ReviewFlagsDashboard';
import ExportReviewCard from './components/ExportReviewCard';
import RapidSummaryPanel from './components/RapidSummaryPanel';

function App() {
  const [demoMode, setDemoMode] = useState(true);
  const [files, setFiles] = useState([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);
  
  // State for interactive flags and questions
  const [flags, setFlags] = useState([]);
  const [questions, setQuestions] = useState([]);

  const handleAnalyze = async () => {
    setAnalyzing(true);
    
    try {
      const formData = new FormData();
      files.forEach(f => formData.append('files', f));
      formData.append('demo_mode', demoMode);

      // We call the local backend. In real deployment this would be relative or configurable.
      const response = await fetch('http://localhost:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch analysis");
      }

      const data = await response.json();
      setAnalysisData(data);
      setFlags(data.review_flags || []);
      setQuestions(data.clinician_review_questions || []);
    } catch (error) {
       console.error(error);
       alert("Error analyzing files. Is the backend running?");
    } finally {
      setAnalyzing(false);
    }
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
              <div className="lg:col-span-3">
                 <RapidSummaryPanel summary={analysisData.rapid_summary} />
              </div>
              <div className="lg:col-span-1 space-y-6">
                 <PatientSummaryPanel analysisData={analysisData} />
                 <button onClick={() => setAnalysisData(null)} className="w-full py-2 border border-slate-300 rounded text-slate-600 hover:bg-slate-100">
                    Start New Case
                 </button>
              </div>
              <div className="lg:col-span-2 space-y-6">
                 <ReviewFlagsDashboard 
                    flags={flags} 
                    questions={questions}
                    setFlags={setFlags}
                    setQuestions={setQuestions}
                 />
                 <ExportReviewCard analysisData={{...analysisData, review_flags: flags, clinician_review_questions: questions}} />
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
