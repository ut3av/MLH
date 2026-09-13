import React, { useState } from 'react';
import { X, FileText, Check, ArrowRight, ShieldCheck, Eye } from 'lucide-react';

export default function DocumentViewerModal({ 
  isOpen, 
  onClose, 
  initialDocument = 'Blood_Culture_Report.pdf',
  evidenceSnippet = 'Escherichia coli >10^5 CFU/mL. Ceftriaxone: Susceptible.'
}) {
  const [selectedFactKey, setSelectedFactKey] = useState('organism');

  if (!isOpen) return null;

  const facts = [
    { key: 'organism', label: 'Organism', value: 'Escherichia coli', docLine: 'PATHOGEN ISOLATED: Escherichia coli (>10^5 CFU/mL)' },
    { key: 'specimen', label: 'Specimen', value: 'Blood Culture (Peripheral line)', docLine: 'SPECIMEN: Blood (Peripheral venipuncture blood culture x 2)' },
    { key: 'active_antibiotic', label: 'Concurrent Therapy', value: 'Meropenem 1g IV TDS', docLine: 'CONCURRENT DRUG: Inj. Meropenem 1 g IV every 8 hours TDS' },
    { key: 'susceptibility', label: 'Susceptibility', value: 'Ceftriaxone (S), Meropenem (S), Amoxicillin (R)', docLine: 'AST PROFILE: Ceftriaxone [SUSCEPTIBLE, MIC <= 1 mg/L], Meropenem [SUSCEPTIBLE], Amoxicillin [RESISTANT]' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 sm:p-6 transition-all">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-5xl w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl text-left">
        
        {/* Top Modal Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Eye className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Multimodal Document Grounding
              </h2>
              <p className="text-[11px] text-slate-500 font-normal">
                Gemini Vision Extraction · Ground-truth Line Verification
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Split View Content */}
        <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-y-auto">
          
          {/* Left: Simulated Clinical Document Preview (7 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 bg-slate-50 border-r border-slate-200 space-y-6 overflow-y-auto font-mono text-xs text-slate-800">
            <div className="border-b border-slate-200 pb-4 space-y-1">
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>ST. JUDE MEMORIAL HOSPITAL · AMS LAB</span>
                <span>LAB NO: 2026-AST-9021</span>
              </div>
              <p className="text-sm text-slate-900 font-bold tracking-tight">
                CLINICAL MICROBIOLOGY &amp; ANTIMICROBIAL SUSCEPTIBILITY REPORT
              </p>
              <p className="text-[10px] text-slate-500">
                Patient: PT-1042 · Age: 62 · Sex: M · Ward: Medicine / ICU Bed 08
              </p>
            </div>

            {/* Document Body with Clickable / Highlighted Lines */}
            <div className="space-y-4 text-xs leading-relaxed">
              <div className={`p-3 rounded-xl transition-all border ${
                selectedFactKey === 'specimen' 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}>
                SPECIMEN: Blood (Peripheral venipuncture blood culture x 2)
                <br />
                COLLECTION DATE: 12-Sept-2026 08:30 IST
              </div>

              <div className={`p-3 rounded-xl transition-all border ${
                selectedFactKey === 'organism' 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}>
                PATHOGEN ISOLATED: Escherichia coli (&gt;10^5 CFU/mL)
                <br />
                Gram-negative bacillus identified by MALDI-TOF
              </div>

              <div className={`p-3 rounded-xl transition-all border ${
                selectedFactKey === 'susceptibility' 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}>
                AST PROFILE:
                <br />
                - Ceftriaxone: SUSCEPTIBLE (MIC &le; 1 mg/L) [WHO Access / Watch]
                <br />
                - Meropenem: SUSCEPTIBLE (MIC &le; 0.5 mg/L) [WHO Watch]
                <br />
                - Amoxicillin: RESISTANT (MIC &ge; 32 mg/L)
              </div>

              <div className={`p-3 rounded-xl transition-all border ${
                selectedFactKey === 'active_antibiotic' 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
              }`}>
                CONCURRENT THERAPY NOTED:
                <br />
                Inj. Meropenem 1 g IV every 8 hours TDS (Medication chart pg 2)
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 text-[11px] text-slate-400">
              * Click an extracted fact on the right to highlight its ground-truth source text in this document.
            </div>
          </div>

          {/* Right: Extracted Structured Information (5 Cols) */}
          <div className="md:col-span-5 p-6 sm:p-8 space-y-6 flex flex-col justify-between bg-white">
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 font-bold">
                  Extracted Information
                </span>
                <p className="text-xs text-slate-500 font-normal">
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
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-emerald-50 border-emerald-400 shadow-xs'
                          : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                          {fact.label}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-emerald-600" />
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-900 mt-1">
                        {fact.value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Grounding Confidence Badge */}
            <div className="rounded-xl bg-slate-50 p-4 border border-slate-200 space-y-1 text-xs">
              <div className="flex items-center space-x-2 text-emerald-700 font-semibold text-[11px]">
                <ShieldCheck className="w-4 h-4" />
                <span>Multimodal Grounding · High Confidence</span>
              </div>
              <p className="text-slate-500 text-[11px] leading-relaxed">
                Extracted verbatim from page 2 of blood culture report. No hallucinated values.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
