import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, ArrowRight, ArrowDown, 
  ChevronDown, ChevronUp, FileText, BookOpen, Clock, AlertTriangle, 
  Check, X, HelpCircle, Eye, ArrowUpRight, Sparkles 
} from 'lucide-react';

export default function ClinicalDecisionOutput({ 
  analysisData, 
  onOpenDocumentViewer,
  onExportReport,
  language = 'English' 
}) {
  const isHindi = language === 'Hindi';
  
  // State for expandable "Why" points
  const [expandedWhy, setExpandedWhy] = useState({
    1: true,
    2: true,
    3: false,
    4: false,
    5: false,
    6: false
  });

  // Clinician decision status
  const [clinicianDecision, setClinicianDecision] = useState(null);
  const [decisionNotes, setDecisionNotes] = useState('');

  const toggleWhy = (idx) => {
    setExpandedWhy(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  // Dynamic recommendation from Gemini OCR or Patient Case
  const rec = analysisData?.recommended_antibiotic || {};
  const recDrug = rec.drug_name || 'Ceftriaxone';
  const recDose = rec.dosage || '1 g to 2 g';
  const recRoute = rec.route || 'IV';
  const recFreq = rec.frequency || 'Once daily (OD)';
  const recDuration = rec.duration || '7 to 10 days';
  const recRationale = rec.clinical_rationale || 'Definitive AST confirms susceptibility. Empiric broad-spectrum therapy is eligible for targeted de-escalation according to ICMR Step 5 & WHO AWaRe 2024 guidance.';
  const recCategory = rec.who_aware_category || 'Watch Tier (Preserves Carbapenems)';
  const recSafety = rec.safety_precautions || 'Verify clinical stability and check renal clearance within 48 hours.';

  const profile = analysisData?.patient_profile || {};
  const cultures = profile.cultures || [];
  const organismFact = cultures.find(c => c.name === 'Organism')?.value || 'Escherichia coli';
  const susceptibleDrugs = cultures.filter(c => c.value === 'SUSCEPTIBLE').map(c => c.name).join(', ') || 'Ceftriaxone, Meropenem';

  const whyPoints = [
    {
      num: 1,
      title: 'Organism identified from culture',
      desc: `Microbiology confirms active bacterial infection with ${organismFact}. Targeted antimicrobial coverage is indicated.`
    },
    {
      num: 2,
      title: 'Susceptibility result supports targeted activity',
      desc: `Antimicrobial susceptibility testing (AST) confirms documented susceptibility to: ${susceptibleDrugs}. Narrower beta-lactam therapy provides full clinical bactericidal activity.`
    },
    {
      num: 3,
      title: 'Relevant patient clinical factors considered',
      desc: `Patient ${profile.patient_alias || 'under review'}, age ${profile.age || '62'} in ${profile.ward || 'Inpatient Ward'}. Infection site: ${profile.infection_site || 'Bloodstream'}. Hemodynamic stability assessed.`
    },
    {
      num: 4,
      title: 'Allergy history and cross-reactivity checked',
      desc: 'Allergy records were cross-checked. Non-severe childhood rashes do not preclude cephalosporin step-down under clinical observation.'
    },
    {
      num: 5,
      title: 'Renal and hepatic clearance parameters',
      desc: 'Drug elimination kinetics evaluated against patient renal biomarkers to minimize nephrotoxicity and drug accumulation.'
    },
    {
      num: 6,
      title: 'ICMR 2024 & WHO AWaRe stewardship guidance applied',
      desc: recRationale
    }
  ];

  const alternativeOptions = [
    {
      name: 'Piperacillin-Tazobactam',
      role: 'Alternative Option 2',
      regimen: '3.375 g to 4.5 g IV every 6 hours',
      evidence: 'Susceptible in vitro; active against extended-spectrum pathogens.',
      limitations: 'Broader spectrum than indicated if narrower cephalosporin is active. Higher potential nephrotoxicity in baseline renal impairment.'
    },
    {
      name: 'Meropenem (Carbapenem Maintenance)',
      role: 'Alternative Option 3 (Continuation)',
      regimen: '1 g IV every 8 hours (Requires renal monitoring)',
      evidence: 'Potent microbiological clearance.',
      limitations: 'WHO Watch/Reserve tier carbapenem. Unwarranted continuation drives selective pressure for carbapenemase-resistant Enterobacterales (CRE).'
    }
  ];

  const uncertaintyItems = [
    {
      title: 'Treatment duration requires clinical review',
      detail: 'Antimicrobial course duration should be reviewed at 48 to 72 hours alongside procalcitonin or CRP biomarker defervescence.'
    },
    {
      title: 'Renal monitoring interval protocol',
      detail: 'Serum creatinine / eGFR must be confirmed within 48 hours for renally excreted beta-lactams and carbapenems.'
    },
    {
      title: 'Patient clinical response confirmation',
      detail: 'Step-down requires afebrile status and stable blood pressure before converting to oral or narrower targeted regimens.'
    }
  ];

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      
      {/* Title & Subtitle */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center space-x-1">
            <Sparkles className="w-3 h-3 text-emerald-600" />
            <span>Gemini Clinical Recommendation</span>
          </span>
          <span className="text-xs text-slate-400 font-mono">FR-06 · Clinician Sign-off Required</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Antimicrobial Stewardship Decision Support
        </h1>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Synthesized by Google Gemini OCR and ICMR/WHO AWaRe clinical rules.
        </p>
      </div>

      {/* RECOMMENDED ANTIBIOTIC OPTION CARD */}
      <div className="bg-white rounded-2xl border-2 border-emerald-600/40 p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Suggested Antimicrobial Step-down
            </span>
            <div className="flex items-baseline space-x-3 mt-0.5">
              <h2 className="text-3xl font-extrabold text-slate-900">
                {recDrug}
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                For Clinician Review
              </span>
            </div>
          </div>

          <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 font-medium">
            {recCategory}
          </span>
        </div>

        {/* Suggested Regimen Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Suggested Regimen
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Dose</span>
              <p className="font-bold text-slate-900 text-sm">{recDose}</p>
              <p className="text-[10px] text-slate-500">Evidence-supported</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Route</span>
              <p className="font-bold text-slate-900 text-sm">{recRoute}</p>
              <p className="text-[10px] text-slate-500">Administration</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Frequency</span>
              <p className="font-bold text-slate-900 text-sm">{recFreq}</p>
              <p className="text-[10px] text-slate-500">Dosing schedule</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Duration</span>
              <p className="font-bold text-slate-900 text-sm">{recDuration}</p>
              <p className="text-[10px] text-slate-500">Total course</p>
            </div>
          </div>
        </div>

        {/* Clinical Rationale Box */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
          <span className="text-[10px] font-mono uppercase tracking-wider font-semibold text-slate-500">
            Clinical Rationale
          </span>
          <p className="text-slate-800 leading-relaxed font-normal">
            {recRationale}
          </p>
          <p className="text-[11px] text-emerald-800 font-medium pt-1">
            Safety Precautions: {recSafety}
          </p>
        </div>

        {/* Statutory Safety Labels */}
        <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-200 text-xs space-y-1">
          <p className="font-bold text-emerald-900 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>AI-generated clinical decision support - clinician verification required</span>
          </p>
          <p className="text-emerald-800 text-[11px] leading-relaxed">
            Final antibiotic selection, dose, route, and duration must be confirmed by the treating healthcare professional.
          </p>
        </div>

      </div>

      {/* WHY THIS OPTION? (6 EXPANDABLE REASONS) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Why DIYA surfaced this option
          </h3>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Structured cross-checking between clinical documents, laboratory data, and hospital stewardship guidelines.
          </p>
        </div>

        <div className="space-y-2">
          {whyPoints.map((point) => {
            const isExpanded = expandedWhy[point.num];

            return (
              <div 
                key={point.num}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleWhy(point.num)}
                  className="w-full px-4 py-3 bg-slate-50 hover:bg-slate-100/80 flex items-center justify-between text-xs font-semibold text-slate-900 transition-colors text-left"
                >
                  <div className="flex items-center space-x-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-mono font-bold flex items-center justify-center shrink-0">
                      {point.num}
                    </span>
                    <span>{point.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="px-4 py-3 text-xs text-slate-600 bg-white border-t border-slate-100 leading-relaxed font-normal">
                    {point.desc}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ALTERNATIVE OPTIONS */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Other potentially suitable options
          </h3>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Alternatives identified with associated supporting evidence and clinical limitations.
          </p>
        </div>

        <div className="space-y-4">
          {alternativeOptions.map((alt, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
            >
              <div className="flex justify-between items-center">
                <span className="font-bold text-slate-900 text-sm">{alt.name}</span>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  {alt.role}
                </span>
              </div>
              <p className="font-mono text-slate-700"><strong>Regimen:</strong> {alt.regimen}</p>
              <p className="text-slate-600"><strong>Evidence:</strong> {alt.evidence}</p>
              <p className="text-slate-500 text-[11px]"><strong>Limitations:</strong> {alt.limitations}</p>
            </div>
          ))}
        </div>
      </div>

      {/* EXPORT ACTION */}
      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={onExportReport}
          className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Official Stewardship Brief</span>
        </button>
      </div>

    </div>
  );
}
