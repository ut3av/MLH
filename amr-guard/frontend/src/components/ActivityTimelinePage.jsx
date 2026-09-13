import React from 'react';
import { Clock, ShieldCheck, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function ActivityTimelinePage({ onSelectCase }) {
  const activities = [
    {
      time: '10:47 AM',
      date: 'Today',
      title: 'Case escalated to Infectious Disease Consultant',
      patientId: 'PT-1042',
      actor: 'Dr. Sharma (Clinical Pharmacist)',
      details: 'Escalated suggested Ceftriaxone de-escalation for clinical stability validation in ICU.',
      type: 'escalation'
    },
    {
      time: '10:45 AM',
      date: 'Today',
      title: 'Pharmacist reviewed antimicrobial susceptibility profile',
      patientId: 'PT-1042',
      actor: 'Dr. Sharma (Clinical Pharmacist)',
      details: 'Confirmed susceptibility to Ceftriaxone (MIC <= 1 mg/L) from blood culture.',
      type: 'review'
    },
    {
      time: '10:43 AM',
      date: 'Today',
      title: 'DIYA decision-support review brief generated',
      patientId: 'PT-1042',
      actor: 'DIYA Clinical Engine',
      details: 'Cross-checked ICMR Step 5 guidelines and flagged empirical Meropenem de-escalation.',
      type: 'analysis'
    },
    {
      time: '10:42 AM',
      date: 'Today',
      title: 'Clinical records uploaded and parsed',
      patientId: 'PT-1042',
      actor: 'Staff Nurse (Ward Medicine)',
      details: 'Attached Blood_Culture_Report.pdf, Patient_History.pdf, and Renal_Function.pdf.',
      type: 'upload'
    },
    {
      time: '10:15 AM',
      date: 'Today',
      title: 'Antimicrobial timeout completed: Piperacillin/Tazobactam',
      patientId: 'PT-1039',
      actor: 'AMS Review Committee',
      details: 'Recommended 7-day fixed stop date established for complicated UTI course.',
      type: 'timeout'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4 text-left">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Department Audit Trail
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Hospital Stewardship Activity
        </h1>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Real-time audit log of all clinical document uploads, reviews, timeouts, and physician escalations.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="space-y-6">
          {activities.map((item, idx) => (
            <div key={idx} className="flex items-start space-x-4">
              <div className="flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-600 ring-4 ring-emerald-50 mt-1.5" />
                {idx < activities.length - 1 && (
                  <div className="w-px h-16 bg-slate-200 my-1" />
                )}
              </div>

              <div className="space-y-1 text-xs flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-slate-400 font-semibold">{item.time}</span>
                  <span className="text-slate-300">·</span>
                  <span className="font-mono font-bold text-slate-900">{item.patientId}</span>
                  <span className="text-slate-300">·</span>
                  <span className="text-slate-500">{item.actor}</span>
                </div>

                <h4 className="font-bold text-slate-900 text-sm">
                  {item.title}
                </h4>

                <p className="text-slate-600 font-normal">
                  {item.details}
                </p>

                {item.patientId === 'PT-1042' && (
                  <button
                    onClick={() => onSelectCase('demo1')}
                    className="pt-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 flex items-center space-x-1"
                  >
                    <span>Inspect Case PT-1042</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
