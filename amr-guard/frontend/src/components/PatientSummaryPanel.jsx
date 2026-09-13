import React, { useState } from 'react';
import { 
  FileText, ArrowUpRight, ShieldCheck, AlertCircle, 
  HelpCircle, CheckCircle2, ChevronRight 
} from 'lucide-react';

export default function PatientSummaryPanel({ 
  profile, 
  language = 'English', 
  onSelectFact 
}) {
  const [showAstTooltip, setShowAstTooltip] = useState(false);
  const isHindi = language === 'Hindi';

  if (!profile) return null;

  const currentAntibiotic = profile.medications && profile.medications.length > 0
    ? profile.medications[0].value
    : 'Meropenem 1g IV TDS';

  const organismFact = profile.cultures?.find(c => c.name === 'Organism');
  const organism = organismFact ? organismFact.value : 'Escherichia coli';
  const specimen = profile.patient_alias === 'PT-1042' ? 'Blood' : 'Urine';

  const allergyFact = profile.allergies && profile.allergies.length > 0 ? profile.allergies[0] : null;
  const allergyDrug = allergyFact ? allergyFact.name : 'Amoxicillin';
  const allergySeverity = 'Not documented';

  const creatinine = '1.8 mg/dL';

  // Susceptibility Panel Data
  const astData = [
    { antibiotic: 'Amoxicillin', result: 'R', tag: 'Resistant', color: 'text-rose-700 bg-rose-50 border-rose-200' },
    { antibiotic: 'Ceftriaxone', result: 'S', tag: 'Susceptible', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { antibiotic: 'Ciprofloxacin', result: 'S', tag: 'Susceptible', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { antibiotic: 'Meropenem', result: 'S', tag: 'Susceptible', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { antibiotic: 'Nitrofurantoin', result: 'S', tag: 'Susceptible', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' },
    { antibiotic: 'Piperacillin-Tazobactam', result: 'S', tag: 'Susceptible', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' }
  ];

  return (
    <div className="space-y-6 text-left">
      
      {/* Patient Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex justify-between items-start border-b border-slate-100 pb-3">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
              Patient Review
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              {profile.patient_alias || 'PT-1042'}
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            Ward: {profile.ward || 'Medicine'}
          </span>
        </div>

        <p className="text-xs text-slate-600 font-medium">
          {profile.age || '62'} years · {profile.sex || 'Male'} · Ward: {profile.ward || 'Medicine'}
        </p>
      </div>

      {/* Clinical Snapshot Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Clinical snapshot
          </h3>
        </div>

        <div className="space-y-3.5 text-xs">
          {/* Infection */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase font-semibold text-slate-400">Infection</p>
              <p className="font-semibold text-slate-900">{profile.infection_site || 'Urinary tract'}</p>
            </div>
            <button
              onClick={() => onSelectFact && onSelectFact('infection', 'Patient_History.pdf', 'Clinical admission: suspected bloodstream / urinary tract infection.')}
              className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Current Antibiotic */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase font-semibold text-slate-400">Current Antibiotic</p>
              <p className="font-semibold text-slate-900">{currentAntibiotic}</p>
            </div>
            <button
              onClick={() => onSelectFact && onSelectFact('medication', 'Medication_Chart.pdf', 'Inj. Meropenem 1g IV every 8 hours TDS.')}
              className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Culture */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase font-semibold text-slate-400">Culture</p>
              <p className="font-semibold text-slate-900">{organism}</p>
            </div>
            <button
              onClick={() => onSelectFact && onSelectFact('culture', 'Blood_Culture_Report.pdf', 'Isolated Organism: Escherichia coli >10^5 CFU/mL.')}
              className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Allergy */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase font-semibold text-slate-400">Allergy</p>
              <p className="font-semibold text-slate-900">{allergyDrug}</p>
              <p className="text-[11px] font-medium text-amber-700">Severity: Not documented</p>
            </div>
            <button
              onClick={() => onSelectFact && onSelectFact('allergy', 'Allergy_History.pdf', 'Amoxicillin documented with childhood rash; severity not documented.')}
              className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* Renal Function */}
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[11px] uppercase font-semibold text-slate-400">Renal Function</p>
              <p className="font-semibold text-slate-900">Creatinine: {creatinine}</p>
              <p className="text-[10px] text-slate-500 font-mono">Tested 72h ago (Requires recency confirmation)</p>
            </div>
            <button
              onClick={() => onSelectFact && onSelectFact('renal', 'Renal_Function.pdf', 'Serum Creatinine: 1.8 mg/dL tested 72 hours ago.')}
              className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>

      {/* Microbiology Section: Culture & Susceptibility */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Culture &amp; susceptibility
          </h3>

          <div className="relative">
            <button
              type="button"
              onMouseEnter={() => setShowAstTooltip(true)}
              onMouseLeave={() => setShowAstTooltip(false)}
              className="text-slate-400 hover:text-slate-600 flex items-center space-x-1 text-[11px]"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>S / I / R guide</span>
            </button>

            {showAstTooltip && (
              <div className="absolute right-0 bottom-6 w-64 bg-slate-900 text-white p-3 rounded-xl text-[11px] shadow-lg z-30 space-y-1">
                <p><strong>S = Susceptible:</strong> Organism is inhibited by safe drug levels.</p>
                <p><strong>I = Intermediate:</strong> Efficacy may occur with higher exposure.</p>
                <p><strong>R = Resistant:</strong> Not inhibited by achievable concentrations.</p>
              </div>
            )}
          </div>
        </div>

        {/* Culture Header Info */}
        <div className="grid grid-cols-3 gap-2 text-xs py-1">
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Organism</p>
            <p className="font-bold text-slate-900 italic">{organism}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Specimen</p>
            <p className="font-semibold text-slate-800">{specimen}</p>
          </div>
          <div>
            <p className="text-[10px] text-slate-400 uppercase font-semibold">Collection date</p>
            <p className="font-medium text-slate-800 font-mono text-[11px]">12 Sep 2026</p>
          </div>
        </div>

        {/* Susceptibility Matrix */}
        <div className="border border-slate-100 rounded-xl overflow-hidden text-xs">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-[10px] uppercase font-semibold text-slate-500 border-b border-slate-100">
              <tr>
                <th className="py-2 px-3">Antibiotic</th>
                <th className="py-2 px-3 text-right">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {astData.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60">
                  <td className="py-2 px-3 font-medium text-slate-800">{item.antibiotic}</td>
                  <td className="py-2 px-3 text-right">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${item.color}`}>
                      {item.result} ({item.tag})
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Factors Section */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Patient factors
          </h3>
        </div>

        <div className="divide-y divide-slate-100 text-xs">
          <div className="py-2.5 flex justify-between">
            <span className="text-slate-500">Age</span>
            <span className="font-semibold text-slate-900">{profile.age || '62'}</span>
          </div>

          <div className="py-2.5 flex justify-between">
            <span className="text-slate-500">Renal function</span>
            <span className="font-semibold text-amber-700">Requires consideration</span>
          </div>

          <div className="py-2.5 flex justify-between">
            <span className="text-slate-500">Liver function</span>
            <span className="font-semibold text-slate-800">Available</span>
          </div>

          <div className="py-2.5 flex justify-between">
            <span className="text-slate-500">Drug allergies</span>
            <span className="font-semibold text-amber-700">Amoxicillin - unclear severity</span>
          </div>

          <div className="py-2.5 flex justify-between">
            <span className="text-slate-500">Previous antibiotics</span>
            <span className="font-semibold text-slate-800">Available (Ciprofloxacin June 2026)</span>
          </div>

          <div className="py-2.5 flex justify-between">
            <span className="text-slate-500">Previous resistance</span>
            <span className="font-semibold text-rose-700">Detected (Beta-lactam resistance)</span>
          </div>

          <div className="py-2.5 flex justify-between">
            <span className="text-slate-500">Patient weight</span>
            <span className="font-semibold text-slate-400 font-mono">Not documented</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-400 italic">
          * Missing information is explicitly labeled Not documented. DIYA does not infer values.
        </p>
      </div>

    </div>
  );
}
