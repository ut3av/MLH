import React, { useState } from 'react';
import { 
  ArrowRight, Sparkles, FileText, Check, ShieldCheck, 
  Layers, AlertCircle, Compass, HelpCircle, Activity, ChevronRight 
} from 'lucide-react';

export default function LandingDashboard({ 
  onStartNewReview, 
  onLoadDemoCase, 
  onExploreKaggle, 
  language = 'English' 
}) {
  const isHindi = language === 'Hindi';
  const [activeDocHighlight, setActiveDocHighlight] = useState(null);

  return (
    <div className="space-y-24 py-6 md:py-12 max-w-6xl mx-auto">
      {/* HERO SECTION */}
      <section className="text-center space-y-8 relative">
        {/* Ambient Top Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />

        {/* Small Eyebrow */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full glass-surface border border-emerald-500/20 text-emerald-300 text-[11px] font-medium tracking-widest uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]" />
          <span>Clinical Intelligence</span>
        </div>

        {/* Large Headline */}
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-light tracking-tight text-white leading-[1.08] text-balance">
            Turn fragmented records into a <span className="font-normal text-emerald-100/90 italic">clearer clinical review.</span>
          </h1>
          <p className="text-base sm:text-lg text-sage-300/80 font-light max-w-2xl mx-auto leading-relaxed text-balance">
            {isHindi
              ? "DIYA बिखरी हुई रोगी जानकारी, माइक्रोबायोलॉजी और स्वीकृत दिशानिर्देशों को जोड़कर समीक्षा-योग्य मुद्दों को सामने लाता है।"
              : "DIYA connects patient documents, microbiology results and trusted antimicrobial guidance to surface review-worthy issues for healthcare professionals."}
          </p>
        </div>

        {/* Primary CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onStartNewReview}
            className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-emerald-400 hover:bg-emerald-300 text-forest-950 font-medium text-sm transition-all shadow-[0_0_30px_-5px_rgba(52,211,153,0.5)] hover:shadow-[0_0_40px_-5px_rgba(52,211,153,0.7)] flex items-center justify-center space-x-2 group"
          >
            <span>{isHindi ? "समीक्षा शुरू करें" : "Start a Review"}</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
          </button>

          <button
            onClick={() => onLoadDemoCase('demo1')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full glass-surface hover:bg-white/10 text-white font-medium text-sm transition-all border border-white/10 flex items-center justify-center space-x-2"
          >
            <span>{isHindi ? "डेमो देखें" : "Explore Demo"}</span>
          </button>
        </div>

        {/* Trust Statement */}
        <p className="text-[12px] font-normal tracking-wide text-sage-400/70 pt-1">
          AI-assisted · Evidence-grounded · Human-reviewed
        </p>

        {/* ABSTRACT HERO VISUAL: FRAGMENTED DOCUMENTS CONVERGING */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="relative rounded-3xl glass-surface p-6 sm:p-10 border border-white/10 overflow-hidden shadow-glass">
            {/* Ambient Background Glow inside the container */}
            <div className="absolute inset-0 bg-radial-at-c from-emerald-950/40 via-transparent to-transparent pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 sm:gap-6">
              
              {/* Left Column: Fragmented Documents */}
              <div className="w-full md:w-5/12 space-y-2.5 text-left">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-sage-400/80">
                    Fragmented Records
                  </span>
                  <span className="text-[10px] text-sage-500/80 font-mono">5 Sources</span>
                </div>

                {/* Doc 1 */}
                <div 
                  onMouseEnter={() => setActiveDocHighlight('history')}
                  onMouseLeave={() => setActiveDocHighlight(null)}
                  className={`p-3 rounded-xl transition-all duration-200 border cursor-default flex items-center justify-between ${
                    activeDocHighlight === 'history' 
                      ? 'bg-emerald-950/70 border-emerald-500/40 translate-x-1' 
                      : 'bg-forest-900/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
                    <div>
                      <p className="text-xs font-medium text-white">Patient History</p>
                      <p className="text-[11px] text-sage-400 font-mono">Prior Ciprofloxacin (June 2026)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-sage-400/60">PDF</span>
                </div>

                {/* Doc 2 */}
                <div 
                  onMouseEnter={() => setActiveDocHighlight('meds')}
                  onMouseLeave={() => setActiveDocHighlight(null)}
                  className={`p-3 rounded-xl transition-all duration-200 border cursor-default flex items-center justify-between ${
                    activeDocHighlight === 'meds' 
                      ? 'bg-emerald-950/70 border-emerald-500/40 translate-x-1' 
                      : 'bg-forest-900/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-amber-400/80" />
                    <div>
                      <p className="text-xs font-medium text-white">Medication Chart</p>
                      <p className="text-[11px] text-sage-400 font-mono">Meropenem 1g IV TDS (Active)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-sage-400/60">EMR</span>
                </div>

                {/* Doc 3 */}
                <div 
                  onMouseEnter={() => setActiveDocHighlight('culture')}
                  onMouseLeave={() => setActiveDocHighlight(null)}
                  className={`p-3 rounded-xl transition-all duration-200 border cursor-default flex items-center justify-between ${
                    activeDocHighlight === 'culture' 
                      ? 'bg-emerald-950/70 border-emerald-500/40 translate-x-1' 
                      : 'bg-forest-900/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                    <div>
                      <p className="text-xs font-medium text-white">Microbiology AST Report</p>
                      <p className="text-[11px] text-emerald-300/90 font-mono">E. coli · Nitrofurantoin (Susceptible)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-sage-400/60">LAB</span>
                </div>

                {/* Doc 4 */}
                <div 
                  onMouseEnter={() => setActiveDocHighlight('labs')}
                  onMouseLeave={() => setActiveDocHighlight(null)}
                  className={`p-3 rounded-xl transition-all duration-200 border cursor-default flex items-center justify-between ${
                    activeDocHighlight === 'labs' 
                      ? 'bg-emerald-950/70 border-emerald-500/40 translate-x-1' 
                      : 'bg-forest-900/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-rose-400/80" />
                    <div>
                      <p className="text-xs font-medium text-white">Renal Laboratory Panel</p>
                      <p className="text-[11px] text-rose-300/80 font-mono">Creatinine 1.8 mg/dL (72h Outdated)</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-sage-400/60">EHR</span>
                </div>

                {/* Doc 5 */}
                <div 
                  onMouseEnter={() => setActiveDocHighlight('guidelines')}
                  onMouseLeave={() => setActiveDocHighlight(null)}
                  className={`p-3 rounded-xl transition-all duration-200 border cursor-default flex items-center justify-between ${
                    activeDocHighlight === 'guidelines' 
                      ? 'bg-emerald-950/70 border-emerald-500/40 translate-x-1' 
                      : 'bg-forest-900/50 border-white/5 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-300" />
                    <div>
                      <p className="text-xs font-medium text-white">Antimicrobial Guidance</p>
                      <p className="text-[11px] text-sage-400 font-mono">ICMR Step 5 · WHO AWaRe 2024</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-sage-400/60">RAG</span>
                </div>
              </div>

              {/* Center: Radiant DIYA Core Orb & Converging Lines */}
              <div className="w-full md:w-2/12 flex flex-col items-center justify-center py-4">
                <div className="relative flex items-center justify-center">
                  {/* Glowing Outer Rings */}
                  <div className="w-20 h-20 rounded-full bg-emerald-500/15 animate-ping opacity-40 absolute" />
                  <div className="w-24 h-24 rounded-full border border-emerald-500/20 flex items-center justify-center" />
                  
                  {/* Central Glass Orb */}
                  <div className="absolute w-16 h-16 rounded-full bg-gradient-to-b from-emerald-900 to-forest-950 border border-emerald-400/40 flex flex-col items-center justify-center shadow-[0_0_30px_rgba(52,211,153,0.35)]">
                    <span className="text-xs font-bold text-white tracking-wider">DIYA</span>
                    <span className="text-[8px] text-emerald-300 font-mono uppercase tracking-tight">Core</span>
                  </div>
                </div>
                
                <div className="text-center mt-4">
                  <p className="text-[10px] font-mono tracking-widest text-emerald-400 uppercase">
                    Multimodal Synthesis
                  </p>
                  <p className="text-[10px] text-sage-400/70">
                    Deterministic Checks + RAG
                  </p>
                </div>
              </div>

              {/* Right Column: Structured Evidence-Grounded Review Brief */}
              <div className="w-full md:w-5/12 text-left space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-[11px] font-mono tracking-wider uppercase text-emerald-300/80">
                    Evidence-Grounded Review
                  </span>
                  <span className="text-[10px] bg-emerald-950/80 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                    Human Ready
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-forest-900/80 border border-emerald-500/20 space-y-3 shadow-inner">
                  {/* Output summary */}
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-white">Review Brief: Patient S290</p>
                      <p className="text-[11px] text-sage-400 font-mono">62 F · Complicated Catheter UTI</p>
                    </div>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-500/30">
                      3 Review Flags
                    </span>
                  </div>

                  {/* Flag Snippet 1 */}
                  <div className="p-2.5 rounded-xl bg-forest-950/70 border border-white/5 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-rose-300 font-medium">
                      <span>01 Broad-Spectrum De-escalation</span>
                      <span className="text-[9px] uppercase tracking-wider font-mono">High Priority</span>
                    </div>
                    <p className="text-sage-300 text-[11px] leading-snug">
                      Meropenem IV active while culture documents narrower oral Nitrofurantoin susceptible.
                    </p>
                  </div>

                  {/* Flag Snippet 2 */}
                  <div className="p-2.5 rounded-xl bg-forest-950/70 border border-white/5 text-[11px] space-y-1">
                    <div className="flex items-center justify-between text-amber-300 font-medium">
                      <span>02 Information Gap: Penicillin Allergy</span>
                      <span className="text-[9px] uppercase tracking-wider font-mono">Clarification</span>
                    </div>
                    <p className="text-sage-300 text-[11px] leading-snug">
                      Severity not documented in admission notes. Severity is UNKNOWN (not negative).
                    </p>
                  </div>

                  {/* Interactive Trigger */}
                  <button
                    onClick={() => onLoadDemoCase('demo1')}
                    className="w-full mt-1 py-2 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/90 text-emerald-200 text-xs font-medium border border-emerald-500/30 transition-all flex items-center justify-center space-x-1.5"
                  >
                    <span>Inspect Full Review</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>

            {/* Core Visual Message Subtitle */}
            <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs font-mono text-sage-400/80">
              <span className="text-white">Fragmented Records</span>
              <span className="text-emerald-400">→</span>
              <span className="text-white">DIYA Multimodal Understanding</span>
              <span className="text-emerald-400">→</span>
              <span className="text-white">Structured Context</span>
              <span className="text-emerald-400">→</span>
              <span className="text-emerald-300 font-medium">Evidence-Grounded Review</span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK STATUS & METRICS STRIP */}
      <section className="border-y border-white/5 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest text-sage-400">Clinical Overview</p>
            <h2 className="text-xl sm:text-2xl font-light text-white mt-0.5">
              Good afternoon. Your recent reviews.
            </h2>
          </div>

          <div className="flex items-center space-x-6 sm:space-x-10">
            <div>
              <p className="text-3xl font-light text-white font-mono">12</p>
              <p className="text-xs text-sage-400 mt-0.5">Cases reviewed</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-3xl font-light text-amber-300 font-mono">4</p>
              <p className="text-xs text-sage-400 mt-0.5">Need attention</p>
            </div>
            <div className="h-8 w-px bg-white/10" />
            <div>
              <p className="text-3xl font-light text-emerald-400 font-mono">8</p>
              <p className="text-xs text-sage-400 mt-0.5">Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO CASES SECTION */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-2">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
              Pre-populated Scenarios
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight mt-1">
              Explore Demo Cases
            </h2>
          </div>
          <p className="text-xs text-sage-400/80 max-w-md">
            Prepared clinical benchmarks highlighting culture-guided de-escalation, missing information handling, and conflicting document reconciliation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 01 */}
          <div 
            onClick={() => onLoadDemoCase('demo1')}
            className="rounded-3xl glass-surface p-7 border border-white/8 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-6 shadow-glass hover:translate-y-[-2px]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-light font-mono text-emerald-400/80">01</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-300 bg-emerald-950/80 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  Culture + Guidance
                </span>
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-emerald-200 transition-colors">
                Broad-Spectrum Review
              </h3>
              <p className="text-xs text-sage-300/80 leading-relaxed">
                Demonstrates culture + therapy + evidence. Empiric Meropenem prescribed; culture documents narrower susceptible option (oral Nitrofurantoin). Outdated renal labs require confirmation.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-emerald-300">
              <span>Run Demo</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 02 */}
          <div 
            onClick={() => onLoadDemoCase('demo2')}
            className="rounded-3xl glass-surface p-7 border border-white/8 hover:border-amber-500/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-6 shadow-glass hover:translate-y-[-2px]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-light font-mono text-amber-400/80">02</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-300 bg-amber-950/80 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                  Data Gaps
                </span>
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-amber-200 transition-colors">
                Information Gap
              </h3>
              <p className="text-xs text-sage-300/80 leading-relaxed">
                Demonstrates missing-data awareness. Pip-Taz ongoing for 6 days with no planned duration, unspecified indication, and unknown penicillin allergy severity.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-amber-300">
              <span>Run Demo</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 03 */}
          <div 
            onClick={() => onLoadDemoCase('demo3')}
            className="rounded-3xl glass-surface p-7 border border-white/8 hover:border-rose-500/30 transition-all duration-300 cursor-pointer group flex flex-col justify-between space-y-6 shadow-glass hover:translate-y-[-2px]"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-light font-mono text-rose-400/80">03</span>
                <span className="text-[11px] font-mono uppercase tracking-wider text-rose-300 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-500/20">
                  Cross-Document
                </span>
              </div>
              <h3 className="text-lg font-medium text-white group-hover:text-rose-200 transition-colors">
                Conflicting Records
              </h3>
              <p className="text-xs text-sage-300/80 leading-relaxed">
                Demonstrates cross-document reasoning. Emergency record documents severe anaphylaxis while ward chart states &quot;No Known Allergies&quot;; medication chart disputes surgical note.
              </p>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-medium text-rose-300">
              <span>Run Demo</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </section>

      {/* THREE VALUE PILLARS */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="rounded-3xl glass-surface p-7 border border-white/5 space-y-3">
          <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-xs font-mono text-emerald-300">
            01
          </div>
          <h4 className="text-base font-medium text-white">Understand</h4>
          <p className="text-xs text-sage-300/70 leading-relaxed">
            Multimodal extraction transforms fragmented admission charts, lab reports, and AST tables into a clean, structured patient profile with source citations.
          </p>
        </div>

        <div className="rounded-3xl glass-surface p-7 border border-white/5 space-y-3">
          <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-xs font-mono text-emerald-300">
            02
          </div>
          <h4 className="text-base font-medium text-white">Cross-check</h4>
          <p className="text-xs text-sage-300/70 leading-relaxed">
            Compares patient therapy against trusted antimicrobial stewardship guidelines (WHO AWaRe 2024, ICMR Step 5, Hospital Renal Policies, and local ICU antibiograms).
          </p>
        </div>

        <div className="rounded-3xl glass-surface p-7 border border-white/5 space-y-3">
          <div className="w-8 h-8 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-xs font-mono text-emerald-300">
            03
          </div>
          <h4 className="text-base font-medium text-white">Review</h4>
          <p className="text-xs text-sage-300/70 leading-relaxed">
            Surfaces prioritized clinical flags, identifies missing information, and formulates focused questions for the human clinician without prescribing.
          </p>
        </div>
      </section>

      {/* JUDGE-FRIENDLY TERMINOLOGY TOOLTIP GUIDE */}
      <section className="rounded-3xl glass-surface p-6 sm:p-8 border border-white/5 text-left space-y-4">
        <div className="flex items-center space-x-2 text-sage-400">
          <HelpCircle className="w-4 h-4 text-emerald-400" />
          <span className="text-xs font-mono uppercase tracking-wider">Clinical Terminology for Evaluators</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <p className="font-semibold text-white">AMR · Antimicrobial Resistance</p>
            <p className="text-sage-400/80 leading-relaxed">
              When microorganisms become resistant to medicines that previously worked against them, making infections harder or impossible to treat.
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-white">AST · Susceptibility Testing</p>
            <p className="text-sage-400/80 leading-relaxed">
              A laboratory test measuring whether a specific bacterial isolate is inhibited by different antibiotics at safe clinical dosages.
            </p>
          </div>

          <div className="space-y-1">
            <p className="font-semibold text-white">AMS · Antimicrobial Stewardship</p>
            <p className="text-sage-400/80 leading-relaxed">
              A hospital-wide systematic program to review antibiotic appropriateness, reduce carbapenem overuse, and preserve antibiotic effectiveness.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
