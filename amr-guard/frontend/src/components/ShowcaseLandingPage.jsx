import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Play, FileText, CheckCircle2, 
  Activity, ChevronRight, BookOpen, Layers, Users, 
  Clock, Award, Stethoscope, FileCheck
} from 'lucide-react';

export default function ShowcaseLandingPage({ 
  onLaunchPortal, 
  onSelectCase, 
  language = 'English', 
  setLanguage 
}) {
  const [activeTabInCard, setActiveTabInCard] = useState('summary'); // 'summary' | 'evidence' | 'guidelines'
  const isHindi = language === 'Hindi';

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-slate-200 selection:text-slate-900 font-sans antialiased relative overflow-x-hidden">
      
      {/* Soft Ambient Light Gradient Background (Liquid Glassmorphism) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-blue-100/50 via-indigo-50/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-[600px] -left-40 w-[600px] h-[600px] bg-slate-200/40 rounded-full blur-3xl" />
        <div className="absolute top-[800px] -right-40 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-3xl" />
      </div>

      {/* SECTION 1: HERO CONTAINER (Strict Light Theme) */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-16 text-center">
        
        {/* Modern Pill Tag */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs mb-8 text-[11px] font-medium tracking-wide text-slate-600 uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
          <span>{isHindi ? 'रोगाणुरोधी प्रबंधन एवं नैदानिक निर्णय समर्थन' : 'Antimicrobial Stewardship & Clinical Decision Support'}</span>
        </div>

        {/* Master Headline: No logo, only pure modern typography */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-slate-900 leading-[1.08] mb-6 max-w-4xl mx-auto">
          {isHindi ? (
            <>हर एंटीबायोटिक निर्णय <span className="font-semibold text-slate-900">प्रमाणित हाथों में</span></>
          ) : (
            <>Every antibiotic decision in <span className="font-semibold text-slate-900">trusted hands</span></>
          )}
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-600 font-normal leading-relaxed mb-10">
          {isHindi
            ? 'दीया (DIYA) बिखरी हुई प्रयोगशाला रिपोर्टों, रोगाणुरोधी संवेदनशीलता परीक्षणों और राष्ट्रीय दिशानिर्देशों को एक साक्ष्य-आधारित नैदानिक समीक्षा में जोड़ता है। एआई साक्ष्य की जांच करता है। अंतिम निर्णय चिकित्सक लेते हैं।'
            : 'DIYA unifies fragmented blood cultures, antimicrobial susceptibility reports, renal clearance markers, and ICMR stewardship guidelines into an evidence-grounded clinical review. AI cross-checks the evidence. Healthcare professionals make the decision.'}
        </p>

        {/* Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-16">
          <button
            onClick={onLaunchPortal}
            className="w-full sm:w-auto px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs sm:text-sm tracking-wide shadow-sm shadow-slate-900/10 transition-all transform hover:scale-[1.02] cursor-pointer flex items-center justify-center space-x-2"
          >
            <span>Enter Clinical Workspace</span>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </button>

          <button
            onClick={() => onSelectCase && onSelectCase('demo1')}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/90 hover:bg-white text-slate-700 hover:text-slate-900 font-medium text-xs sm:text-sm border border-slate-200/80 shadow-xs backdrop-blur-xl transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            <Activity className="w-4 h-4 text-slate-500" />
            <span>Inspect Case PT-1042</span>
          </button>
        </div>

        {/* SECTION 2: APPLE LIQUID GLASS DUAL SHOWCASE CARDS (Inspired directly by Dribbble video) */}
        <div className="text-left mb-6">
          <h2 className="text-2xl sm:text-3xl font-light text-slate-900 tracking-tight">
            Advanced clinical synthesis for every patient
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-1">
            Real-time cross-referencing between isolated pathogens, organ function, and clinical stewardship protocols.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 text-left">
          
          {/* LEFT CARD: Real-Time Microbial Evidence Dossier (7 Cols) */}
          <div 
            onClick={() => onSelectCase && onSelectCase('demo1')}
            className="lg:col-span-7 rounded-[32px] bg-white/80 backdrop-blur-2xl border border-slate-200/80 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between relative overflow-hidden"
          >
            {/* Subtle background decoration */}
            <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full overflow-hidden opacity-15 pointer-events-none">
              <img 
                src="/images/hero-botanical-blue.jpg" 
                alt="Botanical Accent" 
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-4 relative z-10">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Targeted De-escalation Candidate
                </span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 group-hover:text-emerald-900 transition-colors">
                  Escherichia coli Bacteremia (PT-1042)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-2 max-w-xl">
                  Definitive blood culture confirms Ceftriaxone susceptibility. Empiric broad-spectrum Meropenem 1g IV TDS is eligible for de-escalation to preserve carbapenem longevity.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/60 text-xs space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Culture Result</span>
                  <p className="font-semibold text-slate-900">E. coli &gt;10^5 CFU/mL</p>
                  <p className="text-[11px] text-emerald-700 font-medium">Ceftriaxone: Susceptible</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50/90 border border-slate-200/60 text-xs space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Renal Clearance</span>
                  <p className="font-semibold text-slate-900">CrCl 48 mL/min</p>
                  <p className="text-[11px] text-slate-600">Standard de-escalation dose safe</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 mt-6 relative z-10">
              <span className="text-slate-500 font-normal">ICU Bed 08 - Dr. Sharma</span>
              <span className="inline-flex items-center space-x-1 text-emerald-800 group-hover:translate-x-1 transition-transform">
                <span>Inspect Clinical Dossier</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* RIGHT CARD: Multi-disciplinary Stewardship Team (5 Cols) */}
          <div 
            onClick={onLaunchPortal}
            className="lg:col-span-5 rounded-[32px] bg-gradient-to-br from-slate-50/90 via-white to-blue-50/30 backdrop-blur-2xl border border-slate-200/80 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] hover:border-slate-300 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-semibold bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                Hospital Collaboration
              </span>

              <div>
                <h3 className="text-xl sm:text-2xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                  Stewardship Team Workflow
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-2">
                  Enables hospital pharmacists, infectious disease clinicians, and microbiologists to review and sign off on therapy adjustments in seconds.
                </p>
              </div>

              {/* Team Role Badges */}
              <div className="space-y-2 pt-2">
                <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-xs font-semibold">
                    PS
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-900">Dr. Sharma</p>
                    <p className="text-[10px] text-slate-500">Lead Clinical Pharmacist</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 p-2.5 rounded-xl bg-white border border-slate-200/60 shadow-2xs">
                  <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 text-xs font-semibold">
                    RM
                  </div>
                  <div className="text-xs">
                    <p className="font-semibold text-slate-900">Dr. Mehta</p>
                    <p className="text-[10px] text-slate-500">Infectious Disease Specialist</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 mt-6">
              <span className="text-slate-500 font-normal">Active Inpatient Queue</span>
              <span className="inline-flex items-center space-x-1 text-slate-900 group-hover:translate-x-1 transition-transform">
                <span>Open Reviews</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>

      </section>

      {/* SECTION 3: THE INTERACTIVE EVIDENCE ENGINE (Light Liquid Glassmorphism) */}
      <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="text-center space-y-2 mb-8">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-600 text-[11px] font-mono">
            <span>VERIFIED CLINICAL GROUNDING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            How DIYA cross-checks clinical reality
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto font-normal">
            Every statement generated by DIYA is directly traceable to uploaded hospital records and ICMR national guidelines.
          </p>
        </div>

        {/* Centered Frosted White Liquid Glass Card */}
        <div className="rounded-[32px] bg-white/90 backdrop-blur-2xl border border-slate-200/90 p-6 sm:p-10 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.06)] relative text-left">
          
          {/* Top Pill Navigation Tabs inside the Card */}
          <div className="flex items-center justify-center space-x-2 pb-8 border-b border-slate-100">
            <button
              onClick={() => setActiveTabInCard('summary')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTabInCard === 'summary' 
                  ? 'bg-slate-900 text-white shadow-xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-100'
              }`}
            >
              Diagnostic Brief
            </button>
            <button
              onClick={() => setActiveTabInCard('evidence')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTabInCard === 'evidence' 
                  ? 'bg-slate-900 text-white shadow-xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-100'
              }`}
            >
              Grounding Documents
            </button>
            <button
              onClick={() => setActiveTabInCard('guidelines')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeTabInCard === 'guidelines' 
                  ? 'bg-slate-900 text-white shadow-xs font-semibold' 
                  : 'text-slate-600 hover:text-slate-900 bg-slate-100/80 hover:bg-slate-100'
              }`}
            >
              ICMR Guidelines
            </button>
          </div>

          {/* Card Body Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-8">
            
            {/* Left Image / Thumbnail (4 Cols) */}
            <div className="lg:col-span-4">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs aspect-video lg:aspect-square bg-slate-100">
                <img 
                  src={activeTabInCard === 'guidelines' ? '/images/hero-botanical-pink.jpg' : '/images/culture-thumb.jpg'} 
                  alt="Clinical Focus" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider bg-slate-900/80 px-2 py-0.5 rounded-full">
                    {activeTabInCard === 'summary' ? 'Microbiology Confirmed' : activeTabInCard === 'evidence' ? 'Document Citation' : 'National Standard'}
                  </span>
                  <p className="text-xs font-semibold mt-1">
                    {activeTabInCard === 'summary' ? 'Escherichia coli (>10^5 CFU/mL)' : activeTabInCard === 'evidence' ? 'Blood_Culture_Report.pdf (Page 1)' : 'ICMR AMR Guidelines 2026'}
                  </p>
                </div>
              </div>
            </div>

            {/* Center Content Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {activeTabInCard === 'summary' && (
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                    Targeted De-escalation Brief
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Patient PT-1042 was initiated on empiric broad-spectrum Meropenem 1g IV TDS. Definitive blood culture confirms Ceftriaxone susceptibility, enabling safe carbapenem sparing.
                  </p>
                  <div className="space-y-2 pt-1">
                    <div className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Recommended regimen: Ceftriaxone 2g IV once daily</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Renal consideration: Serum Creatinine 1.8 mg/dL (Requires 48h repeat)</span>
                    </div>
                    <div className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>Allergy flag: Childhood Amoxicillin rash (Low cephalosporin cross-reactivity)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTabInCard === 'evidence' && (
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                    Zero-Hallucination Grounding
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Every finding is linked to an exact PDF bounding box or documented laboratory measurement. Healthcare staff can inspect source pages with a single click.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
                    <p className="text-emerald-800 font-semibold">Source: Blood_Culture_Report.pdf (Page 1)</p>
                    <p className="text-slate-600 italic">"Specimen: Blood. Organism: Escherichia coli. Meropenem: S. Ceftriaxone: S. Amoxicillin: R."</p>
                  </div>
                </div>
              )}

              {activeTabInCard === 'guidelines' && (
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-semibold text-slate-900">
                    ICMR & Sanford Protocol Alignment
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    Recommendations adhere strictly to the Indian Council of Medical Research (ICMR) Antimicrobial Guidelines 2026 for Gram-negative bacteremia.
                  </p>
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 font-mono text-[11px] text-slate-700 space-y-1">
                    <p className="text-emerald-800 font-semibold">ICMR Guideline Section 4.2.1</p>
                    <p className="text-slate-600">"In bloodstream infections with documented cephalosporin susceptibility, de-escalate carbapenems within 48 to 72 hours."</p>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  Documentary Brief
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                  ICMR 2026
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  Verified Grounding
                </span>
              </div>
            </div>

            {/* Right Action Column (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-3 lg:border-l lg:border-slate-100 lg:pl-6">
              <button
                onClick={() => onSelectCase && onSelectCase('demo1')}
                className="w-full py-3 px-4 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all shadow-xs flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Review Case PT-1042</span>
              </button>

              <button
                onClick={onLaunchPortal}
                className="w-full py-3 px-4 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium text-xs border border-slate-200 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-500" />
                <span>View Full Dossier</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: CLINICAL IMPACT METRICS (Light Theme) */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
          
          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs">
            <p className="text-3xl sm:text-4xl font-light text-slate-900 font-mono">99.1%</p>
            <p className="text-xs font-semibold text-slate-800 mt-1">Guideline Concordance</p>
            <p className="text-[11px] text-slate-500 font-normal mt-0.5">ICMR & Sanford protocol alignment</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs">
            <p className="text-3xl sm:text-4xl font-light text-slate-900 font-mono">0.4s</p>
            <p className="text-xs font-semibold text-slate-800 mt-1">Context Synthesis</p>
            <p className="text-[11px] text-slate-500 font-normal mt-0.5">Multi-document evidence extraction</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs">
            <p className="text-3xl sm:text-4xl font-light text-slate-900 font-mono">-72%</p>
            <p className="text-xs font-semibold text-slate-800 mt-1">Turnaround Time</p>
            <p className="text-[11px] text-slate-500 font-normal mt-0.5">Culture report to decision brief</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-xs">
            <p className="text-3xl sm:text-4xl font-light text-slate-900 font-mono">100%</p>
            <p className="text-xs font-semibold text-slate-800 mt-1">Safety Checks</p>
            <p className="text-[11px] text-slate-500 font-normal mt-0.5">Renal clearance & unverified allergies</p>
          </div>

        </div>
      </section>

      {/* SECTION 5: CLINICAL BENCHMARK CASES */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto text-left">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-normal text-slate-900 tracking-tight">
              Interactive Patient Cases
            </h3>
            <p className="text-xs text-slate-500 font-normal">
              Select any clinical case to launch the interactive antimicrobial review workspace.
            </p>
          </div>

          <button
            onClick={onLaunchPortal}
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-medium text-slate-700 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <span>Enter Inpatient Queue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Case 1 */}
          <div 
            onClick={() => onSelectCase && onSelectCase('demo1')}
            className="p-6 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-xl border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700">CASE PT-1042</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-medium">
                  DE-ESCALATION
                </span>
              </div>
              <h4 className="text-base font-semibold text-slate-900 group-hover:text-emerald-900 transition-colors">
                Escherichia coli Bacteremia
              </h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Meropenem broad-spectrum empiric therapy with confirmed Ceftriaxone susceptibility. 48h recency check needed for serum creatinine.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-4 text-xs font-medium">
              <span className="text-slate-500 font-normal">Medicine ICU Bed 08</span>
              <span className="text-slate-900 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span>Review Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Case 2 */}
          <div 
            onClick={() => onSelectCase && onSelectCase('demo2')}
            className="p-6 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-xl border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700">CASE PT-1039</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
                  RENAL ADJUSTMENT
                </span>
              </div>
              <h4 className="text-base font-semibold text-slate-900 group-hover:text-amber-900 transition-colors">
                Complicated Pyelonephritis (UTI)
              </h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Piperacillin/Tazobactam therapy day 6. Missing recent CrCl estimation. High-risk prolonged carbapenem candidate.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-4 text-xs font-medium">
              <span className="text-slate-500 font-normal">Ward 3 (General)</span>
              <span className="text-slate-900 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span>Review Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Case 3 */}
          <div 
            onClick={() => onSelectCase && onSelectCase('demo3')}
            className="p-6 rounded-2xl bg-white/90 hover:bg-white backdrop-blur-xl border border-slate-200/80 hover:border-slate-300 shadow-xs transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-700">CASE PT-1035</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 font-medium">
                  ALLERGY CONFLICT
                </span>
              </div>
              <h4 className="text-base font-semibold text-slate-900 group-hover:text-purple-900 transition-colors">
                Post-Op Surgical Site Infection
              </h4>
              <p className="text-xs text-slate-500 font-normal leading-relaxed">
                Contradictory allergy records: ER admission lists Penicillin anaphylaxis while surgical ward chart states NKDA.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-slate-100 mt-4 text-xs font-medium">
              <span className="text-slate-500 font-normal">Surgical Ward 2</span>
              <span className="text-slate-900 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span>Review Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 py-8 px-4 text-center text-xs text-slate-500 font-normal bg-white/60">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-900">DIYA</span>
            <span>-</span>
            <span>Diagnostic Intelligence &amp; Antibiotic Review Assistant</span>
          </div>
          <div className="text-[11px] text-slate-500">
            Authorized hospital healthcare professionals only. Not an autonomous prescriber.
          </div>
        </div>
      </footer>

    </div>
  );
}
