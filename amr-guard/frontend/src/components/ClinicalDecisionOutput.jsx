import React, { useState } from 'react';
import { 
  ShieldCheck, AlertCircle, CheckCircle2, ArrowRight, ArrowDown, 
  ChevronDown, ChevronUp, FileText, BookOpen, Clock, AlertTriangle, 
  Check, X, HelpCircle, Eye, ArrowUpRight 
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

  const whyPoints = [
    {
      num: 1,
      title: 'Organism identified from culture',
      desc: 'Blood culture isolated Escherichia coli with significant colony counts (>10^5 CFU/mL), confirming active bacterial infection requiring targeted therapy.'
    },
    {
      num: 2,
      title: 'Susceptibility result supports activity',
      desc: 'Antimicrobial susceptibility testing (AST) confirms documented susceptibility to third-generation cephalosporins (Ceftriaxone MIC <= 1 mg/L), carbapenems, and nitrofurantoin.'
    },
    {
      num: 3,
      title: 'Relevant patient factors considered',
      desc: 'Patient is a 62-year-old male in the medicine ward with stable hemodynamic markers but documented baseline renal impairment (eGFR 38 mL/min).'
    },
    {
      num: 4,
      title: 'Allergy information checked',
      desc: 'Reported childhood rash to Amoxicillin. IgE anaphylaxis is not documented. Cross-reactivity risk with 3rd generation cephalosporin is low (<1%), but close observation is indicated.'
    },
    {
      num: 5,
      title: 'Renal and hepatic information considered',
      desc: 'Ceftriaxone undergoes dual biliary and renal excretion; standard non-dose-adjusted regimen is clinically viable in moderate renal dysfunction (unlike Meropenem which accumulates).'
    },
    {
      num: 6,
      title: 'Relevant antimicrobial guidance retrieved',
      desc: 'WHO AWaRe 2024 and ICMR AMS Step 5 guidelines recommend de-escalating from broad-spectrum carbapenems (Meropenem) to narrower targeted Access/Watch beta-lactams once microbiology is finalized.'
    }
  ];

  const alternativeOptions = [
    {
      name: 'Piperacillin-Tazobactam',
      role: 'Alternative Option 2',
      regimen: '3.375 g IV every 6 hours (renally adjusted)',
      evidence: 'Susceptible in vitro; provides antipseudomonal and anaerobic coverage.',
      limitations: 'Excessively broad spectrum for confirmed uncomplicated E. coli bacteremia; higher nephrotoxicity risk when combined with baseline creatinine 1.8 mg/dL.'
    },
    {
      name: 'Meropenem (Current Regimen)',
      role: 'Alternative Option 3 (Continuation)',
      regimen: '1 g IV every 8 hours (requires renal confirmation)',
      evidence: 'Highly effective in vitro with proven microbiological clearance.',
      limitations: 'WHO Watch/Reserve tier carbapenem. Unwarranted continuation drives selective pressure for carbapenemase-resistant Enterobacterales (CRE).'
    }
  ];

  const uncertaintyItems = [
    {
      title: 'Allergy severity is not documented',
      detail: 'Childhood rash reported for Amoxicillin without timing or anaphylaxis documentation. DIYA has not assumed absence of allergy.'
    },
    {
      title: 'Patient weight was not available',
      detail: 'Weight is absent from clinical intake. Exact mg/kg clearance cannot be verified without clinical bedside measurement.'
    },
    {
      title: 'Renal-function result may require confirmation',
      detail: 'Serum creatinine of 1.8 mg/dL was tested 72 hours ago, exceeding the hospital 48-hour recency protocol for active antibiotic review.'
    },
    {
      title: 'Treatment indication was not explicitly documented',
      detail: 'Suspected bloodstream infection vs complicated urinary tract source requires formal treating team confirmation.'
    }
  ];

  return (
    <div className="space-y-8 text-left max-w-4xl mx-auto">
      
      {/* Title & Subtitle */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Decision Support Output
          </span>
          <span className="text-xs text-slate-400 font-mono">FR-06 · Clinician Verification Required</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          DIYA Clinical Review
        </h1>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Decision-support summary prepared for professional review.
        </p>
      </div>

      {/* RECOMMENDED ANTIBIOTIC OPTION CARD */}
      <div className="bg-white rounded-2xl border-2 border-emerald-600/30 p-6 sm:p-8 shadow-xs space-y-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 pb-4">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
              Suggested antimicrobial option
            </span>
            <div className="flex items-baseline space-x-3 mt-0.5">
              <h2 className="text-3xl font-extrabold text-slate-900">
                Ceftriaxone
              </h2>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                For clinician review
              </span>
            </div>
          </div>

          <span className="text-xs font-mono text-slate-400">
            Targeted De-escalation Option
          </span>
        </div>

        {/* Suggested Regimen Grid */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Suggested regimen
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Dose</span>
              <p className="font-bold text-slate-900 text-sm">1 g</p>
              <p className="text-[10px] text-slate-500">Guideline-supported dose</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Route</span>
              <p className="font-bold text-slate-900 text-sm">IV</p>
              <p className="text-[10px] text-slate-500">Intravenous infusion</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Frequency</span>
              <p className="font-bold text-slate-900 text-sm">Every 24 hours</p>
              <p className="text-[10px] text-slate-500">Once daily (OD)</p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-0.5">
              <span className="text-[10px] uppercase font-semibold text-slate-400">Duration</span>
              <p className="font-bold text-slate-900 text-sm">7 to 10 days</p>
              <p className="text-[10px] text-slate-500">Context dependent</p>
            </div>
          </div>
        </div>

        {/* Statutory Safety Labels */}
        <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-200 text-xs space-y-1">
          <p className="font-bold text-emerald-900 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>AI-generated clinical decision support - clinician verification required</span>
          </p>
          <p className="text-emerald-800 text-[11px] leading-relaxed">
            Final antibiotic selection, dose, route and duration must be confirmed by the treating healthcare professional.
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
          {alternativeOptions.map((opt, i) => (
            <div key={i} className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-slate-400 block">{opt.role}</span>
                  <h4 className="font-bold text-slate-900 text-sm">{opt.name}</h4>
                  <p className="font-mono text-slate-600 text-[11px] mt-0.5">{opt.regimen}</p>
                </div>
              </div>

              <p className="text-slate-600">
                <strong>Supporting Evidence:</strong> {opt.evidence}
              </p>
              <p className="text-amber-800 bg-amber-50 p-2 rounded-lg border border-amber-200/60">
                <strong>Important Limitation:</strong> {opt.limitations}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DOSE SAFETY CHECK */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-3">
        <div className="flex items-center space-x-2 text-amber-700">
          <AlertTriangle className="w-4 h-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider">
            Dose safety verification
          </h3>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed">
          Before calculating or confirming final doses, DIYA checks age, patient weight, renal function, hepatic indicators, route, indication, allergy, and contraindications.
        </p>

        <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-semibold">
            Dose cannot be fully assessed without bedside weight confirmation:
          </p>
          <ul className="list-disc pl-4 text-[11px] text-amber-800 space-y-0.5">
            <li>Missing: Patient weight (required for mg/kg dosing verification)</li>
            <li>Verification required: Current serum creatinine recency (last tested 72h ago)</li>
          </ul>
        </div>
      </div>

      {/* EVIDENCE SUPPORTING THIS REVIEW */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Evidence supporting this review
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          {/* Patient Evidence */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase flex items-center space-x-1">
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>Patient evidence</span>
              </span>
              <button
                onClick={() => onOpenDocumentViewer && onOpenDocumentViewer('Blood_Culture_Report.pdf', 'E. coli isolated from blood culture. Ceftriaxone: Susceptible.')}
                className="text-[11px] font-medium text-emerald-700 hover:text-emerald-800 flex items-center space-x-0.5"
              >
                <span>View source</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <p className="font-semibold text-slate-800 font-mono text-[11px]">
              Blood_Culture_Report.pdf · Page 2
            </p>
            <p className="text-slate-600 italic leading-relaxed">
              &ldquo;Escherichia coli isolated from blood culture. Organism is susceptible to Ceftriaxone (MIC &le; 1 mg/L), Meropenem, and Ciprofloxacin.&rdquo;
            </p>
          </div>

          {/* Clinical Guidance */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase flex items-center space-x-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-500" />
                <span>Clinical guidance</span>
              </span>
              <span className="text-[10px] font-mono text-emerald-700">Verified</span>
            </div>
            <p className="font-semibold text-slate-800 font-mono text-[11px]">
              ICMR AMS Guidelines 2024 · Section 5 (De-escalation)
            </p>
            <p className="text-slate-600 italic leading-relaxed">
              &ldquo;De-escalate empiric broad-spectrum carbapenem therapy to targeted narrow-spectrum agents (such as 3rd gen cephalosporins) within 48-72h once definitive susceptibility is documented.&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* SIGNATURE EVIDENCE TRAIL COMPONENT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 block">
            Signature Component
          </span>
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mt-0.5">
            Evidence Trail
          </h3>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Step-by-step reasoning chain connecting patient records to clinical guidance.
          </p>
        </div>

        <div className="space-y-2 text-xs font-medium">
          {[
            { step: 'PATIENT DATA', desc: 'Blood culture report, medication chart, intake summary uploaded.' },
            { step: 'CULTURE RESULT', desc: 'Escherichia coli isolated (>10^5 CFU/mL).' },
            { step: 'SUSCEPTIBILITY', desc: 'Ceftriaxone Susceptible, Meropenem Susceptible, Amoxicillin Resistant.' },
            { step: 'PATIENT FACTORS', desc: 'Age 62, Creatinine 1.8 mg/dL (requires recency check), Unclear allergy severity.' },
            { step: 'CLINICAL GUIDANCE', desc: 'WHO AWaRe 2024 & ICMR Step 5 de-escalation protocols retrieved.' },
            { step: 'DIYA ANALYSIS', desc: 'Determined targeted cephalosporin is clinically suitable; flagged carbapenem de-escalation.' },
            { step: 'SUGGESTED OPTION', desc: 'Ceftriaxone 1g IV every 24 hours surfaced for clinician review.' },
            { step: 'CLINICIAN REVIEW', desc: 'Qualified hospital clinician/pharmacist validates and decides final therapy.' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-start space-x-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100">
              <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <div>
                <span className="text-[11px] font-mono font-bold text-slate-900 uppercase">{item.step}: </span>
                <span className="text-slate-600 font-normal">{item.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WHAT DIYA IS UNCERTAIN ABOUT */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            What DIYA is uncertain about
          </h3>
          <span className="text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
            Safety &amp; Missing Data Guardrails
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {uncertaintyItems.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-amber-50/40 border border-amber-200/80 space-y-1">
              <p className="font-semibold text-amber-900">
                Caution: {item.title}
              </p>
              <p className="text-[11px] text-amber-800/90 leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* CLINICIAN DECISION ACTIONS */}
      <div className="bg-white rounded-2xl border-2 border-slate-200 p-6 sm:p-8 shadow-xs space-y-5">
        <div className="border-b border-slate-100 pb-3">
          <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold block">
            Human in the loop
          </span>
          <h3 className="text-base font-bold text-slate-900">
            Clinical review
          </h3>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            DIYA suggestions require verified decision recording by authorized hospital staff.
          </p>
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <button
            type="button"
            onClick={() => setClinicianDecision('accepted')}
            className={`py-2.5 px-3 rounded-xl border font-semibold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              clinicianDecision === 'accepted'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border-slate-200 hover:border-emerald-300'
            }`}
          >
            <Check className="w-3.5 h-3.5" />
            <span>Accept for consideration</span>
          </button>

          <button
            type="button"
            onClick={() => setClinicianDecision('modify')}
            className={`py-2.5 px-3 rounded-xl border font-semibold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              clinicianDecision === 'modify'
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-white hover:bg-indigo-50 text-slate-700 hover:text-indigo-800 border-slate-200 hover:border-indigo-300'
            }`}
          >
            <span>Modify</span>
          </button>

          <button
            type="button"
            onClick={() => setClinicianDecision('reject')}
            className={`py-2.5 px-3 rounded-xl border font-semibold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              clinicianDecision === 'reject'
                ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                : 'bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-800 border-slate-200 hover:border-rose-300'
            }`}
          >
            <X className="w-3.5 h-3.5" />
            <span>Reject</span>
          </button>

          <button
            type="button"
            onClick={() => setClinicianDecision('request_info')}
            className={`py-2.5 px-3 rounded-xl border font-semibold transition-all flex items-center justify-center space-x-1.5 cursor-pointer ${
              clinicianDecision === 'request_info'
                ? 'bg-amber-600 text-white border-amber-600 shadow-xs'
                : 'bg-white hover:bg-amber-50 text-slate-700 hover:text-amber-800 border-slate-200 hover:border-amber-300'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Request more info</span>
          </button>
        </div>

        {/* Feedback confirmation banner */}
        {clinicianDecision && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
            <span className="text-slate-700 font-medium">
              Review decision recorded: <strong className="capitalize text-slate-900">{clinicianDecision.replace('_', ' ')}</strong>
            </span>
            <span className="text-[11px] text-slate-400 font-mono">Logged to audit trail</span>
          </div>
        )}
      </div>

      {/* REVIEW HISTORY / AUDIT TIMELINE */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="border-b border-slate-100 pb-2 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
            Review timeline
          </h3>
          <span className="text-[11px] text-slate-400 font-mono">Audit Log</span>
        </div>

        <div className="space-y-3 text-xs">
          {[
            { time: '10:42', event: 'Documents uploaded (Blood_Culture_Report.pdf, Patient_History.pdf, Renal_Function.pdf)' },
            { time: '10:43', event: 'DIYA analysis completed via multimodal extraction' },
            { time: '10:43', event: 'Clinical review generated with suggested option (Ceftriaxone 1g IV)' },
            { time: '10:45', event: 'Pharmacist reviewed recommendation and verified susceptibility' },
            { time: '10:47', event: 'Escalated to treating physician for bedside verification' }
          ].map((item, idx) => (
            <div key={idx} className="flex items-center space-x-3 text-slate-600">
              <span className="font-mono text-[11px] font-bold text-slate-900 w-12">{item.time}</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
              <span>{item.event}</span>
            </div>
          ))}
        </div>
      </div>

      {/* EXPORT ACTION */}
      <div className="pt-2 flex justify-end">
        <button
          type="button"
          onClick={onExportReport}
          className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors flex items-center space-x-2 cursor-pointer"
        >
          <FileText className="w-4 h-4" />
          <span>Export Clinical Review</span>
        </button>
      </div>

    </div>
  );
}
