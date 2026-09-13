import React from 'react';
import { User, Activity, AlertCircle, Pill, Microchip } from 'lucide-react';

export default function PatientSummaryPanel({ profile }) {
  if (!profile) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-full">
      <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-slate-100">
        <div className="bg-slate-100 p-3 rounded-full">
          <User className="h-6 w-6 text-slate-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Patient Profile</h2>
          <p className="text-sm text-slate-500">{profile.age} yrs • {profile.sex} • {profile.infection_site}</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-700 flex items-center mb-3 uppercase tracking-wider">
            <AlertCircle className="h-4 w-4 mr-2 text-rose-500" /> Allergies
          </h3>
          {profile.allergies.length > 0 ? (
            <ul className="space-y-2">
              {profile.allergies.map((a, i) => (
                <li key={i} className="text-sm bg-rose-50 text-rose-900 p-2 rounded border border-rose-100">
                  <span className="font-semibold">{a.name}:</span> {a.value}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 italic">None documented</p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700 flex items-center mb-3 uppercase tracking-wider">
            <Pill className="h-4 w-4 mr-2 text-indigo-500" /> Current Medications
          </h3>
          <ul className="space-y-2">
            {profile.medications.map((m, i) => (
              <li key={i} className="text-sm bg-indigo-50 text-indigo-900 p-2 rounded border border-indigo-100">
                <span className="font-semibold">{m.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-700 flex items-center mb-3 uppercase tracking-wider">
            <Activity className="h-4 w-4 mr-2 text-emerald-500" /> Key Labs & Cultures
          </h3>
          <ul className="space-y-2">
            {profile.cultures.map((c, i) => (
              <li key={`c-${i}`} className="text-sm bg-emerald-50 text-emerald-900 p-2 rounded border border-emerald-100 flex justify-between">
                <span>{c.name}</span>
                <span className="font-bold">{c.value}</span>
              </li>
            ))}
            {profile.labs.map((l, i) => (
              <li key={`l-${i}`} className="text-sm bg-slate-50 text-slate-700 p-2 rounded border border-slate-200">
                <span className="font-semibold">{l.name}:</span> {l.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
