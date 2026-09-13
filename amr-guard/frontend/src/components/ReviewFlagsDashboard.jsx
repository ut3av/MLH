import React from 'react';
import { AlertTriangle, Info, FileWarning, HelpCircle } from 'lucide-react';

export default function ReviewFlagsDashboard({ flags, questions, setFlags, setQuestions }) {
  if (!flags || flags.length === 0) return null;

  const handleFlagStatus = (id, status) => {
    setFlags(flags.map(f => f.flag_id === id ? { ...f, status } : f));
  };
  
  const handleQuestionStatus = (id, status) => {
    setQuestions(questions.map(q => q.question_id === id ? { ...q, status } : q));
  };

  return (
    <div className="space-y-8">
      {/* Review Flags Section */}
      <div>
        <h2 className="text-xl font-bold text-slate-800 flex items-center mb-4">
          <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
          Stewardship Review Flags
        </h2>
        
        <div className="space-y-4">
          {flags.map((flag) => (
            <div key={flag.flag_id} className={`p-4 rounded-lg border shadow-sm ${flag.priority === 'high' ? 'bg-rose-50 border-rose-200' : 'bg-amber-50 border-amber-200'}`}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`font-semibold text-lg ${flag.priority === 'high' ? 'text-rose-800' : 'text-amber-800'}`}>
                    {flag.title}
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">{flag.description}</p>
                </div>
                <span className={`px-2 py-1 text-xs font-bold uppercase rounded ${flag.priority === 'high' ? 'bg-rose-200 text-rose-800' : 'bg-amber-200 text-amber-800'}`}>
                  {flag.priority}
                </span>
              </div>
              
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-3 rounded border border-slate-200 text-sm">
                  <strong className="text-slate-700 flex items-center mb-2"><FileWarning className="h-4 w-4 mr-1 text-slate-500"/> Patient Evidence</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    {flag.patient_evidence.map((ev, i) => (
                       <li key={i} className="text-slate-600">{ev}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white p-3 rounded border border-slate-200 text-sm">
                  <strong className="text-slate-700 flex items-center mb-2"><Info className="h-4 w-4 mr-1 text-blue-500"/> Guideline Links</strong>
                  <ul className="list-disc pl-5 space-y-1">
                    {flag.guideline_evidence_ids.map((gid, i) => (
                       <li key={i} className="text-blue-600">{gid}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-4 flex space-x-2 border-t pt-3 border-slate-200/50">
                <button 
                  onClick={() => handleFlagStatus(flag.flag_id, 'reviewed')}
                  className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${flag.status === 'reviewed' ? 'bg-emerald-100 text-emerald-700' : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-300'}`}
                >
                  Mark Reviewed
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Clinician Questions Section */}
      <div>
         <h2 className="text-xl font-bold text-slate-800 flex items-center mb-4">
          <HelpCircle className="h-5 w-5 text-indigo-500 mr-2" />
          Clinician Review Questions
        </h2>
        
        <div className="space-y-4">
           {questions.map(q => (
              <div key={q.question_id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex items-start">
                 <div className="bg-indigo-100 p-2 rounded-full mr-4 shrink-0">
                    <HelpCircle className="h-5 w-5 text-indigo-600" />
                 </div>
                 <div className="flex-grow">
                    <h3 className="font-semibold text-slate-800 text-lg">{q.question}</h3>
                    <p className="text-sm text-slate-600 mt-1 mb-2"><strong>Reason:</strong> {q.reason}</p>
                    <div className="flex space-x-2">
                       <button onClick={() => handleQuestionStatus(q.question_id, 'resolved')} className={`text-xs px-2 py-1 rounded border ${q.status === 'resolved' ? 'bg-emerald-100 text-emerald-700 border-emerald-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>Resolved</button>
                       <button onClick={() => handleQuestionStatus(q.question_id, 'escalated')} className={`text-xs px-2 py-1 rounded border ${q.status === 'escalated' ? 'bg-rose-100 text-rose-700 border-rose-200' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>Escalate</button>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      </div>

    </div>
  );
}
