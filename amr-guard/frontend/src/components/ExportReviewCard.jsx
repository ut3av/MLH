import React from 'react';
import { Download, ShieldCheck, FileWarning, HelpCircle } from 'lucide-react';

export default function ExportReviewCard({ analysisData }) {
  if (!analysisData) return null;

  const { rapid_summary, review_flags, clinician_review_questions, missing_information } = analysisData;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 mt-8" id="export-card">
      <div className="flex justify-between items-start border-b pb-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 flex items-center">
            <ShieldCheck className="h-6 w-6 text-emerald-500 mr-2" />
            Antigravity Stewardship Review
          </h2>
          <p className="text-sm text-slate-500 mt-1">Generated for Clinical/Pharmacist Review</p>
        </div>
        <button onClick={handlePrint} className="flex items-center px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded transition-colors no-print">
          <Download className="h-4 w-4 mr-2" />
          Export / Print
        </button>
      </div>

      <div className="mb-6 p-4 bg-slate-50 border rounded-lg">
         <h3 className="text-lg font-semibold mb-2">Rapid Summary</h3>
         <p className="text-slate-700 font-medium">{rapid_summary.one_sentence_summary}</p>
         <div className="mt-2 text-sm text-slate-500 flex space-x-4">
            <span><strong>Patient:</strong> {rapid_summary.patient_alias}</span>
            <span><strong>Setting:</strong> {rapid_summary.clinical_setting}</span>
         </div>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">Priority Action Queue</h3>
          {review_flags.map(flag => (
             <div key={flag.flag_id} className="mb-3">
               <h4 className="font-semibold text-slate-800 text-sm">
                  {flag.status === 'reviewed' ? '✅' : '⚠️'} {flag.title}
               </h4>
               <p className="text-xs text-slate-600 mt-1">{flag.description}</p>
             </div>
          ))}
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2 flex items-center"><HelpCircle className="h-4 w-4 mr-1 text-indigo-500"/> Clinician Questions</h3>
          {clinician_review_questions.map(q => (
             <div key={q.question_id} className="mb-3">
               <h4 className="font-semibold text-slate-800 text-sm">{q.question}</h4>
               <p className="text-xs text-slate-600 mt-1"><strong>Status:</strong> {q.status}</p>
             </div>
          ))}
        </div>
      </div>
      
      {missing_information.length > 0 && (
         <div className="mb-8 p-3 border border-amber-200 bg-amber-50 rounded">
            <h3 className="text-sm uppercase tracking-wider text-amber-800 font-semibold mb-2 flex items-center"><FileWarning className="h-4 w-4 mr-1"/> Missing Information</h3>
            <ul className="list-disc pl-5 text-sm text-amber-700">
               {missing_information.map((m, i) => (
                  <li key={i}>{m.field}: {m.message}</li>
               ))}
            </ul>
         </div>
      )}

      <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-400 text-center">
        <FileWarning className="h-4 w-4 inline mr-1" />
        Disclaimer: Antigravity does not prescribe or alter doses. This is a clinical decision-support tool. 
        Always correlate with patient clinical stability and local guidelines before altering therapy.
      </div>
    </div>
  );
}
