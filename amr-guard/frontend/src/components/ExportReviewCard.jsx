import React from 'react';
import { Printer, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ExportReviewCard({ 
  analysisData, 
  onBack,
  language = 'English' 
}) {
  const isHindi = language === 'Hindi';
  const profile = analysisData?.patient_profile || {};
  const patientId = profile.patient_alias || 'PT-1042';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4 text-left">
      
      {/* Top Header & Actions */}
      <div className="flex justify-between items-center no-print border-b border-slate-200 pb-4">
        <div>
          <button
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900"
          >
            ← Back to Clinical Review
          </button>
          <h1 className="text-xl font-bold text-slate-900 mt-1">
            Clinical Decision-Support Report
          </h1>
        </div>

        <button
          onClick={handlePrint}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print / Save PDF</span>
        </button>
      </div>

      {/* Printable Report Document (White Clinical Layout) */}
      <div className="bg-white rounded-2xl border border-slate-300 p-8 sm:p-10 shadow-sm space-y-6 text-slate-900" id="export-card">
        
        {/* Hospital & Report Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center space-x-3 mb-1">
              <img 
                src="/diya-brand-logo.png" 
                alt="Diya Logo" 
                className="h-10 w-auto object-contain" 
              />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 border-l border-slate-300 pl-3">
                Clinical Decision Brief
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-600">
              ANTIMICROBIAL STEWARDSHIP &amp; DECISION SUPPORT BRIEF
            </p>
            <p className="text-[11px] text-slate-400">
              ST. JUDE MEMORIAL HOSPITAL · DIVISION OF INFECTIOUS DISEASES
            </p>
          </div>

          <div className="text-right text-xs font-mono">
            <p className="font-bold text-slate-900">PATIENT ID: {patientId}</p>
            <p className="text-slate-500">TIMESTAMP: 13-Sep-2026 10:47 IST</p>
            <p className="text-emerald-700 font-semibold">STATUS: CLINICIAN REVIEW</p>
          </div>
        </div>

        {/* Patient Demographics & Context Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs">
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Age / Sex</span>
            <p className="font-bold text-slate-900">{profile.age || '62'} yrs / {profile.sex || 'Male'}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Ward / Bed</span>
            <p className="font-bold text-slate-900">{profile.ward || 'Medicine / ICU Bed 08'}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Infection Site</span>
            <p className="font-bold text-slate-900">{profile.infection_site || 'Bloodstream (Bacteremia)'}</p>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">Current Therapy</span>
            <p className="font-bold text-slate-900 font-mono">Meropenem 1g IV TDS</p>
          </div>
        </div>

        {/* Microbiology AST Summary */}
        <div className="space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
            Microbiology &amp; Susceptibility Profile
          </h3>
          <p className="text-slate-700">
            <strong>Isolated Organism:</strong> <span className="italic">Escherichia coli (&gt;10^5 CFU/mL)</span> from Blood Culture (12 Sep 2026).
          </p>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 font-mono text-[11px] space-y-1">
            <p><strong>Susceptible:</strong> Ceftriaxone (MIC &le; 1 mg/L), Meropenem, Ciprofloxacin, Nitrofurantoin, Piperacillin-Tazobactam</p>
            <p className="text-rose-700"><strong>Resistant:</strong> Amoxicillin</p>
          </div>
        </div>

        {/* Suggested Antimicrobial Option */}
        <div className="p-5 rounded-xl border-2 border-emerald-600/40 bg-emerald-50/20 space-y-3 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold uppercase tracking-wider text-emerald-800 text-xs">
              Suggested Antimicrobial Option (For Clinician Review)
            </span>
            <span className="font-mono text-emerald-700 font-bold">TARGETED DE-ESCALATION</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 font-mono">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Drug</span>
              <p className="font-bold text-slate-900 text-sm">Ceftriaxone</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Dose</span>
              <p className="font-bold text-slate-900">1 g</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Route &amp; Freq</span>
              <p className="font-bold text-slate-900">IV Every 24h</p>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 uppercase block">Duration</span>
              <p className="font-bold text-slate-900">7 to 10 days</p>
            </div>
          </div>

          <p className="text-slate-600 text-[11px] leading-relaxed pt-1">
            <strong>Clinical Rationale:</strong> Culture and AST confirm third-generation cephalosporin susceptibility. WHO AWaRe 2024 and ICMR Step 5 recommend de-escalating empiric Meropenem to targeted narrow-spectrum options.
          </p>
        </div>

        {/* Alternative Options */}
        <div className="space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
            Alternative Regimens Considered
          </h3>
          <ul className="list-disc pl-4 space-y-1 text-slate-700">
            <li><strong>Piperacillin-Tazobactam 3.375g IV q6h:</strong> Active in vitro; limited by unnecessary breadth and increased nephrotoxicity risk in acute renal impairment.</li>
            <li><strong>Meropenem 1g IV q8h (Current):</strong> Reserve carbapenem; continuation drives selective resistance pressure when narrower susceptible option is validated.</li>
          </ul>
        </div>

        {/* Safety, Uncertainties & Missing Information */}
        <div className="space-y-2 text-xs">
          <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1 text-amber-800">
            Uncertainties &amp; Missing Information Checklist
          </h3>
          <ul className="list-disc pl-4 space-y-1 text-amber-900">
            <li>Allergy severity: Childhood rash noted for Amoxicillin; anaphylaxis severity is not documented (Unknown != Negative).</li>
            <li>Patient weight: Unavailable in electronic intake; weight-adjusted clearance requires bedside check.</li>
            <li>Renal recency: Serum creatinine 1.8 mg/dL tested 72 hours ago; exceeds hospital 48h recency threshold.</li>
          </ul>
        </div>

        {/* Signatures & Safety Disclaimer */}
        <div className="pt-6 border-t-2 border-slate-900 space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
              <p className="text-slate-500">Reviewing Pharmacist:</p>
              <div className="border-b border-slate-400 w-48" />
              <p className="font-semibold text-slate-800">Dr. Sharma, Clinical Pharmacist</p>
            </div>
            <div className="space-y-6">
              <p className="text-slate-500">Treating Physician Signature:</p>
              <div className="border-b border-slate-400 w-48" />
              <p className="font-semibold text-slate-800">MD / ID Specialist</p>
            </div>
          </div>

          <div className="p-3 bg-slate-100 rounded-lg text-[10px] text-slate-600 leading-relaxed text-center font-medium">
            AI-GENERATED CLINICAL DECISION SUPPORT - CLINICIAN VERIFICATION REQUIRED.
            <br />
            Final antibiotic selection, dose, route and duration must be confirmed by the treating healthcare professional. DIYA does not autonomously prescribe or alter patient medication.
          </div>
        </div>

      </div>
    </div>
  );
}
