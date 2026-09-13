import React from 'react';
import { AlertCircle, GitCompare, HelpCircle } from 'lucide-react';

export function InformationGapCard({ 
  field = 'Allergy severity', 
  details = 'Reaction is documented as childhood rash, but IgE anaphylaxis severity is unrecorded.',
  customNotice = 'DIYA has not assumed "no allergy". Human verification required.'
}) {
  return (
    <div className="rounded-3xl glass-surface p-7 sm:p-8 border border-amber-500/30 text-left relative overflow-hidden shadow-glass space-y-4">
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center space-x-2 text-amber-400">
          <AlertCircle className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest font-medium">
            Information Gap
          </span>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-950/80 text-amber-300 border border-amber-500/30">
          Unknown &ne; Negative
        </span>
      </div>

      <div className="space-y-1">
        <h4 className="text-xl font-light text-white">
          {field}
        </h4>
        <p className="text-sm text-amber-200/90 font-mono">
          Not documented
        </p>
      </div>

      <p className="text-xs text-sage-300/80 leading-relaxed font-light">
        {details}
      </p>

      <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-xs text-amber-300 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <span>{customNotice}</span>
      </div>
    </div>
  );
}

export function DocumentConflictCard({
  docA = { name: 'Medication chart (pg 2)', value: 'Meropenem 1g IV TDS' },
  docB = { name: 'Surgical progress note (pg 1)', value: 'Piperacillin/Tazobactam 4.5g IV TDS' },
  customNotice = 'DIYA will not decide which is correct. Human verification required.'
}) {
  return (
    <div className="rounded-3xl glass-surface p-7 sm:p-8 border border-rose-500/30 text-left relative overflow-hidden shadow-glass space-y-5">
      <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center space-x-2 text-rose-400">
          <GitCompare className="w-4 h-4" />
          <span className="text-xs font-mono uppercase tracking-widest font-medium">
            Document Conflict
          </span>
        </div>
        <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-rose-950/80 text-rose-300 border border-rose-500/30">
          Discrepancy Detected
        </span>
      </div>

      {/* Versus Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <div className="p-4 rounded-2xl bg-forest-950/70 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-sage-400">
            {docA.name}
          </span>
          <p className="text-sm font-medium text-white">
            {docA.value}
          </p>
        </div>

        <div className="p-4 rounded-2xl bg-forest-950/70 border border-white/5 space-y-1">
          <span className="text-[10px] font-mono uppercase tracking-wider text-sage-400">
            {docB.name}
          </span>
          <p className="text-sm font-medium text-white">
            {docB.value}
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-white/5 flex items-center space-x-2 text-xs text-rose-300 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
        <span>{customNotice}</span>
      </div>
    </div>
  );
}
