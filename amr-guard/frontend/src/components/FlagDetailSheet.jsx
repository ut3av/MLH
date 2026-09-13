import React from 'react';
import { X, ArrowUpRight, ShieldCheck, CheckCircle2, HelpCircle, AlertTriangle } from 'lucide-react';

export default function FlagDetailSheet({ 
  flag, 
  isOpen, 
  onClose, 
  onUpdateStatus, 
  language = 'English',
  onOpenDocumentViewer
}) {
  if (!isOpen || !flag) return null;

  const isHindi = language === 'Hindi';
  const rationale = (isHindi && flag.rationale_hi) ? flag.rationale_hi : flag.rationale;
  const question = (isHindi && flag.clinician_question_hi) ? flag.clinician_question_hi : flag.clinician_question;

  const priorityBadge = flag.priority === 'high' 
    ? { label: 'HIGH', class: 'bg-rose-950/80 text-rose-300 border-rose-500/30' }
    : flag.type?.includes('gap') || flag.type?.includes('clarification')
      ? { label: 'ATTENTION', class: 'bg-amber-950/80 text-amber-300 border-amber-500/30' }
      : { label: 'REVIEW', class: 'bg-emerald-950/80 text-emerald-300 border-emerald-500/30' };

  return (
    <>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 transition-opacity"
      />

      {/* Side Sheet Container */}
      <div className="fixed inset-y-0 right-0 w-full max-w-xl z-50 glass-sheet p-6 sm:p-10 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-300 text-left">
        <div className="space-y-8">
          
          {/* Top Bar with Close Button */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-widest text-sage-400">
                Flag Detail &amp; Explainability
              </span>
              <h2 className="text-xl font-light text-white tracking-tight">
                Why did DIYA flag this?
              </h2>
            </div>
            
            <button
              onClick={onClose}
              className="p-2 rounded-full text-sage-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Subheader: Review Required + Title */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2.5">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Review required
              </span>
              <span className={`text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${priorityBadge.class}`}>
                {priorityBadge.label}
              </span>
            </div>
            <h3 className="text-2xl font-normal text-white leading-tight">
              {flag.title}
            </h3>
          </div>

          {/* Section: Why */}
          <div className="space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-sage-400">
              Why
            </h4>
            <p className="text-sm text-sage-200 font-light leading-relaxed">
              {rationale}
            </p>
          </div>

          {/* Section: Patient Evidence */}
          <div className="space-y-2 rounded-2xl glass-surface p-5 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sage-400">
                Patient Evidence
              </span>
              <button
                onClick={() => onOpenDocumentViewer && onOpenDocumentViewer('Culture Report', flag.patient_evidence)}
                className="text-[11px] font-mono text-emerald-400 hover:text-emerald-300 flex items-center space-x-0.5"
              >
                <span>View source</span>
                <ArrowUpRight className="w-3 h-3" />
              </button>
            </div>
            <p className="text-xs font-mono text-sage-300">
              {flag.patient_evidence || 'Document reference available'}
            </p>
          </div>

          {/* Section: Guideline Evidence */}
          <div className="space-y-2 rounded-2xl glass-surface p-5 border border-white/5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-sage-400">
                Guideline Evidence
              </span>
              <span className="text-[10px] font-mono text-emerald-400/80">
                ICMR / WHO AWaRe 2024
              </span>
            </div>
            <p className="text-xs text-sage-300 leading-relaxed">
              {flag.guideline_evidence}
            </p>
          </div>

          {/* Section: Human Review Question */}
          <div className="space-y-2.5 rounded-2xl bg-forest-900/90 border border-emerald-500/20 p-5">
            <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300">
              Human Review Question
            </span>
            <p className="text-sm text-white font-normal leading-relaxed">
              &ldquo;{question}&rdquo;
            </p>
            {flag.recommended_next_step && (
              <p className="text-[11px] text-sage-400/90 pt-1 font-mono">
                Suggested clinical step: {flag.recommended_next_step}
              </p>
            )}
          </div>

          {/* Section: Action Buttons */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between text-xs text-sage-400 font-mono">
              <span>Reviewer Resolution Status</span>
              <span className="capitalize text-emerald-300">{flag.status || 'Open'}</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                onClick={() => onUpdateStatus(flag.id, 'reviewed')}
                className={`py-2.5 px-3 rounded-xl border font-medium transition-all ${
                  flag.status === 'reviewed'
                    ? 'bg-emerald-950 border-emerald-400 text-emerald-300'
                    : 'glass-surface border-white/10 text-sage-300 hover:text-white hover:border-emerald-500/40'
                }`}
              >
                Reviewed
              </button>

              <button
                onClick={() => onUpdateStatus(flag.id, 'needs_info')}
                className={`py-2.5 px-3 rounded-xl border font-medium transition-all ${
                  flag.status === 'needs_info'
                    ? 'bg-amber-950 border-amber-400 text-amber-300'
                    : 'glass-surface border-white/10 text-sage-300 hover:text-white hover:border-amber-500/40'
                }`}
              >
                Needs information
              </button>

              <button
                onClick={() => onUpdateStatus(flag.id, 'escalated')}
                className={`py-2.5 px-3 rounded-xl border font-medium transition-all ${
                  flag.status === 'escalated'
                    ? 'bg-rose-950 border-rose-400 text-rose-300'
                    : 'glass-surface border-white/10 text-sage-300 hover:text-white hover:border-rose-500/40'
                }`}
              >
                Escalate
              </button>
            </div>
          </div>

        </div>

        {/* Absolute Safety Boundary Footer */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-[11px] text-sage-400/80 font-light">
            <strong className="text-white font-medium">DIYA does not make the treatment decision.</strong>
            <br />
            This assistant prepares cross-checked evidence for clinician and pharmacist review.
          </p>
        </div>

      </div>
    </>
  );
}
