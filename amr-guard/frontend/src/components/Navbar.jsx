import React from 'react';
import { User, LogOut, Lock, ArrowRight, Plus, Sparkles } from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  isAuthenticated,
  onLogout,
  language,
  setLanguage,
  onNewReviewClick
}) {
  const isLanding = currentTab === 'landing' || !isAuthenticated;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-2xl backdrop-saturate-150 border-b border-slate-200/70 text-slate-900 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => {
              if (isAuthenticated) setCurrentTab('dashboard');
              else setCurrentTab('landing');
            }}
          >
            <img 
              src="/diya-brand-logo.png" 
              alt="Diya Logo" 
              className="h-8 sm:h-9 w-auto object-contain transition-transform group-hover:scale-105" 
            />
            <span className="text-[10px] uppercase tracking-wider font-medium text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full border border-slate-200/70 hidden sm:inline-block">
              Hospital AMS
            </span>
          </div>

          {/* Center Navigation Links: ONLY VISIBLE IF AUTHENTICATED */}
          {isAuthenticated ? (
            <nav className="hidden md:flex items-center space-x-1 text-xs font-medium text-slate-600 bg-slate-100/70 backdrop-blur-xl p-1 rounded-full border border-slate-200/50 shadow-inner">
              <button
                onClick={() => setCurrentTab('dashboard')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentTab === 'dashboard' || currentTab === 'review' 
                    ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setCurrentTab('new_review')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentTab === 'new_review' 
                    ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                New Review (OCR)
              </button>
              <button
                onClick={() => setCurrentTab('patients')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentTab === 'patients' 
                    ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                Patient Tracks
              </button>
              <button
                onClick={() => setCurrentTab('prescriptions')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentTab === 'prescriptions' 
                    ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                Prescription History
              </button>
              <button
                onClick={() => setCurrentTab('guidelines')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentTab === 'guidelines' 
                    ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                Guidelines
              </button>
              <button
                onClick={() => setCurrentTab('activity')}
                className={`px-3.5 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentTab === 'activity' 
                    ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                    : 'hover:text-slate-950 hover:bg-white/60'
                }`}
              >
                Audit Activity
              </button>
            </nav>
          ) : (
            /* When not authenticated on Landing Page, show NO links to other pages */
            <div className="hidden sm:flex items-center space-x-2 text-xs text-slate-500 font-medium">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span>Protected Clinical Decision Gateway</span>
            </div>
          )}

          {/* Right Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Language Toggle (EN | HI) */}
            <div className="flex items-center bg-slate-100/80 p-0.5 rounded-full border border-slate-200/70 text-xs font-medium">
              <button
                onClick={() => setLanguage('English')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'English'
                    ? 'bg-white text-slate-950 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('Hindi')}
                className={`px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                  language === 'Hindi'
                    ? 'bg-white text-slate-950 shadow-xs font-semibold'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                HI
              </button>
            </div>

            {/* If NOT Authenticated: Show single clear Login button */}
            {!isAuthenticated ? (
              <button
                onClick={() => setCurrentTab('login')}
                className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shadow-xs transition-all cursor-pointer"
              >
                <span>Login</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              /* If Authenticated: Show New Patient CTA, Staff Info & Sign out */
              <div className="flex items-center space-x-2.5">
                <button
                  onClick={() => setCurrentTab('new_review')}
                  className="hidden sm:inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 hover:to-teal-700 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer group border border-emerald-400/30"
                  title="Start New Patient Antimicrobial Review"
                >
                  <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                    <Plus className="w-3 h-3 text-white stroke-[2.5]" />
                  </div>
                  <span>+ New Patient</span>
                  <Sparkles className="w-3 h-3 text-emerald-200 animate-pulse" />
                </button>

                <div className="flex items-center space-x-2 text-xs font-medium text-slate-700 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60">
                  <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                    <User className="w-3 h-3" />
                  </div>
                  <span className="hidden sm:inline">{user?.email?.split('@')[0] || 'Dr. Sharma'}</span>
                  <span className="text-slate-300 text-[10px]">|</span>
                  <span className="text-[11px] text-slate-500 hidden md:inline">{user?.role || 'Pharmacist'}</span>
                </div>

                <button
                  onClick={onLogout}
                  className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
