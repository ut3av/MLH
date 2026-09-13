import React from 'react';
import { AlertTriangle, Info, CheckCircle, FileWarning } from 'lucide-react';

export default function ReviewFlagsDashboard({ flags, setFlags }) {
  if (!flags || flags.length === 0) return null;

  const handleStatusChange = (id, status) => {
    setFlags(flags.map(f => f.id === id ? { ...f, status } : f));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-slate-800 flex items-center">
        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
        Stewardship Review Flags
      </h2>
      
      {flags.map((flag) => (
        <div key={flag.id} className={`p-4 rounded-lg border shadow-sm ${flag.priority === 'high' ? 'bg-rose-50 border-rose-200' : 'bg-amber-50 border-amber-200'}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className={`font-semibold text-lg ${flag.priority === 'high' ? 'text-rose-800' : 'text-amber-800'}`}>
              {flag.rationale}
            </h3>
            <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${flag.priority === 'high' ? 'bg-rose-200 text-rose-800' : 'bg-amber-200 text-amber-800'}`}>
              {flag.priority}
            </span>
          </div>
          
          <div className="mt-3 space-y-3">
            <div className="bg-white p-3 rounded border border-slate-200 text-sm">
              <strong className="text-slate-700 flex items-center mb-1"><FileWarning className="h-4 w-4 mr-1 text-slate-500"/> Patient Evidence:</strong>
              <p className="text-slate-600">{flag.patient_evidence}</p>
            </div>
            
            <div className="bg-white p-3 rounded border border-slate-200 text-sm">
              <strong className="text-slate-700 flex items-center mb-1"><Info className="h-4 w-4 mr-1 text-blue-500"/> Guideline Guidance:</strong>
              <p className="text-slate-600">{flag.guideline_evidence}</p>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-800 text-white rounded-md flex items-start">
            <HelpCircleIcon className="h-5 w-5 text-emerald-400 mr-2 shrink-0 mt-0.5" />
            <p className="font-medium text-sm leading-relaxed">{flag.clinician_question}</p>
          </div>

          <div className="mt-4 flex space-x-2 border-t pt-3 border-slate-200/50">
            <button 
              onClick={() => handleStatusChange(flag.id, 'reviewed')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${flag.status === 'reviewed' ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-300'}`}
            >
              Mark Reviewed
            </button>
            <button 
              onClick={() => handleStatusChange(flag.id, 'escalated')}
              className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${flag.status === 'escalated' ? 'bg-indigo-100 text-indigo-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-300'}`}
            >
              Escalate to ID
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function HelpCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <path d="M12 17h.01" />
    </svg>
  )
}
