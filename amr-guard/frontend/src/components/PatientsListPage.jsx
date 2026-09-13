import React from 'react';
import { Users, ArrowRight, Activity, Clock, ShieldCheck } from 'lucide-react';

export default function PatientsListPage({ onSelectPatient }) {
  const patientList = [
    {
      id: 'demo1',
      patientId: 'PT-1042',
      age: 62,
      sex: 'Male',
      ward: 'Medicine / ICU Bed 08',
      infection: 'Bloodstream (Bacteremia)',
      organism: 'Escherichia coli (>10^5 CFU/mL)',
      currentDrug: 'Meropenem 1g IV TDS',
      status: 'Review required'
    },
    {
      id: 'demo2',
      patientId: 'PT-1039',
      age: 54,
      sex: 'Female',
      ward: 'Ward 3 (General)',
      infection: 'Complicated urinary tract infection',
      organism: 'Klebsiella pneumoniae',
      currentDrug: 'Piperacillin/Tazobactam 4.5g IV TDS',
      status: 'Timeout review due'
    },
    {
      id: 'demo3',
      patientId: 'PT-1035',
      age: 70,
      sex: 'Male',
      ward: 'Surgical Ward 2',
      infection: 'Post-operative surgical site infection',
      organism: 'Gram-negative rod (Preliminary)',
      currentDrug: 'Meropenem vs Pip-Taz (Discrepancy)',
      status: 'Document conflict'
    },
    {
      id: 'demo1',
      patientId: 'PT-1028',
      age: 58,
      sex: 'Female',
      ward: 'Respiratory ICU',
      infection: 'Hospital-acquired pneumonia',
      organism: 'Pseudomonas aeruginosa',
      currentDrug: 'Cefepime 2g IV BD',
      status: 'Stable monitoring'
    }
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 text-left">
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Active Inpatient Queue
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Patients under Antimicrobial Review
        </h1>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Real-time patient monitoring for hospital pharmacists and antimicrobial stewardship teams.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patientList.map((p) => (
          <div
            key={p.patientId}
            onClick={() => onSelectPatient(p.id)}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between space-y-4 text-left"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-base font-bold text-slate-900">
                  {p.patientId}
                </span>
                <span className="text-xs text-slate-500">
                  {p.age}y · {p.sex} · {p.ward}
                </span>
              </div>

              <div className="text-xs space-y-1 text-slate-600">
                <p><strong>Infection:</strong> {p.infection}</p>
                <p><strong>Microbiology:</strong> <span className="italic">{p.organism}</span></p>
                <p><strong>Current Therapy:</strong> <span className="font-mono text-emerald-700">{p.currentDrug}</span></p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] border ${
                p.status.includes('conflict') 
                  ? 'bg-rose-50 text-rose-800 border-rose-200'
                  : p.status.includes('Review')
                    ? 'bg-amber-50 text-amber-800 border-amber-200'
                    : 'bg-emerald-50 text-emerald-800 border-emerald-200'
              }`}>
                {p.status}
              </span>

              <span className="font-semibold text-emerald-700 group-hover:text-emerald-800 flex items-center space-x-1">
                <span>Open Dossier</span>
                <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
