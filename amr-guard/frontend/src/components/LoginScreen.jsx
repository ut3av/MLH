import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, Lock, Building, Mail } from 'lucide-react';

export default function LoginScreen({ onLogin, onBackToShowcase }) {
  const [hospital, setHospital] = useState('St. Jude Memorial Hospital - Infectious Diseases & AMS');
  const [email, setEmail] = useState('dr.sharma@hospital.org');
  const [password, setPassword] = useState('clinical-secure-2026');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ hospital, email, role: 'Clinical Pharmacist' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-4 py-12 text-slate-900">
      <div className="w-full max-w-md space-y-8">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 shadow-xs mb-1">
            <ShieldCheck className="w-6 h-6 stroke-[1.8]" />
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 font-sans">
            DIYA
          </h1>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-widest">
            Diagnostic Intelligence &amp; Antibiotic Review Assistant
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-6">
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
                  required
                  value={hospital}
                  onChange={(e) => setHospital(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
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
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                  placeholder="name@hospital.org"
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>

            {/* Sign in Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Sign in</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Quick Demo Access Note */}
          <div className="pt-2 border-t border-slate-100 flex flex-col items-center space-y-2">
            <p className="text-[11px] text-slate-500 font-medium">
              Demo access pre-configured for authorized hospital staff
            </p>
            {onBackToShowcase && (
              <button
                type="button"
                onClick={onBackToShowcase}
                className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold transition-colors cursor-pointer"
              >
                Return to Product Showcase
              </button>
            )}
          </div>
        </div>

        {/* Footer Notice */}
        <div className="text-center space-y-1 text-xs text-slate-400 font-normal">
          <p>Authorized healthcare professionals only.</p>
          <p className="text-[11px]">Protected clinical workspace - Synthetic &amp; de-identified records only.</p>
        </div>

      </div>
    </div>
  );
}
