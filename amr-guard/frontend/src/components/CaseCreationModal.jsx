import React, { useState } from 'react';
import { X, UserPlus, Shield, Globe, UserCheck } from 'lucide-react';

export default function CaseCreationModal({ isOpen, onClose, onCreateCase, defaultRole, defaultLanguage }) {
  const [alias, setAlias] = useState(`Patient-${Math.floor(100 + Math.random() * 900)}`);
  const [age, setAge] = useState('65');
  const [sex, setSex] = useState('Male');
  const [infectionSite, setInfectionSite] = useState('Urinary Tract (Complicated UTI)');
  const [userRole, setUserRole] = useState(defaultRole || 'Hospital Pharmacist');
  const [language, setLanguage] = useState(defaultLanguage || 'English');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateCase({
      patient_alias: alias,
      age,
      sex,
      infection_site: infectionSite,
      user_role: userRole,
      language
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 backdrop-blur-xs p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 max-w-lg w-full overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 p-5 text-white flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Create Stewardship Patient Case</h3>
              <p className="text-xs text-slate-400">FR-01: Patient context initialization</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Patient Alias / Bed Identifier</label>
            <input
              type="text"
              required
              value={alias}
              onChange={(e) => setAlias(e.target.value)}
              placeholder="e.g. ICU-Bed-04 or Patient-712"
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Age</label>
              <input
                type="number"
                min="0"
                max="120"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Infection Site / Syndrome</label>
            <select
              value={infectionSite}
              onChange={(e) => setInfectionSite(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            >
              <option value="Urinary Tract (Complicated UTI)">Urinary Tract (Complicated UTI)</option>
              <option value="Lower Respiratory / Hospital-Acquired Pneumonia">Lower Respiratory / Hospital-Acquired Pneumonia</option>
              <option value="Bloodstream / Septic Shock">Bloodstream / Septic Shock</option>
              <option value="Intra-abdominal Infection">Intra-abdominal Infection</option>
              <option value="Skin & Soft Tissue Infection">Skin & Soft Tissue Infection</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">User Role</label>
              <select
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Hospital Pharmacist">Hospital Pharmacist</option>
                <option value="Infectious-Disease Clinician">ID Clinician</option>
                <option value="AMS Coordinator">AMS Coordinator</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Summary Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-900 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="English">English</option>
                <option value="Hindi">हिन्दी (Hindi)</option>
              </select>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-100 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-sm transition-colors"
            >
              Initialize Case Brief
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
