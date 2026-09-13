import React, { useState, useEffect } from 'react';
import { Plus, ArrowRight, Clock, ShieldCheck, FileText, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function MainDashboard({ 
  onStartNewReview, 
  onSelectCase, 
  language = 'English',
  isFreshUser = false
}) {
  const isHindi = language === 'Hindi';
  const [patientList, setPatientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load real-time patients from Supabase or fallback
  const fetchDashboardPatients = async () => {
    setIsLoading(true);
    try {
      const data = await supabase.getPatients(isFreshUser);
      setPatientList(data);
    } catch (e) {
      console.warn('Dashboard patient load note:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardPatients();
  }, [isFreshUser]);

  // Compute live counts
  const totalCount = patientList.length;
  const awaitingCount = patientList.filter(p => (p.status || '').toLowerCase().includes('review') || (p.status || '').toLowerCase().includes('due') || (p.status || '').toLowerCase().includes('conflict')).length;
  const completedCount = totalCount - awaitingCount;

  const getCaseKey = (alias) => {
    const a = (alias || '').toLowerCase();
    if (a.includes('1042')) return 'demo1';
    if (a.includes('1039')) return 'demo2';
    if (a.includes('1035')) return 'demo3';
    return 'demo1';
  };

  return (
    <div className="space-y-8 max-w-6xl mx-auto py-4 text-left">
      
      {/* Top Greeting & Action Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {isHindi ? 'नमस्ते, सुप्रभात।' : 'Good morning.'}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {isHindi 
              ? 'अस्पताल रोगाणुरोधी प्रबंधन और नैदानिक समीक्षा कार्यक्षेत्र' 
              : 'Hospital Antimicrobial Stewardship & Clinical Decision Support'}
          </p>
        </div>

        <button
          onClick={onStartNewReview}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center space-x-2 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>{isHindi ? 'नया रोगी समीक्षा शुरू करें' : '+ New Patient Review'}</span>
        </button>
      </div>

      {/* Useful Clinical Statistics */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Clinical reviews
          </h2>
          <button 
            onClick={fetchDashboardPatients}
            className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center space-x-1 cursor-pointer"
            title="Refresh statistics"
          >
            <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Sync</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-3xl font-bold font-mono text-slate-900">{totalCount}</p>
            <p className="text-xs font-medium text-slate-500">Active reviews</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-1 bg-amber-50/20">
            <p className="text-3xl font-bold font-mono text-amber-700">{awaitingCount}</p>
            <p className="text-xs font-medium text-amber-800">Awaiting review</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-1 bg-emerald-50/20">
            <p className="text-3xl font-bold font-mono text-emerald-700">{completedCount >= 0 ? completedCount : 1}</p>
            <p className="text-xs font-medium text-emerald-800">Completed / Stable</p>
          </div>
        </div>
      </div>

      {/* Recent Reviews Table */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Recent reviews
          </h2>
          <span className="text-xs text-slate-400 font-mono">Real-time department queue</span>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-500 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3 px-4">Patient</th>
                <th className="py-3 px-4">Case / Infection</th>
                <th className="py-3 px-4">Ward</th>
                <th className="py-3 px-4">Current Therapy</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {patientList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 px-4 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200/80">
                        <Plus className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-800">Fresh Clinical Workspace Ready</p>
                        <p className="text-xs text-slate-500">
                          No patient records registered yet. Upload blood culture, urine AST, or doctor prescriptions to begin.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={onStartNewReview}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer inline-flex items-center space-x-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Upload First Patient Report</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                patientList.map((item, idx) => {
                  const alias = item.patient_alias || item.patientId || `PT-${idx + 1040}`;
                  const caseKey = getCaseKey(alias);
                  const status = item.status || 'Review required';
                  const currentDrug = item.current_antibiotic || item.currentDrug || 'Standard Regimen';

                  return (
                    <tr 
                      key={item.id || alias}
                      onClick={() => onSelectCase(caseKey)}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                    >
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {alias}
                      </td>
                      <td className="py-3.5 px-4">
                        <p className="font-semibold text-slate-800">{item.infection_site || item.caseName || 'Inpatient Admission'}</p>
                        <p className="text-[11px] text-slate-400 font-normal italic">{item.organism_isolated || item.organism || 'Culture Pending'}</p>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-medium">
                        {item.ward || 'Inpatient Ward'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-emerald-800 font-medium">
                        {currentDrug}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                          status.toLowerCase().includes('conflict')
                            ? 'bg-rose-50 text-rose-800 border-rose-200'
                            : status.toLowerCase().includes('review') || status.toLowerCase().includes('due')
                              ? 'bg-amber-50 text-amber-800 border-amber-200'
                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-emerald-700 group-hover:text-emerald-800">
                        <span className="inline-flex items-center space-x-1">
                          <span>Open Review</span>
                          <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Clinical Workflow Core Banner */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-900">
            DIYA: From patient data to evidence-guided antibiotic decisions.
          </p>
          <p className="text-xs text-slate-500">
            AI prepares the decision. Healthcare professionals make it.
          </p>
        </div>

        <button
          onClick={() => onSelectCase('demo1')}
          className="px-4 py-2 bg-white hover:bg-slate-100 text-slate-800 rounded-xl border border-slate-200 text-xs font-semibold transition-colors flex items-center space-x-1.5 shrink-0 shadow-2xs"
        >
          <span>View Active Case PT-1042</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
        </button>
      </div>

    </div>
  );
}
