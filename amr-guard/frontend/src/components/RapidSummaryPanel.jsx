import React from 'react';
import { Activity, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function RapidSummaryPanel({ summary }) {
  if (!summary) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 mb-6">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Rapid Review Summary</h2>
          <p className="text-slate-600 font-medium text-lg mb-1">{summary.one_sentence_summary}</p>
          <div className="flex space-x-4 text-sm text-slate-500 mt-3">
            <span><strong>Patient:</strong> {summary.patient_alias}</span>
            <span><strong>Setting:</strong> {summary.clinical_setting}</span>
            <span><strong>Site:</strong> {summary.infection_site}</span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className={`px-3 py-1 rounded-full text-sm font-bold uppercase ${
            summary.review_priority === 'high' ? 'bg-rose-100 text-rose-800' : 
            summary.review_priority === 'medium' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
          }`}>
            Priority: {summary.review_priority}
          </span>
          <span className="text-xs text-slate-400 mt-2 flex items-center">
             Data Completeness: {summary.data_completeness}
          </span>
        </div>
      </div>
    </div>
  );
}
