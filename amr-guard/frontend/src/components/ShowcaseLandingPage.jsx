import React, { useState } from 'react';
import { 
  ArrowRight, ShieldCheck, Play, FileText, CheckCircle2, 
  ExternalLink, Activity, ChevronRight, Sparkles, BookOpen, 
  Layers, Users, Lock, ChevronLeft
} from 'lucide-react';

export default function ShowcaseLandingPage({ 
  onLaunchPortal, 
  onSelectCase, 
  language = 'English', 
  setLanguage 
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeTabInCard, setActiveTabInCard] = useState('summary'); // 'summary' | 'evidence' | 'guidelines'
  const isHindi = language === 'Hindi';

  const slides = [
    {
      id: 0,
      bgImage: '/images/hero-botanical-blue.jpg',
      headlinePrefix: isHindi ? 'हर एंटीबायोटिक निर्णय' : 'Every antibiotic decision in',
      headlineSuffix: isHindi ? 'प्रमाणित हाथों में' : 'trusted hands',
      subtext: isHindi
        ? 'दीया (DIYA) बिखरी हुई रोगी रिपोर्टों, संवेदनशीलता परीक्षणों और राष्ट्रीय दिशानिर्देशों को एक साक्ष्य-आधारित समीक्षा संक्षिप्त में जोड़ता है।'
        : 'DIYA unifies fragmented blood cultures, antimicrobial susceptibility reports, and renal markers into an evidence-grounded clinical review. AI cross-checks the evidence. Clinicians make the decision.',
      tag: 'CLINICAL DECISION SUPPORT'
    },
    {
      id: 1,
      bgImage: '/images/hero-botanical-pink.jpg',
      headlinePrefix: isHindi ? 'खंडित रिकॉर्ड से' : 'From fragmented records to',
      headlineSuffix: isHindi ? 'साक्ष्य-आधारित समीक्षा' : 'evidence-grounded review',
      subtext: isHindi
        ? 'संस्कृति परिणाम, एलर्जी इतिहास और अंग कार्यप्रणाली को सीधे आईसीएमआर रोगाणुरोधी दिशानिर्देशों से सत्यापित करें।'
        : 'Directly cross-reference blood culture isolates (>10^5 CFU/mL E. coli) with Ceftriaxone susceptibility, creatinine clearance, and national antimicrobial stewardship protocols.',
      tag: 'HOSPITAL STEWARDSHIP WORKFLOW'
    }
  ];

  const currentSlide = slides[activeSlide];

  return (
    <div className="min-h-screen bg-slate-950 text-white selection:bg-emerald-500 selection:text-white font-sans antialiased relative overflow-x-hidden">
      
      {/* SECTION 1: HERO CONTAINER WITH CINEMATIC BOTANICAL BACKGROUND */}
      <section className="relative min-h-[92vh] flex flex-col justify-between p-4 sm:p-6 lg:p-8">
        
        {/* Background Image Layer with Atmospheric Overlays */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src={currentSlide.bgImage} 
            alt="Medical Botanical Backdrop" 
            className="w-full h-full object-cover object-center transition-all duration-1000 transform scale-105"
          />
          {/* Subtle vignette and gradient for extreme text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/70" />
          <div className="absolute inset-0 bg-radial from-transparent via-slate-950/20 to-slate-950/80" />
        </div>

        {/* TOP TRANSLUCENT FLOATING NAVIGATION (Exact Dribbble Style) */}
        <header className="relative z-20 max-w-7xl mx-auto w-full pt-2">
          <div className="flex items-center justify-between">
            
            {/* Brand Logo with Glowing Medical Sparkle */}
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-lg shadow-emerald-500/10">
                <img 
                  src="/images/clinical-squircle.jpg" 
                  alt="DIYA Icon" 
                  className="w-8 h-8 rounded-xl object-cover"
                />
              </div>
              <div className="text-left">
                <div className="text-xl font-bold tracking-tight text-white flex items-center space-x-2">
                  <span>DIYA</span>
                  <span className="text-[10px] uppercase font-mono tracking-widest px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    Clinical AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-300/80 font-normal">
                  Hospital Antimicrobial Stewardship
                </p>
              </div>
            </div>

            {/* Floating Glass Pill Navigation Menu */}
            <nav className="hidden md:flex items-center space-x-1 px-4 py-2 rounded-full bg-white/10 backdrop-blur-2xl border border-white/15 shadow-xl text-xs font-medium text-slate-200">
              <button 
                onClick={() => setActiveSlide(0)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${activeSlide === 0 ? 'bg-white/20 text-white font-semibold shadow-xs' : 'hover:text-white hover:bg-white/5'}`}
              >
                Overview
              </button>
              <button 
                onClick={() => setActiveSlide(1)}
                className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${activeSlide === 1 ? 'bg-white/20 text-white font-semibold shadow-xs' : 'hover:text-white hover:bg-white/5'}`}
              >
                Evidence Engine
              </button>
              <button 
                onClick={() => onSelectCase && onSelectCase('demo1')}
                className="px-4 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                Case Studies
              </button>
              <button 
                onClick={onLaunchPortal}
                className="px-4 py-1.5 rounded-full hover:text-white hover:bg-white/5 transition-all cursor-pointer"
              >
                ICMR Guidelines
              </button>
            </nav>

            {/* Right Action: Language Switcher + Hospital Portal CTA */}
            <div className="flex items-center space-x-3">
              {setLanguage && (
                <button
                  onClick={() => setLanguage(isHindi ? 'English' : 'Hindi')}
                  className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 backdrop-blur-xl border border-white/15 text-xs text-slate-200 font-mono transition-all cursor-pointer"
                >
                  {isHindi ? 'English' : 'हिंदी'}
                </button>
              )}

              <button
                onClick={onLaunchPortal}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs tracking-wide shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-[1.02] cursor-pointer"
              >
                <span>Launch Clinical Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </header>

        {/* HERO CENTER CONTENT */}
        <div className="relative z-10 max-w-5xl mx-auto w-full my-auto text-center py-12 px-4">
          
          {/* Pill Tag */}
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-xl border border-white/15 mb-6 text-[11px] font-mono tracking-widest text-emerald-300 uppercase">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>{currentSlide.tag}</span>
          </div>

          {/* Master Headline with Embedded 3D Squircle Icon (Exact Dribbble Motif) */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-none mb-6 flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2">
            <span>{currentSlide.headlinePrefix}</span>
            <span className="inline-flex items-center justify-center mx-1 align-middle">
              <span className="relative inline-block w-12 h-12 sm:w-16 sm:h-16 rounded-2xl overflow-hidden shadow-2xl shadow-emerald-500/30 border border-white/30 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                <img 
                  src="/images/clinical-squircle.jpg" 
                  alt="Clinical Squircle" 
                  className="w-full h-full object-cover"
                />
              </span>
            </span>
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-emerald-200">
              {currentSlide.headlineSuffix}
            </span>
          </h1>

          {/* Subtitle Description */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-200/90 font-light leading-relaxed mb-8">
            {currentSlide.subtext}
          </p>

          {/* Primary Call-to-Action Pill Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onLaunchPortal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-white/15 hover:bg-white/25 backdrop-blur-2xl border border-white/30 text-white font-medium text-sm tracking-wide shadow-2xl transition-all transform hover:scale-[1.03] cursor-pointer flex items-center justify-center space-x-2"
            >
              <span>Enter Clinical Workspace</span>
              <ArrowRight className="w-4 h-4 text-emerald-400" />
            </button>

            <button
              onClick={() => onSelectCase && onSelectCase('demo1')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-slate-900/60 hover:bg-slate-900/80 backdrop-blur-xl border border-white/10 text-slate-300 hover:text-white font-medium text-sm transition-all cursor-pointer flex items-center justify-center space-x-2"
            >
              <Activity className="w-4 h-4 text-emerald-400" />
              <span>Inspect Patient PT-1042</span>
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSlide(idx)}
                className={`h-1.5 rounded-full transition-all cursor-pointer ${activeSlide === idx ? 'w-8 bg-emerald-400' : 'w-2 bg-white/30 hover:bg-white/50'}`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* BOTTOM FLOATING CARD (Exact Dribbble "Download App / VIP Card" Placement) */}
        <div className="relative z-20 max-w-7xl mx-auto w-full flex justify-end pb-2">
          <div 
            onClick={() => onSelectCase && onSelectCase('demo1')}
            className="rounded-2xl p-3.5 sm:p-4 bg-white/10 hover:bg-white/15 backdrop-blur-2xl border border-white/20 shadow-2xl transition-all cursor-pointer group flex items-center space-x-4 max-w-md"
          >
            <div className="text-left space-y-1">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300">
                  Active Surveillance Flag
                </span>
              </div>
              <p className="text-xs font-semibold text-white group-hover:text-emerald-200 transition-colors">
                Patient PT-1042: Meropenem De-escalation
              </p>
              <div className="flex items-center space-x-1.5 pt-0.5">
                <span className="inline-block text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded-full">
                  E. coli Bacteremia
                </span>
                <span className="inline-block text-[10px] font-mono text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Ceftriaxone Susceptible
                </span>
              </div>
            </div>

            {/* Micro Thumbnail of Bioluminescent Culture Plate */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden shrink-0 border border-white/20 shadow-inner">
              <img 
                src="/images/culture-thumb.jpg" 
                alt="Culture Plate" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          </div>
        </div>

      </section>

      {/* SECTION 2: THE INTERACTIVE CINEMATIC CLINICAL DOSSIER (Slide 2 Style from Dribbble) */}
      <section className="relative py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-2 mb-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
            <span>CLINICAL EVIDENCE ENGINE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight">
            How DIYA cross-checks clinical reality
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto font-light">
            Bringing together microbiology, renal function, allergy documentation, and ICMR stewardship guidelines into one unified view.
          </p>
        </div>

        {/* Large Centered Frosted Glass Showcase Card */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Glow Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Pill Navigation Tabs inside the Card */}
          <div className="flex items-center justify-center space-x-2 pb-8">
            <button
              onClick={() => setActiveTabInCard('summary')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTabInCard === 'summary' ? 'bg-white/20 text-white shadow-xs' : 'text-slate-400 hover:text-white bg-white/5'}`}
            >
              Diagnostic Brief
            </button>
            <button
              onClick={() => setActiveTabInCard('evidence')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTabInCard === 'evidence' ? 'bg-white/20 text-white shadow-xs' : 'text-slate-400 hover:text-white bg-white/5'}`}
            >
              Grounding Documents
            </button>
            <button
              onClick={() => setActiveTabInCard('guidelines')}
              className={`px-5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${activeTabInCard === 'guidelines' ? 'bg-white/20 text-white shadow-xs' : 'text-slate-400 hover:text-white bg-white/5'}`}
            >
              ICMR Guidelines
            </button>
          </div>

          {/* Card Body Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-left">
            
            {/* Left Image / Visual Badge (4 Cols) */}
            <div className="lg:col-span-4 space-y-4">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 shadow-xl aspect-video lg:aspect-square group">
                <img 
                  src={activeTabInCard === 'guidelines' ? '/images/hero-botanical-pink.jpg' : '/images/culture-thumb.jpg'} 
                  alt="Clinical Focus" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-300 bg-slate-900/80 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    {activeTabInCard === 'summary' ? 'Microbiology Confirmed' : activeTabInCard === 'evidence' ? 'PDF Evidence Source' : 'ICMR Benchmark'}
                  </span>
                  <p className="text-sm font-semibold text-white mt-1">
                    {activeTabInCard === 'summary' ? 'Escherichia coli (>10^5 CFU/mL)' : activeTabInCard === 'evidence' ? 'Blood_Culture_Report.pdf' : 'National Stewardship Guidelines 2026'}
                  </p>
                </div>
              </div>
            </div>

            {/* Center Content Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {activeTabInCard === 'summary' && (
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-light text-white">
                    Targeted De-escalation Brief
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Patient PT-1042 was initiated on broad-spectrum Meropenem 1g IV TDS empiric therapy. Definitive blood culture confirms Ceftriaxone susceptibility, allowing safe de-escalation to preserve carbapenems.
                  </p>
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Recommended regimen: Ceftriaxone 2g IV once daily</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Renal check: Serum Creatinine 1.8 mg/dL (Requires 48h repeat)</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs text-amber-300">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Allergy note: Childhood Amoxicillin rash (Low cross-reactivity)</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTabInCard === 'evidence' && (
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-light text-white">
                    Zero-Hallucination Grounding
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Every statement generated by DIYA is directly traceable to uploaded hospital documentation. Hovering or clicking reveals exact page coordinates and raw text extractions.
                  </p>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
                    <p className="text-emerald-400">Source: Blood_Culture_Report.pdf (Page 1)</p>
                    <p className="text-slate-400 italic">"Specimen: Blood. Organism: Escherichia coli. Meropenem: S. Ceftriaxone: S. Amoxicillin: R."</p>
                  </div>
                </div>
              )}

              {activeTabInCard === 'guidelines' && (
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-light text-white">
                    ICMR & Sanford Protocol Alignment
                  </h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed">
                    Recommendations are anchored to the Indian Council of Medical Research (ICMR) Antimicrobial Guidelines 2026 for Gram-negative bacteremia.
                  </p>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 font-mono text-[11px] text-slate-300 space-y-1">
                    <p className="text-emerald-400">ICMR Guideline Section 4.2.1</p>
                    <p className="text-slate-400">"In bloodstream infections with documented cephalosporin susceptibility, de-escalate carbapenems within 48 to 72 hours."</p>
                  </div>
                </div>
              )}

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2 pt-2">
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-slate-300 border border-white/15">
                  Documentary Brief
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-slate-300 border border-white/15">
                  ICMR 2026
                </span>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  Verified Grounding
                </span>
              </div>
            </div>

            {/* Right Action Column (3 Cols) */}
            <div className="lg:col-span-3 flex flex-col justify-center space-y-3 lg:border-l lg:border-white/10 lg:pl-6">
              <button
                onClick={() => onSelectCase && onSelectCase('demo1')}
                className="w-full py-3 px-4 rounded-full bg-white hover:bg-slate-100 text-slate-950 font-semibold text-xs transition-all shadow-lg flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>Launch Case PT-1042</span>
              </button>

              <button
                onClick={onLaunchPortal}
                className="w-full py-3 px-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/20 transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-slate-300" />
                <span>View Full Evidence Dossier</span>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 3: CLINICAL STEWARDSHIP METRICS */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-left hover:border-emerald-500/30 transition-all">
            <p className="text-3xl sm:text-4xl font-light text-emerald-400 font-mono">99.1%</p>
            <p className="text-xs font-semibold text-white mt-1">Guideline Concordance</p>
            <p className="text-[11px] text-slate-400 font-light mt-0.5">ICMR & Sanford protocol alignment</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-left hover:border-emerald-500/30 transition-all">
            <p className="text-3xl sm:text-4xl font-light text-cyan-400 font-mono">0.4s</p>
            <p className="text-xs font-semibold text-white mt-1">Context Synthesis</p>
            <p className="text-[11px] text-slate-400 font-light mt-0.5">Multi-document evidence ingestion</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-left hover:border-emerald-500/30 transition-all">
            <p className="text-3xl sm:text-4xl font-light text-purple-400 font-mono">-72%</p>
            <p className="text-xs font-semibold text-white mt-1">Turnaround Time</p>
            <p className="text-[11px] text-slate-400 font-light mt-0.5">Culture report to decision brief</p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 text-left hover:border-emerald-500/30 transition-all">
            <p className="text-3xl sm:text-4xl font-light text-amber-400 font-mono">100%</p>
            <p className="text-xs font-semibold text-white mt-1">Safety Cross-Checks</p>
            <p className="text-[11px] text-slate-400 font-light mt-0.5">Renal clearance & unverified allergy</p>
          </div>

        </div>
      </section>

      {/* SECTION 4: CLINICAL BENCHMARK CASES CAROUSEL */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-light text-white tracking-tight">
              Interactive Patient Cases Ready for Review
            </h3>
            <p className="text-xs text-slate-400 font-light">
              Select any clinical case to launch the interactive antimicrobial review workspace.
            </p>
          </div>

          <button
            onClick={onLaunchPortal}
            className="hidden sm:inline-flex items-center space-x-1 text-xs font-medium text-emerald-400 hover:text-emerald-300 transition-colors cursor-pointer"
          >
            <span>Enter Inpatient Queue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Case 1 */}
          <div 
            onClick={() => onSelectCase && onSelectCase('demo1')}
            className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-emerald-400">CASE PT-1042</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  DE-ESCALATION
                </span>
              </div>
              <h4 className="text-base font-semibold text-white group-hover:text-emerald-300 transition-colors">
                Escherichia coli Bacteremia
              </h4>
              <p className="text-xs text-slate-400 font-light">
                Meropenem broad-spectrum empiric therapy with confirmed Ceftriaxone susceptibility. 48h recency check needed for serum creatinine.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-white/10 mt-4 text-xs">
              <span className="text-slate-400">Medicine ICU Bed 08</span>
              <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span>Review Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Case 2 */}
          <div 
            onClick={() => onSelectCase && onSelectCase('demo2')}
            className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-cyan-400">CASE PT-1039</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  RENAL ADJUSTMENT
                </span>
              </div>
              <h4 className="text-base font-semibold text-white group-hover:text-cyan-300 transition-colors">
                Complicated Pyelonephritis (UTI)
              </h4>
              <p className="text-xs text-slate-400 font-light">
                Piperacillin/Tazobactam therapy day 6. Missing recent CrCl estimation. High-risk prolonged carbapenem candidate.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-white/10 mt-4 text-xs">
              <span className="text-slate-400">Ward 3 (General)</span>
              <span className="text-cyan-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span>Review Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* Case 3 */}
          <div 
            onClick={() => onSelectCase && onSelectCase('demo3')}
            className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 hover:border-emerald-400/40 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-purple-400">CASE PT-1035</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  ALLERGY CONFLICT
                </span>
              </div>
              <h4 className="text-base font-semibold text-white group-hover:text-purple-300 transition-colors">
                Post-Op Surgical Site Infection
              </h4>
              <p className="text-xs text-slate-400 font-light">
                Contradictory allergy records: ER admission lists Penicillin anaphylaxis while surgical ward chart states NKDA.
              </p>
            </div>
            <div className="pt-6 flex items-center justify-between border-t border-white/10 mt-4 text-xs">
              <span className="text-slate-400">Surgical Ward 2</span>
              <span className="text-purple-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center space-x-1">
                <span>Review Case</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-8 px-4 text-center text-xs text-slate-500 font-light">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-slate-300">DIYA</span>
            <span>-</span>
            <span>Diagnostic Intelligence & Antibiotic Review Assistant</span>
          </div>
          <div className="text-[11px] text-slate-500">
            For authorized healthcare professionals only. Not an autonomous prescriber.
          </div>
        </div>
      </footer>

    </div>
  );
}
