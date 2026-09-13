import React from 'react';
import { ArrowDown, Check, Shield } from 'lucide-react';

export default function EvidenceChainView({ flag, language = 'English' }) {
  if (!flag) return null;
  const isHindi = language === 'Hindi';

  const displayedRationale = isHindi && flag.rationale_hi ? flag.rationale_hi : flag.rationale;
  const displayedQuestion = isHindi && flag.clinician_question_hi ? flag.clinician_question_hi : flag.clinician_question;

  const steps = [
    {
      num: '01',
      title: 'Patient document',
      content: flag.patient_evidence || 'Medication Chart & Microbiology AST Report',
      sourceTag: 'Clinical Input'
    },
    {
      num: '02',
      title: 'DIYA observation',
      content: displayedRationale,
      sourceTag: 'Multimodal Synthesis'
    },
    {
      num: '03',
      title: 'Guideline evidence',
      content: flag.guideline_evidence || 'ICMR AMS Guidelines Step 5 & WHO AWaRe 2024 Framework',
      sourceTag: 'Trusted RAG Benchmark'
    },
    {
      num: '04',
      title: 'Review question',
      content: `"${displayedQuestion}"`,
      sourceTag: 'For Pharmacist / Clinician'
    },
    {
      num: '05',
      title: 'Human decision',
      content: flag.recommended_next_step || 'Qualified clinician/pharmacist confirms clinical stability and validates regimen.',
      sourceTag: 'Human in the Loop'
    }
  ];

  return (
    <div className="rounded-3xl glass-surface p-7 sm:p-10 border border-white/8 space-y-8 shadow-glass text-left">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
            Signature Component
          </span>
          <h3 className="text-xl sm:text-2xl font-light text-white tracking-tight mt-0.5">
            Evidence Trail · {flag.title}
          </h3>
        </div>
        <span className="text-[11px] font-mono px-3 py-1 rounded-full border border-white/10 text-sage-300">
          5-Stage Audit Chain
        </span>
      </div>

      {/* The Connecting Trail */}
      <div className="relative pl-6 sm:pl-8 space-y-8">
        {/* Thin continuous vertical line */}
        <div className="absolute left-[11px] sm:left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-emerald-400/40 via-white/15 to-emerald-400/40" />

        {steps.map((step, idx) => {
          const isObservation = idx === 1;
          const isQuestion = idx === 3;
          const isDecision = idx === 4;

          return (
            <div key={idx} className="relative group">
              {/* Subtle Glowing Dot */}
              <div className={`absolute -left-6 sm:-left-8 top-1.5 w-3 h-3 rounded-full border transition-all ${
                isDecision 
                  ? 'bg-emerald-400 border-emerald-300 shadow-[0_0_10px_#34d399]'
                  : isQuestion
                    ? 'bg-amber-400 border-amber-300 shadow-[0_0_8px_#fbbf24]'
                    : isObservation
                      ? 'bg-emerald-500/80 border-emerald-400'
                      : 'bg-forest-950 border-white/30'
              }`} />

              {/* Step Card Content */}
              <div className="space-y-1.5">
                <div className="flex items-center space-x-2.5">
                  <span className="text-[10px] font-mono text-sage-400">{step.num}</span>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-sage-300">
                    {step.title}
                  </h4>
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-sage-400 border border-white/5">
                    {step.sourceTag}
                  </span>
                </div>

                <div className={`p-4 rounded-2xl border text-xs leading-relaxed transition-all ${
                  isQuestion 
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-100 font-medium'
                    : isDecision
                      ? 'bg-forest-900/80 border-white/10 text-white font-medium'
                      : 'glass-card border-white/5 text-sage-300'
                }`}>
                  {step.content}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Statement */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-sage-400/70 font-mono">
        <span>Explainability Protocol v1.0</span>
        <span>Transparent &amp; Auditable AI</span>
      </div>
    </div>
  );
}
