import React from 'react';
import { BookOpen, ExternalLink, ShieldCheck, FileText, CheckCircle2 } from 'lucide-react';

export default function GuidelinesPage() {
  const guidelines = [
    {
      organization: 'WHO',
      title: 'Antimicrobial Stewardship Guidance & AWaRe 2024 Framework',
      scope: 'Global Reference Standard',
      description: 'Defines Access, Watch, and Reserve categories to guide empirical and definitive antibiotic choices, promoting de-escalation once microbiological identification is confirmed.',
      linkText: 'WHO AWaRe Classification 2024'
    },
    {
      organization: 'ICMR',
      title: 'Indian Council of Medical Research (ICMR) Antimicrobial Guidelines',
      scope: 'National Context (India)',
      description: 'Step 5 stewardship protocols mandate mandatory timeout reviews at 48 to 72 hours, de-escalation of empiric carbapenems, and verification of reported penicillin allergies before drug restriction.',
      linkText: 'ICMR Treatment Guidelines 2024'
    },
    {
      organization: 'Hospital Policy',
      title: 'Local Hospital Antimicrobial & Renal Dosing Policy',
      scope: 'Institutional Protocol',
      description: 'Institutional ICU guidance requiring serum creatinine and eGFR testing within 48 hours for renally excreted antibiotics, accompanied by restricted carbapenem order forms.',
      linkText: 'Institutional AMS Protocol 2025'
    }
  ];

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4 text-left">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
            Evidence Library
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
          Antimicrobial Guidelines &amp; Policies
        </h1>
        <p className="text-xs text-slate-500 font-normal mt-0.5">
          Curated clinical evidence benchmarks utilized by DIYA to cross-check patient therapy without autonomous prescribing.
        </p>
      </div>

      {/* Guidelines List */}
      <div className="space-y-4">
        {guidelines.map((item, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 font-semibold">
                {item.organization}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {item.scope}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900">
              {item.title}
            </h3>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {item.description}
            </p>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-[11px]">
                Ground-truth authority used in RAG cross-checking
              </span>
              <span className="text-emerald-700 font-semibold flex items-center space-x-1 cursor-default">
                <span>{item.linkText}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Trust Notice */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 text-xs text-slate-600 space-y-1">
        <p className="font-semibold text-slate-900 flex items-center space-x-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Clinical Decision-Support Integrity</span>
        </p>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          DIYA strictly retrieves and cites published clinical guidance. The system does not generate unverified medical recommendations.
        </p>
      </div>
    </div>
  );
}
