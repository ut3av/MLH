import React, { useState } from 'react';
import { ArrowRight, Lock, Building, Mail, UserCheck } from 'lucide-react';

export default function LoginScreen({ onLogin, onBackToShowcase }) {
  const [hospital, setHospital] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleFillDemo = () => {
    setHospital('St. Jude Memorial Hospital - Infectious Diseases & AMS');
    setEmail('dr.sharma@hospital.org');
    setPassword('clinical-secure-2026');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ 
      hospital: hospital.trim() || 'St. Jude Memorial Hospital - Infectious Diseases & AMS', 
      email: email.trim() || 'dr.sharma@hospital.org', 
      role: 'Clinical Pharmacist' 
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-center items-center px-4 py-12 text-slate-900">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Header: Modern typography, no logo */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-light tracking-tight text-slate-900 font-sans">
            DIYA
          </h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
            Diagnostic Intelligence &amp; Antibiotic Review Assistant
          </p>
        </div>

        {/* Login Card with Apple Liquid Glass styling */}
        <div className="bg-white/90 backdrop-blur-2xl rounded-3xl border border-slate-200/90 p-8 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Hospital / Organization */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-slate-700">
                Hospital / Organization
              </label>
              <div className="relative">
                <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
                  placeholder="e.g. AIIMS New Delhi / St. Jude Memorial"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-slate-700">
                Hospital Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
                  placeholder="e.g. dr.sharma@hospital.org"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50/80 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
                  placeholder="Clinical credentials"
                />
              </div>
            </div>

            {/* Sign in Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Enter Hospital Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Clean Demo & Showcase Controls */}
          <div className="pt-3 border-t border-slate-100 flex flex-col items-center space-y-2">
            <button
              type="button"
              onClick={handleFillDemo}
              className="text-xs text-slate-600 hover:text-slate-900 font-medium flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <UserCheck className="w-3.5 h-3.5 text-slate-500" />
              <span>Fill Verified Staff Credentials (Dr. Sharma)</span>
            </button>
            
            {onBackToShowcase && (
              <button
                type="button"
                onClick={onBackToShowcase}
                className="text-xs text-slate-500 hover:text-slate-800 font-medium transition-colors cursor-pointer pt-1"
              >
                Return to Product Showcase
              </button>
            )}
          </div>
        </div>

        {/* Footer Notice */}
        <div className="text-center space-y-1 text-xs text-slate-400 font-normal">
          <p>Authorized healthcare professionals only.</p>
          <p className="text-[11px]">Protected hospital clinical workspace. Standard security protocols apply.</p>
        </div>

      </div>
    </div>
  );
}
