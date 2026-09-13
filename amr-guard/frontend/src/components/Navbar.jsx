import React from 'react';
import { Shield, Github, Activity } from 'lucide-react';

const Navbar = ({ demoMode, setDemoMode }) => {
  return (
    <nav className="bg-slate-900 text-white shadow-lg border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Project Name */}
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-emerald-400" />
            <div>
              <h1 className="text-xl font-bold tracking-tight text-white">
                Project Tara <span className="text-emerald-400 text-sm border border-emerald-400 rounded px-1 ml-1">MLH</span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Antimicrobial Stewardship AI
              </p>
            </div>
          </div>

          {/* Controls and MLH GitHub Link */}
          <div className="flex items-center gap-4">
            
            {/* Demo Mode Toggle */}
            <div className="flex items-center gap-2 bg-slate-800 rounded-full px-3 py-1.5 border border-slate-700">
              <Activity className={`h-4 w-4 ${demoMode ? 'text-amber-400' : 'text-slate-400'}`} />
              <span className="text-sm text-slate-300 font-medium">Demo Mode</span>
              <button 
                onClick={() => setDemoMode(!demoMode)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${demoMode ? 'bg-amber-500' : 'bg-slate-600'}`}
              >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${demoMode ? 'translate-x-5' : 'translate-x-1'}`} />
              </button>
            </div>

            {/* MLH GitHub Repository Link */}
            <a 
              href="https://github.com/yadavvansh25/MLH" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-3 py-1.5 rounded-md border border-slate-600 transition-colors shadow-sm"
            >
              <Github className="h-5 w-5" />
              <span className="text-sm font-medium hidden sm:block">MLH Repo</span>
            </a>
            
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
