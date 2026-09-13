import React from 'react';
import { Shield, HelpCircle } from 'lucide-react';

export default function Navbar({ demoMode, setDemoMode, onHelpClick }) {
  return (
    <nav className="bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-emerald-400 mr-3" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">AMR-Guard</h1>
              <p className="text-xs text-slate-400 hidden sm:block">Antimicrobial Rationalization & WHO AWaRe Clinical Decision Support</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm text-slate-300">Demo Mode</span>
              <button 
                onClick={() => setDemoMode(!demoMode)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${demoMode ? 'bg-emerald-500' : 'bg-slate-600'}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${demoMode ? 'translate-x-6' : 'translate-x-1'}`} />
              </button>
            </div>
            <button onClick={onHelpClick} className="text-slate-300 hover:text-white">
              <HelpCircle className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
