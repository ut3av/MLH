import React from 'react';
import { Printer, Shield, Check, AlertCircle } from 'lucide-react';

export default function ExportReviewCard({ analysisData, language = 'English' }) {
  if (!analysisData) return null;

  const { patient_profile, review_flags, missing_information, retrieved_sources, summary_en, summary_hi } = analysisData;
  const isHindi = language === 'Hindi';
  
  const current_abx = patient_profile?.medications?.find(m => m.name === "current_antibiotic")?.value || "Meropenem 1g IV TDS";
  const organism = patient_profile?.cultures?.find(c => c.name === "Organism")?.value || "Escherichia coli";

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="rounded-3xl glass-surface p-8 sm:p-12 border border-white/10 text-left space-y-8 shadow-glass" id="export-card">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="text-base font-semibold tracking-tight text-white font-sans">
              DIYA
            </span>
            <span className="text-xs font-mono text-sage-400 border-l border-white/10 pl-2">
              Clinical Review Brief
            </span>
          </div>
          <p className="text-xs text-sage-400/80 font-light">
            Patient Alias: <strong className="text-white font-mono">{patient_profile?.patient_alias || 'DEMO-001'}</strong> · {patient_profile?.age} yrs · {patient_profile?.sex} · {patient_profile?.infection_site}
          </p>
        </div>

        <button
          onClick={handlePrint}
          className="no-print px-5 py-2.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-forest-950 font-medium text-xs transition-all shadow-[0_0_20px_-5px_rgba(52,211,153,0.4)] flex items-center space-x-2"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Clinical Brief</span>
        </button>
      </div>

      {/* Executive Summary */}
      <div className="p-5 rounded-2xl bg-forest-950/60 border border-white/5 space-y-1.5">
        <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
          Executive Review Summary
        </span>
        <p className="text-xs text-sage-200 leading-relaxed font-light">
          {isHindi && summary_hi ? summary_hi : (summary_en || 'Broad-spectrum Meropenem prescribed with oral Nitrofurantoin documented susceptible. Outdated renal labs (>48h) and unclear penicillin allergy severity require review.')}
        </p>
      </div>

      {/* 2-Column Overview: Therapy & Missing Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
        <div className="rounded-2xl glass-card p-5 border border-white/5 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-sage-400">
            Regimen &amp; Microbiology
          </span>
          <div className="space-y-1 text-sage-300">
            <p><span className="text-sage-400">Current Therapy:</span> <strong className="text-white">{current_abx}</strong></p>
            <p><span className="text-sage-400">Isolated Organism:</span> <strong className="text-white">{organism}</strong></p>
            <p><span className="text-sage-400">Specimen Source:</span> Midstream Urine</p>
          </div>
        </div>

        <div className="rounded-2xl glass-card p-5 border border-white/5 space-y-2">
          <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400">
            Information Gaps Checklist
          </span>
          <ul className="space-y-1 text-amber-200/90 text-xs list-disc pl-4 font-light">
            {missing_information && missing_information.length > 0 ? (
              missing_information.map((m, i) => (
                <li key={i}>{m.reason}</li>
              ))
            ) : (
              <li>Allergy severity not documented (Severity UNKNOWN, not negative)</li>
            )}
          </ul>
        </div>
      </div>

      {/* Review Flags Action Queue */}
      <div className="space-y-4">
        <span className="text-xs font-mono uppercase tracking-widest text-sage-400 block border-b border-white/5 pb-2">
          Prioritized Stewardship Findings
        </span>

        <div className="space-y-3">
          {review_flags?.map((flag, idx) => (
            <div key={idx} className="p-4 rounded-2xl glass-card border border-white/5 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-medium text-white text-sm">
                  {idx + 1}. {flag.title}
                </span>
                <span className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-full border ${
                  flag.priority === 'high' ? 'bg-rose-950/60 text-rose-300 border-rose-500/30' : 'bg-amber-950/60 text-amber-300 border-amber-500/30'
                }`}>
                  {flag.priority}
                </span>
              </div>

              <p className="text-sage-300 font-light">
                {isHindi && flag.rationale_hi ? flag.rationale_hi : flag.rationale}
              </p>

              <div className="p-3 rounded-xl bg-forest-950/80 border border-white/5 text-[11px] space-y-1">
                <p className="text-emerald-300 font-mono">
                  Clinician Question: &ldquo;{isHindi && flag.clinician_question_hi ? flag.clinician_question_hi : flag.clinician_question}&rdquo;
                </p>
                <p className="text-sage-400/80 text-[10px]">
                  Citations: {flag.patient_evidence} · {flag.guideline_evidence}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Statutory Safety Disclaimer */}
      <div className="pt-6 border-t border-white/10 text-center space-y-1 text-[11px] text-sage-400/70 font-light">
        <p className="text-white font-normal">
          DIYA is a clinical decision-support prototype.
        </p>
        <p>
          It identifies information and evidence for professional review; it does not diagnose, prescribe, or change treatment.
        </p>
      </div>
    </div>
  );
}
