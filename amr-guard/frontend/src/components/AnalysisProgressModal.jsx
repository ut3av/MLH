import React, { useState, useEffect } from 'react';
import { Check, ShieldCheck } from 'lucide-react';

export default function AnalysisProgressModal({ isOpen, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    'Reading clinical documents',
    'Extracting patient history',
    'Identifying current medications',
    'Reading culture and susceptibility results',
    'Checking allergies',
    'Reviewing renal/hepatic information',
    'Checking relevant antimicrobial guidance',
    'Preparing clinical review'
  ];

  useEffect(() => {
    if (!isOpen) {
      setCurrentStep(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 350);
          return prev;
        }
      });
    }, 380);

    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4 transition-all">
      <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-8 sm:p-10 space-y-7 shadow-xl text-left">
        
        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
            <ShieldCheck className="w-5 h-5 stroke-[2]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">
              DIYA is reviewing the patient information
            </h2>
            <p className="text-[11px] text-slate-500">
              Clinical decision support synthesis in progress
            </p>
          </div>
        </div>

        {/* 8-Step Checklist */}
        <div className="space-y-3 pt-1">
          {steps.map((step, idx) => {
            const isDone = idx < currentStep;
            const isCurrent = idx === currentStep;

            return (
              <div 
                key={idx} 
                className={`flex items-center space-x-3 transition-all duration-200 ${
                  idx > currentStep ? 'opacity-40' : 'opacity-100'
                }`}
              >
                <div className="w-5 h-5 flex items-center justify-center shrink-0">
                  {isDone ? (
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 stroke-[2.5]" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-3 h-3 rounded-full bg-emerald-600 animate-ping" />
                  ) : (
                    <div className="w-2.5 h-2.5 rounded-full border border-slate-300" />
                  )}
                </div>

                <span className={`text-xs font-medium ${
                  isCurrent 
                    ? 'text-emerald-700 font-semibold' 
                    : isDone 
                      ? 'text-slate-900' 
                      : 'text-slate-400'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Safety Note */}
        <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-400 text-center font-normal">
          Evidence-grounded review for authorized clinicians and pharmacists.
        </div>

      </div>
    </div>
  );
}
