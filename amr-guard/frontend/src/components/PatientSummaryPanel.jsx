import React from 'react';
import { FileText, ArrowUpRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PatientSummaryPanel({ profile, language = 'English', onSelectFact }) {
  if (!profile) return null;

  const isHindi = language === 'Hindi';

  // Extract current antibiotic
  const currentAntibiotic = profile.medications && profile.medications.length > 0
    ? profile.medications[0].value
    : 'Meropenem 1g IV every 8h';

  // Extract organism & specimen
  const organismFact = profile.cultures?.find(c => c.name === 'Organism');
  const organism = organismFact ? organismFact.value : 'Escherichia coli';
  const specimen = 'Urine';

  // Extract allergy
  const allergyFact = profile.allergies && profile.allergies.length > 0
    ? profile.allergies[0]
    : null;
  const allergyDrug = allergyFact ? allergyFact.name : 'Amoxicillin';
  const allergyStatus = allergyFact?.value?.includes('severity unrecorded') || allergyFact?.value?.includes('not documented')
    ? 'Severity not documented'
    : allergyFact ? allergyFact.value : 'No allergy documented';
  const isAllergySeverityMissing = allergyStatus.toLowerCase().includes('not documented') || allergyStatus.toLowerCase().includes('unrecorded');

  // Extract renal status
  const creatinineFact = profile.labs?.find(l => l.name.toLowerCase().includes('creatinine'));
  const isRenalOutdated = creatinineFact?.value?.toLowerCase().includes('outdated') || creatinineFact?.value?.toLowerCase().includes('72h');

  return (
    <div className="rounded-3xl glass-surface p-7 sm:p-8 border border-white/8 space-y-8 shadow-glass text-left">
      {/* Panel Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <span className="text-xs font-mono uppercase tracking-widest text-sage-400">
          Patient Context
        </span>
        <div className="flex items-center space-x-1.5 text-[11px] text-emerald-400 font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Extracted via Gemini</span>
        </div>
      </div>

      {/* Demographics & Infection Site */}
      <div className="space-y-1">
        <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
          {profile.age || '62'} {profile.sex === 'Female' ? 'F' : 'M'}
        </h2>
        <p className="text-xs text-sage-300/80 font-normal">
          {profile.infection_site || 'Urinary infection'}
        </p>
      </div>

      <div className="space-y-6 pt-2">
        {/* CURRENT THERAPY */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-sage-400">
            Current Therapy
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-base font-normal text-white">
              {currentAntibiotic}
            </p>
            <button
              onClick={() => onSelectFact && onSelectFact('medication', 'medication_chart.pdf', 'Inj. Meropenem 1 g IV every 8 hours (TDS)')}
              className="text-[11px] font-mono text-emerald-400/80 hover:text-emerald-300 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* CULTURE */}
        <div className="space-y-2">
          <p className="text-[11px] font-mono uppercase tracking-wider text-sage-400">
            Culture &amp; Susceptibility
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-base font-normal text-white">
              {organism} · {specimen}
            </p>
            <button
              onClick={() => onSelectFact && onSelectFact('culture', 'culture_report.pdf', 'Escherichia coli >10^5 CFU/mL. Nitrofurantoin: Susceptible; Meropenem: Susceptible; Ceftriaxone: Resistant.')}
              className="text-[11px] font-mono text-emerald-400/80 hover:text-emerald-300 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {/* AST Chips */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {profile.cultures?.filter(c => c.name !== 'Organism').map((c, i) => (
              <span
                key={i}
                className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                  c.value === 'SUSCEPTIBLE'
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                    : c.value === 'RESISTANT'
                      ? 'bg-rose-950/60 text-rose-300 border-rose-500/30'
                      : 'bg-forest-900 text-sage-300 border-white/10'
                }`}
              >
                {c.name}: {c.value}
              </span>
            ))}
          </div>
        </div>

        {/* ALLERGY - Visually distinct missing information */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-sage-400">
            Allergy Record
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-base font-normal text-white">
              {allergyDrug}
            </p>
            <button
              onClick={() => onSelectFact && onSelectFact('allergy', 'allergy_record.pdf', "Childhood rash noted with Amoxicillin. Severity and anaphylaxis status unrecorded.")}
              className="text-[11px] font-mono text-emerald-400/80 hover:text-emerald-300 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {isAllergySeverityMissing ? (
            <div className="p-2.5 rounded-xl bg-amber-950/40 border border-amber-500/30 text-xs text-amber-200/90 space-y-0.5">
              <p className="font-mono text-[11px] text-amber-300 uppercase tracking-wide flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span>Severity not documented</span>
              </p>
              <p className="text-[11px] text-amber-200/80 leading-snug">
                DIYA has not assumed &quot;no allergy&quot;. Human verification required.
              </p>
            </div>
          ) : (
            <p className="text-xs text-sage-400">{allergyStatus}</p>
          )}
        </div>

        {/* RENAL DATA */}
        <div className="space-y-1.5">
          <p className="text-[11px] font-mono uppercase tracking-wider text-sage-400">
            Renal Data
          </p>
          <div className="flex items-baseline justify-between">
            <p className="text-base font-normal text-white">
              Available
            </p>
            <button
              onClick={() => onSelectFact && onSelectFact('renal', 'biochem_labs.pdf', 'Serum Creatinine: 1.8 mg/dL (Tested 72 hours ago, baseline CKD eGFR 38).')}
              className="text-[11px] font-mono text-emerald-400/80 hover:text-emerald-300 flex items-center space-x-0.5"
            >
              <span>View source</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          {isRenalOutdated ? (
            <p className="text-xs text-amber-300/90 font-mono">
              Requires confirmation · Last checked 72h ago (&gt;48h threshold)
            </p>
          ) : (
            <p className="text-xs text-sage-400">Normal parameters</p>
          )}
        </div>
      </div>

      {/* Comorbidities footer note if available */}
      {profile.comorbidities && profile.comorbidities.length > 0 && (
        <div className="pt-4 border-t border-white/5 space-y-1">
          <p className="text-[10px] font-mono uppercase tracking-wider text-sage-500">
            Documented Comorbidities
          </p>
          <p className="text-xs text-sage-300">
            {profile.comorbidities.map(c => `${c.name} (${c.value})`).join(' · ')}
          </p>
        </div>
      )}
    </div>
  );
}
