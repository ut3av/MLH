import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, Play, FileText, CheckCircle2, 
  Activity, ChevronRight, BookOpen, Layers, Users, 
  Clock, Award, Stethoscope, FileCheck, Sparkles, ChevronDown, 
  HelpCircle, Check, Scan, Eye, HeartHandshake, Lock, Zap
} from 'lucide-react';

export default function ShowcaseLandingPage({ 
  onLaunchPortal, 
  onSelectCase, 
  language = 'English', 
  setLanguage 
}) {
  const [openFaq, setOpenFaq] = useState(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const [isHovering, setIsHovering] = useState(false);
  const isHindi = language === 'Hindi';

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isHovering) setIsHovering(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isHovering]);

  const toggleFaq = (idx) => {
    setOpenFaq(prev => prev === idx ? null : idx);
  };

  const faqs = [
    {
      q: "How does DIYA's Gemini OCR read handwritten doctor prescriptions?",
      a: "DIYA leverages Google Gemini 2.5 Flash's multimodal vision engine to scan, segment, and transcribe medical handwriting, trade names, dosage notations (TDS, BD, OD), and microbiological AST reports with high clinical precision."
    },
    {
      q: "How does DIYA determine the correct antibiotic recommendation?",
      a: "DIYA cross-references the isolated organism and susceptibility matrix against ICMR 2024 Antimicrobial Guidelines and WHO AWaRe tiers. If a patient is on broad-spectrum reserve agents (e.g. Meropenem) while narrower first-line agents are susceptible, DIYA surfaces a targeted de-escalation plan tailored to the patient's renal clearance and allergies."
    },
    {
      q: "Can DIYA prescribe medications automatically?",
      a: "No. DIYA is strictly a clinical decision-support assistant. All extracted data, renal warnings, and antibiotic recommendations must be reviewed and signed off by a qualified clinician or hospital pharmacist."
    },
    {
      q: "Is patient health information (PHI) protected?",
      a: "Yes. All prescriptions and audit tracks are encrypted and stored in your dedicated Supabase database with Row Level Security (RLS) and HIPAA-compliant access controls."
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#171717] selection:bg-emerald-100 selection:text-emerald-900 font-sans antialiased relative overflow-x-hidden">
      
      {/* Interactive Cursor Spotlight Glow */}
      <div 
        className="cursor-glow transition-opacity duration-500"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          opacity: isHovering ? 1 : 0
        }}
      />

      {/* Decorative Floating SVG Icons with animated mouse parallax effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        
        {/* Modern Medical Prescription Graphic (Top Right) */}
        <div 
          className="absolute top-20 right-8 lg:right-28 opacity-25 animate-float-slow transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePos.x * 0.015}px, ${mousePos.y * 0.015}px)`
          }}
        >
          <svg width="220" height="260" viewBox="0 0 220 260" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="10" y="10" width="200" height="240" rx="20" fill="white" stroke="#206E55" strokeWidth="1.5" strokeDasharray="4 4" />
            <path d="M40 50H120" stroke="#206E55" strokeWidth="3" strokeLinecap="round"/>
            <path d="M40 70H180" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
            <path d="M40 90H150" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round"/>
            <circle cx="160" cy="180" r="30" fill="#E8F5E9" stroke="#206E55" strokeWidth="1.5" />
            <path d="M150 180H170M160 170V190" stroke="#206E55" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Antimicrobial Capsule & DNA SVG (Left Middle) */}
        <div 
          className="absolute top-96 -left-6 lg:left-12 opacity-20 animate-float-delayed transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${-mousePos.x * 0.02}px, ${-mousePos.y * 0.02}px)`
          }}
        >
          <svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="40" y="30" width="100" height="40" rx="20" transform="rotate(45 40 30)" fill="#206E55" fillOpacity="0.15" stroke="#206E55" strokeWidth="1.5" />
            <circle cx="90" cy="90" r="60" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="6 6" />
            <circle cx="130" cy="50" r="8" fill="#10B981" fillOpacity="0.4" />
            <circle cx="50" cy="130" r="6" fill="#3B82F6" fillOpacity="0.4" />
          </svg>
        </div>

        {/* Micro-dot ambient grid */}
        <svg className="absolute inset-0 w-full h-full opacity-35" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dot-pattern" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1" fill="#206E55" fillOpacity="0.12" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dot-pattern)" />
        </svg>
      </div>

      {/* SECTION 1: HERO CONTAINER (Clean, Minimalist, Animated Interactive Cards) */}
      <section className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        
        {/* Modern Pill Tag with Hover Pulse */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/95 backdrop-blur-xl border border-emerald-900/10 shadow-xs mb-8 text-[11px] font-medium tracking-wide text-emerald-900 uppercase transition-transform hover:scale-105 duration-300 cursor-default">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
          <span>Multimodal Prescription OCR &amp; Antimicrobial Stewardship</span>
        </div>

        {/* Master Headline: Archivo/Geist styled typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-[#002E25] leading-[1.08] mb-6 max-w-4xl mx-auto">
          {isHindi ? (
            <>हर पर्चा पढ़ें। <span className="font-semibold text-emerald-900">सही एंटीबायोटिक चुनें।</span></>
          ) : (
            <>Stop guessing what the doctor wrote. <span className="font-semibold text-emerald-950 block sm:inline">Choose the right antibiotic.</span></>
          )}
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-10">
          DIYA uses Google Gemini 2.5 Flash vision to read doctor prescriptions and AST lab reports, cross-referencing patient organ function against ICMR 2024 and WHO AWaRe guidelines to surface precise antibiotic recommendations.
        </p>

        {/* Primary Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <button
            onClick={onLaunchPortal}
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#1C604D] hover:bg-[#164E3E] text-white font-medium text-sm tracking-wide shadow-lg shadow-emerald-950/15 transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2.5 group"
          >
            <span>Launch Clinical Reader</span>
            <ArrowRight className="w-4 h-4 text-emerald-200 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onLaunchPortal}
            className="w-full sm:w-auto px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 font-medium text-sm border border-slate-200 shadow-xs transition-all transform hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
          >
            <Lock className="w-4 h-4 text-slate-400" />
            <span>Hospital Staff Sign In</span>
          </button>
        </div>

        {/* SECTION 2: THE 3-STEP FLOW CARD WITH HOVER SPOTLIGHT */}
        <div className="rounded-[32px] bg-white/95 backdrop-blur-xl border border-slate-200/80 p-8 sm:p-12 shadow-sm text-left max-w-4xl mx-auto relative overflow-hidden transition-all duration-300 hover:shadow-md">
          <div className="text-center space-y-2 mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-800 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              How DIYA Works
            </span>
            <h2 className="text-2xl sm:text-3xl font-light text-[#002E25] tracking-tight">
              From handwritten script to verified decision support
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-slate-200/60 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/30 hover:shadow-xs group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-900 font-bold font-mono text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-900 transition-colors">
                1. Upload Prescription / AST
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Snap a photo or attach a PDF of the physician's prescription, culture panel, or medication chart.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-slate-200/60 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/30 hover:shadow-xs group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-900 font-bold font-mono text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-900 transition-colors">
                2. Gemini Multimodal OCR
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Gemini 2.5 Flash transcribes handwritten drug names, dosages, isolated organisms, and AST susceptibility.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-6 rounded-2xl bg-[#FAF9F5] border border-slate-200/60 space-y-3 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-600/30 hover:shadow-xs group cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-emerald-100/80 flex items-center justify-center text-emerald-900 font-bold font-mono text-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-900 transition-colors">
                3. Targeted Recommendation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Evaluates kidney markers and allergy history against ICMR &amp; WHO AWaRe to recommend the safest narrow antibiotic.
              </p>
            </div>

          </div>
        </div>

      </section>

      {/* SECTION 3: DEMO CASE COMPARISON (Clean White Background with Tilt & Hover Interaction) */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="border-b border-slate-200 pb-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-[#002E25] tracking-tight">
            Real Clinical Scenarios
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-1">
            Explore how DIYA identifies de-escalation opportunities and prevents adverse renal reactions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Demo 1 */}
          <div 
            onClick={onLaunchPortal}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-emerald-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900">PT-1042</span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold">
                  DE-ESCALATION
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-900 transition-colors">
                E. coli Bacteremia (ICU Bed 08)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Empiric broad Meropenem prescribed. Blood culture AST confirms Ceftriaxone susceptibility. De-escalates to preserve carbapenem longevity.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-emerald-800 mt-4">
              <span className="font-semibold">Sign in to inspect</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Demo 2 */}
          <div 
            onClick={onLaunchPortal}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-amber-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900">PT-1039</span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-semibold">
                  RENAL GAPS
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-amber-900 transition-colors">
                Complicated Pyelonephritis (UTI)
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                Piperacillin/Tazobactam day 6. Missing recent serum creatinine estimation. Surfaces timeout flag to prevent acute kidney injury.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-amber-800 mt-4">
              <span className="font-semibold">Sign in to inspect</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

          {/* Demo 3 */}
          <div 
            onClick={onLaunchPortal}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-purple-600 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-slate-900">PT-1035</span>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 font-semibold">
                  ALLERGY CONFLICT
                </span>
              </div>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-purple-900 transition-colors">
                Post-Op Surgical Site Infection
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                ER intake states Penicillin anaphylaxis while ward chart says NKDA. Reconciles allergy severity before beta-lactam avoidance.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-purple-800 mt-4">
              <span className="font-semibold">Sign in to inspect</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 4: FREQUENTLY ASKED QUESTIONS (Accordion style like meetaugust.ai) */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-left">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-light text-[#002E25] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-xs text-slate-500 font-normal mt-1">
            Common questions about prescription reading, antimicrobial guidelines, and security.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-6 text-left flex items-center justify-between cursor-pointer hover:bg-slate-50/50 transition-colors"
                >
                  <span className="text-base font-medium text-slate-900 pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-[#1C604D] text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 5: MINIMALIST CALL TO ACTION (Inspired by August AI Green Gradient Banner) */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="rounded-[36px] bg-gradient-to-b from-[#206E55] to-[#164E3E] text-white p-10 sm:p-16 text-center space-y-6 shadow-xl relative overflow-hidden group">
          <div className="max-w-2xl mx-auto space-y-4 relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-white leading-tight">
              Stop guessing what the doctor wrote
            </h2>
            <p className="text-sm sm:text-base text-emerald-100 font-light max-w-xl mx-auto">
              Scan prescriptions with Gemini OCR, verify pathogen susceptibility, and safeguard patients with evidence-grounded antibiotic choices.
            </p>
          </div>

          <div className="pt-2 relative z-10">
            <button
              onClick={onLaunchPortal}
              className="px-9 py-4 rounded-full bg-white text-[#1C604D] font-semibold text-sm hover:bg-emerald-50 transition-all transform hover:scale-105 active:scale-95 shadow-md cursor-pointer inline-flex items-center space-x-2"
            >
              <span>Launch Clinical Reader</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 6: CLEAN & MINIMALIST FOOTER (Exactly matching August AI footer aesthetic) */}
      <footer className="bg-[#1C1917] text-white py-16 px-4 sm:px-6 lg:px-8 text-left">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                PLATFORM
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">Prescription Reader</button></li>
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">Antimicrobial Stewardship</button></li>
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">AST Antibiogram Parser</button></li>
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">Patient Tracking</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                GUIDELINES
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><a href="https://main.icmr.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ICMR 2024 Guidelines</a></li>
                <li><a href="https://www.who.int/publications/i/item/2024-aware-classification" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">WHO AWaRe 2024</a></li>
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">Carbapenem Sparing</button></li>
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">De-escalation Protocols</button></li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                SECURITY &amp; DB
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><span className="text-slate-300">Supabase PostgreSQL</span></li>
                <li><span className="text-slate-300">Row Level Security</span></li>
                <li><span className="text-slate-300">Google Gemini 2.5 Flash</span></li>
                <li><span className="text-slate-300">Audit Trail Logging</span></li>
              </ul>
            </div>

            <div className="space-y-3">
              <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400 font-semibold">
                HOSPITAL ACCESS
              </p>
              <ul className="space-y-2 text-xs text-slate-300">
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">Staff Login</button></li>
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">Doctor Portal</button></li>
                <li><button onClick={onLaunchPortal} className="hover:text-white transition-colors cursor-pointer">Pharmacist Console</button></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <div className="flex items-center space-x-3">
              <img 
                src="/diya-brand-logo.png" 
                alt="Diya Logo" 
                className="h-7 w-auto object-contain brightness-0 invert opacity-85" 
              />
              <span>·</span>
              <span>Diagnostic Intelligence &amp; Antibiotic Review Assistant</span>
            </div>
            <div>
              © 2026 DIYA Health AMS. Clinical Decision Support System.
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
