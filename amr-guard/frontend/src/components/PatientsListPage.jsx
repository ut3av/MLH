import React, { useState, useEffect } from 'react';
import { Users, ArrowRight, Activity, Clock, ShieldCheck, Database, RefreshCw, Plus, Sparkles } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function PatientsListPage({ onSelectPatient, isFreshUser = false }) {
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadPatients = async () => {
    setIsLoading(true);
    try {
      const data = await supabase.getPatients(isFreshUser);
      setPatientList(data);
    } catch (err) {
      console.warn('Error loading patients from Supabase:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, [isFreshUser]);

  const getCaseKey = (patient) => {
    const alias = (patient.patient_alias || patient.patientId || '').toLowerCase();
    if (alias.includes('1042')) return 'demo1';
    if (alias.includes('1039')) return 'demo2';
    if (alias.includes('1035')) return 'demo3';
    return 'demo1';
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-4 text-left">
      <div className="flex justify-between items-end border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center space-x-1">
              <Database className="w-3 h-3 text-emerald-600" />
              <span>Supabase Inpatient Records</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Active Patient Tracks under Antimicrobial Review
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Real-time patient monitoring for hospital pharmacists and antimicrobial stewardship teams.
          </p>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => onSelectPatient('new')}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-emerald-400/30 group"
          >
            <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
              <Plus className="w-3 h-3 text-white stroke-[2.5]" />
            </div>
            <span>+ New Patient</span>
            <Sparkles className="w-3 h-3 text-emerald-200 animate-pulse" />
          </button>
          <button
            onClick={loadPatients}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-200"
            title="Refresh patient list"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {patientList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3 border border-emerald-200/80">
            <Users className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-800">No Inpatient Tracks Registered</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
            Your clinical account is fresh and ready. Upload patient prescriptions or AST reports to populate live inpatient tracks.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onSelectPatient('new')}
              className="inline-flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 hover:from-emerald-500 hover:to-teal-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer border border-emerald-400/30 group"
            >
              <div className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center group-hover:rotate-90 transition-transform duration-300">
                <Plus className="w-3 h-3 text-white stroke-[2.5]" />
              </div>
              <span>Upload First Patient Report</span>
              <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patientList.map((p) => {
            const alias = p.patient_alias || p.patientId;
            const status = p.status || 'Review required';
            const caseKey = getCaseKey(p);

            return (
              <div
                key={p.id || alias}
                onClick={() => onSelectPatient(caseKey)}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:border-slate-300 hover:shadow-sm transition-all cursor-pointer group flex flex-col justify-between space-y-4 text-left"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-base font-bold text-slate-900">
                      {alias}
                    </span>
                    <span className="text-xs text-slate-500">
                      {p.age}y · {p.sex} · {p.ward}
                    </span>
                  </div>

                  <div className="text-xs space-y-1 text-slate-600">
                    <p><strong>Infection:</strong> {p.infection_site || p.infection}</p>
                    <p><strong>Microbiology:</strong> <span className="italic">{p.organism_isolated || p.organism || 'Pending culture'}</span></p>
                    <p><strong>Current Therapy:</strong> <span className="font-mono text-emerald-700">{p.current_antibiotic || p.currentDrug}</span></p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className={`px-2.5 py-0.5 rounded-full font-semibold text-[11px] border ${
                    status.includes('conflict') 
                      ? 'bg-rose-50 text-rose-800 border-rose-200'
                      : status.includes('Review')
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}>
                    {status}
                  </span>

                  <span className="font-semibold text-emerald-700 group-hover:text-emerald-800 flex items-center space-x-1">
                    <span>Open Dossier</span>
                    <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
