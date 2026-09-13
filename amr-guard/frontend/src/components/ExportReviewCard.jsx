import React from 'react';
import { Download, ShieldCheck, FileWarning } from 'lucide-react';

export default function ExportReviewCard({ analysisData }) {
  if (!analysisData) return null;

  const { patient_profile, review_flags, missing_information } = analysisData;
  const current_abx = patient_profile.medications.find(m => m.name === "current_antibiotic")?.value || "Unknown";

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

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">Patient Details</h3>
          <p><strong>Age/Sex:</strong> {patient_profile.age} / {patient_profile.sex}</p>
          <p><strong>Infection Site:</strong> {patient_profile.infection_site}</p>
          <p><strong>Current Therapy:</strong> {current_abx}</p>
        </div>
        <div>
          <h3 className="text-sm uppercase tracking-wider text-slate-500 font-semibold mb-2">Missing Information</h3>
          {missing_information.length > 0 ? (
            <ul className="list-disc pl-4 text-amber-700">
              {missing_information.map((m, i) => (
                <li key={i}>{m.reason}</li>
              ))}
            </ul>
          ) : (
             <p className="text-slate-600">None identified.</p>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-800 mb-4 border-b pb-2">Priority Action Queue</h3>
        {review_flags.map(flag => (
           <div key={flag.id} className="mb-4">
             <h4 className="font-semibold text-slate-800">
                {flag.status === 'reviewed' ? '✅' : '⚠️'} {flag.rationale}
             </h4>
             <p className="text-sm text-slate-600 mt-1"><strong>Action:</strong> {flag.clinician_question}</p>
           </div>
        ))}
      </div>

      <div className="mt-12 pt-6 border-t border-slate-200 text-xs text-slate-400 text-center">
        <FileWarning className="h-4 w-4 inline mr-1" />
        Disclaimer: Antigravity does not prescribe or alter doses. This is a clinical decision-support tool. 
        Always correlate with patient clinical stability and local guidelines before altering therapy.
      </div>
    </div>
  );
}
