import React, { useState } from 'react';
import { X, FileText, Check, ArrowRight, ShieldCheck, Eye } from 'lucide-react';

export default function DocumentViewerModal({ 
  isOpen, 
  onClose, 
  initialDocument = 'culture_report.pdf',
  evidenceSnippet = 'Escherichia coli >10^5 CFU/mL. Nitrofurantoin: Susceptible; Meropenem: Susceptible; Ceftriaxone: Resistant.'
}) {
  const [selectedFactKey, setSelectedFactKey] = useState('organism');

  if (!isOpen) return null;

  const facts = [
    { key: 'organism', label: 'Organism', value: 'Escherichia coli', docLine: 'PATHOGEN ISOLATED: Escherichia coli (>10^5 CFU/mL)' },
    { key: 'specimen', label: 'Specimen', value: 'Midstream Urine', docLine: 'SPECIMEN: Urine (Midstream clean catch)' },
    { key: 'active_antibiotic', label: 'Active Therapy', value: 'Meropenem 1g IV TDS', docLine: 'CONCURRENT DRUG: Inj. Meropenem 1 g IV every 8 hours' },
    { key: 'susceptibility', label: 'Susceptibility', value: 'Nitrofurantoin (S), Meropenem (S)', docLine: 'AST PROFILE: Nitrofurantoin [SUSCEPTIBLE], Meropenem [SUSCEPTIBLE], Ceftriaxone [RESISTANT]' },
  ];

  const activeFact = facts.find(f => f.key === selectedFactKey) || facts[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 sm:p-6 transition-all">
      <div className="rounded-3xl glass-surface border border-white/10 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-left">
        
        {/* Top Modal Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-normal text-white">
                Multimodal Document Viewer
              </h2>
              <p className="text-[11px] text-sage-400 font-mono">
                Gemini Vision Extraction · Source Verification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-sage-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Split View Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left: Simulated Clinical Document Preview (7 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 bg-[#040806] border-r border-white/5 space-y-6 overflow-y-auto font-mono text-xs text-sage-300">
            <div className="border-b border-white/10 pb-4 space-y-1">
              <div className="flex justify-between text-[11px] text-sage-500">
                <span>ST. JUDE MEMORIAL HOSPITAL · AMS LAB</span>
                <span>LAB NO: 2026-AST-9021</span>
              </div>
              <p className="text-sm text-white font-bold tracking-tight">
                CLINICAL MICROBIOLOGY &amp; ANTIMICROBIAL SUSCEPTIBILITY REPORT
              </p>
              <p className="text-[10px] text-sage-400">
                Patient: DEMO-001 · Age: 62 · Sex: M · Ward: ICU Bed 08
              </p>
            </div>

            {/* Document Body with Clickable / Highlighted Lines */}
            <div className="space-y-4 text-xs leading-relaxed">
              <div className={`p-3 rounded-xl transition-all border ${
                selectedFactKey === 'specimen' 
                  ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.2)]' 
                  : 'border-transparent text-sage-300 hover:bg-white/5'
              }`}>
                SPECIMEN: Urine (Midstream clean catch)
                <br />
                COLLECTION DATE: 10-Sept-2026 08:30 IST
              </div>

              <div className={`p-3 rounded-xl transition-all border ${
                selectedFactKey === 'organism' 
                  ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.2)]' 
                  : 'border-transparent text-sage-300 hover:bg-white/5'
              }`}>
                PATHOGEN ISOLATED: Escherichia coli (&gt;10^5 CFU/mL)
                <br />
                Gram-negative bacillus identified by MALDI-TOF
              </div>

              <div className={`p-3 rounded-xl transition-all border ${
                selectedFactKey === 'susceptibility' 
                  ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.2)]' 
                  : 'border-transparent text-sage-300 hover:bg-white/5'
              }`}>
                AST PROFILE:
                <br />
                - Nitrofurantoin: SUSCEPTIBLE (MIC &le; 16 mg/L) [WHO Access]
                <br />
                - Meropenem: SUSCEPTIBLE (MIC &le; 0.5 mg/L) [WHO Watch]
                <br />
                - Ceftriaxone: RESISTANT (MIC &ge; 64 mg/L) [ESBL Producer]
              </div>

              <div className={`p-3 rounded-xl transition-all border ${
                selectedFactKey === 'active_antibiotic' 
                  ? 'bg-emerald-950/70 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.2)]' 
                  : 'border-transparent text-sage-300 hover:bg-white/5'
              }`}>
                CONCURRENT THERAPY NOTED:
                <br />
                Inj. Meropenem 1 g IV every 8 hours (Medication chart pg 2)
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 text-[11px] text-sage-500">
              * Click an extracted fact on the right to highlight its exact source text in this document.
            </div>
          </div>

          {/* Right: Extracted Structured Information (5 Cols) */}
          <div className="md:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                  Extracted Information
                </span>
                <p className="text-xs text-sage-400">
                  Select a fact to inspect multimodal ground-truth citation:
                </p>
              </div>

              <div className="space-y-2">
                {facts.map((fact) => {
                  const isSelected = fact.key === selectedFactKey;

                  return (
                    <div
                      key={fact.key}
                      onClick={() => setSelectedFactKey(fact.key)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-400/60 shadow-glass'
                          : 'glass-card border-white/5 hover:border-white/15'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-sage-400">
                          {fact.label}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
                        )}
                      </div>
                      <p className="text-sm font-medium text-white mt-1">
                        {fact.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grounding Confidence Badge */}
            <div className="rounded-2xl glass-card p-4 border border-white/5 space-y-1 text-xs">
              <div className="flex items-center space-x-2 text-emerald-400 font-mono text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Multimodal Grounding · High Confidence</span>
              </div>
              <p className="text-sage-400 text-[11px] leading-relaxed">
                Extracted verbatim from page 1 of culture report. No hallucinated lab values.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
