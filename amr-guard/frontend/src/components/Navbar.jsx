import React from 'react';
import { ShieldCheck, User, LogOut, BookOpen, Layers, Activity, Users } from 'lucide-react';

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
    <header className="sticky top-0 z-40 w-full bg-white border-b border-slate-200 text-slate-900 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Left Brand Identity */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setCurrentTab('dashboard')}
          >
            <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-2xs">
              <ShieldCheck className="w-4 h-4 stroke-[2]" />
            </div>
            
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold tracking-tight text-slate-900">
                  DIYA
                </span>
                <span className="text-[10px] uppercase font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  Hospital AMS
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-normal hidden sm:block">
                Diagnostic Intelligence &amp; Antibiotic Review Assistant
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 text-xs font-semibold text-slate-600">
            <button
              onClick={() => setCurrentTab('landing')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'landing' 
                  ? 'text-emerald-700 bg-emerald-50 font-bold' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Showcase
            </button>
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'dashboard' || currentTab === 'review' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Reviews
            </button>
            <button
              onClick={() => setCurrentTab('patients')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'patients' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Patients
            </button>
            <button
              onClick={() => setCurrentTab('guidelines')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'guidelines' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Guidelines
            </button>
            <button
              onClick={() => setCurrentTab('activity')}
              className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                currentTab === 'activity' 
                  ? 'text-emerald-700 bg-emerald-50' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Activity
            </button>
          </nav>

          {/* Right User Controls */}
          <div className="flex items-center space-x-3">
            
            {/* Language Toggle (EN | HI) */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
              <button
                onClick={() => setLanguage('English')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  language === 'English'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('Hindi')}
                className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
                  language === 'Hindi'
                    ? 'bg-white text-slate-900 shadow-2xs'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                HI
              </button>
            </div>

            {/* User Profile Pill */}
            <div className="flex items-center space-x-2 text-xs font-medium text-slate-700 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200">
              <div className="w-5 h-5 rounded-full bg-slate-200 flex items-center justify-center text-slate-600">
                <User className="w-3 h-3" />
              </div>
              <span className="hidden sm:inline">Dr. Sharma</span>
              <span className="text-slate-400 text-[10px]">|</span>
              <span className="text-[11px] text-slate-500 hidden md:inline">Pharmacist</span>
            </div>

            {/* Sign out */}
            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
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
