import React from 'react';
import { User, LogOut } from 'lucide-react';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  user, 
  onLogout,
  language,
  setLanguage,
  onNewReviewClick
}) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/75 backdrop-blur-2xl backdrop-saturate-150 border-b border-slate-200/70 text-slate-900 shadow-[0_2px_16px_rgba(0,0,0,0.02)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Brand Identity: No logo, only DIYA with modern typography */}
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => setCurrentTab('landing')}
          >
            <span className="text-xl font-medium tracking-tight text-slate-900 group-hover:text-emerald-800 transition-colors select-none font-sans">
              DIYA
            </span>
            <span className="text-[10px] uppercase tracking-wider font-medium text-slate-500 bg-slate-100/90 px-2.5 py-0.5 rounded-full border border-slate-200/70 hidden sm:inline-block">
              Hospital AMS
            </span>
          </div>

          {/* Center Navigation Links: Apple liquid glass pill styling */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-medium text-slate-600 bg-slate-100/60 backdrop-blur-xl p-1 rounded-full border border-slate-200/50 shadow-inner">
            <button
              onClick={() => setCurrentTab('landing')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'landing' 
                  ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                  : 'hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'dashboard' || currentTab === 'review' 
                  ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                  : 'hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setCurrentTab('patients')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'patients' 
                  ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                  : 'hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              Patients
            </button>
            <button
              onClick={() => setCurrentTab('guidelines')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'guidelines' 
                  ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                  : 'hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              Guidelines
            </button>
            <button
              onClick={() => setCurrentTab('activity')}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                currentTab === 'activity' 
                  ? 'text-slate-950 bg-white font-semibold shadow-xs border border-slate-200/80' 
                  : 'hover:text-slate-950 hover:bg-white/60'
              }`}
            >
              Activity
            </button>
          </nav>

          {/* Right User Controls */}
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

            {/* Quick Portal Action */}
            <button
              onClick={() => setCurrentTab(currentTab === 'landing' ? 'dashboard' : 'new_review')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium shadow-xs transition-all cursor-pointer"
            >
              <span>{currentTab === 'landing' ? 'Clinical Portal' : 'New Review'}</span>
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-700 bg-slate-100/80 px-3 py-1 rounded-full border border-slate-200/60">
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <User className="w-3 h-3" />
              </div>
              <span className="hidden sm:inline">Dr. Sharma</span>
              <span className="text-slate-300 text-[10px]">|</span>
              <span className="text-[11px] text-slate-500 hidden md:inline">Pharmacist</span>
            </div>

            {/* Sign out */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

          </div>

        </div>
      </div>
    </header>
  );
}
