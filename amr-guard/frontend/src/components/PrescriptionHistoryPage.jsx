import React, { useState, useEffect } from 'react';
import { 
  FileText, Search, Plus, Filter, CheckCircle2, Clock, 
  AlertCircle, Sparkles, Database, ArrowRight, ShieldCheck 
} from 'lucide-react';
import { supabase } from '../supabaseClient';

export default function PrescriptionHistoryPage({ 
  onSelectPatient, 
  language = 'English',
  isFreshUser = false 
}) {
  const [prescriptions, setPrescriptions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New Prescription Modal State
  const [newPatient, setNewPatient] = useState('');
  const [newDrug, setNewDrug] = useState('Meropenem');
  const [newDose, setNewDose] = useState('1g');
  const [newFreq, setNewFreq] = useState('TDS (Every 8h)');
  const [newRoute, setNewRoute] = useState('IV');
  const [newIndication, setNewIndication] = useState('Empiric Sepsis Coverage');

  const loadPrescriptions = async () => {
    setIsLoading(true);
    try {
      const data = await supabase.getPrescriptions(undefined, isFreshUser);
      setPrescriptions(data);
    } catch (e) {
      console.warn('Failed to load prescriptions:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPrescriptions();
  }, [isFreshUser]);

  const handleCreatePrescription = async (e) => {
    e.preventDefault();
    if (!newPatient || !newDrug) return;

    await supabase.addPrescription({
      patient_alias: newPatient.toUpperCase(),
      drug_name: newDrug,
      dosage: newDose,
      frequency: newFreq,
      route: newRoute,
      indication: newIndication,
      status: 'Active',
      prescribing_doctor: 'Dr. Sharma (Clinical Pharmacist)',
      source_type: 'Manual Clinical Entry',
      gemini_extracted_notes: 'Created directly via DIYA Prescription Workspace.'
    });

    setIsAddingNew(false);
    setNewPatient('');
    await loadPrescriptions();
  };

  const filteredPrescriptions = prescriptions.filter(p => {
    const matchesSearch = 
      (p.patient_alias || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.drug_name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.indication || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedFilter === 'active') return matchesSearch && p.status === 'Active';
    if (selectedFilter === 'deescalated') return matchesSearch && (p.status || '').toLowerCase().includes('de-escalat');
    return matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4 text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 flex items-center space-x-1">
              <Database className="w-3 h-3 text-emerald-600" />
              <span>Supabase Prescriptions Table</span>
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-1">
            Prescription History &amp; Antimicrobial Courses
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-0.5">
            Audit trail of active and de-escalated antimicrobial regimens with Gemini OCR extraction provenance.
          </p>
        </div>

        <button
          onClick={() => setIsAddingNew(true)}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs flex items-center space-x-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Record Prescription</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search patient, antibiotic, or indication..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white"
          />
        </div>

        <div className="flex items-center space-x-1 w-full sm:w-auto">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              selectedFilter === 'all' 
                ? 'bg-slate-900 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Prescriptions ({prescriptions.length})
          </button>
          <button
            onClick={() => setSelectedFilter('active')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              selectedFilter === 'active' 
                ? 'bg-slate-900 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setSelectedFilter('deescalated')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-all ${
              selectedFilter === 'deescalated' 
                ? 'bg-slate-900 text-white' 
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            De-escalations
          </button>
        </div>
      </div>

      {/* Prescription List Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono text-[10px]">
              <tr>
                <th className="py-3 px-4 font-semibold">Patient</th>
                <th className="py-3 px-4 font-semibold">Antimicrobial Regimen</th>
                <th className="py-3 px-4 font-semibold">Route &amp; Frequency</th>
                <th className="py-3 px-4 font-semibold">Clinical Indication</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold">Source</th>
                <th className="py-3 px-4 text-right font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredPrescriptions.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 px-4 text-center">
                    <div className="max-w-sm mx-auto space-y-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200/80">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-semibold text-slate-800">No Prescriptions Logged Yet</p>
                        <p className="text-xs text-slate-500">
                          Your clinical prescription record is fresh and empty. Upload patient prescriptions or record a new regimen above.
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPrescriptions.map((rx) => (
                  <tr key={rx.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                      <span 
                        onClick={() => onSelectPatient && onSelectPatient(rx.patient_alias === 'PT-1042' ? 'demo1' : rx.patient_alias === 'PT-1039' ? 'demo2' : 'demo3')}
                        className="cursor-pointer hover:underline text-slate-900"
                      >
                        {rx.patient_alias}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-900">
                      <div className="flex items-center space-x-2">
                        <span>{rx.drug_name}</span>
                        <span className="text-[11px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {rx.dosage}
                        </span>
                      </div>
                    </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {rx.route} · {rx.frequency}
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">
                    {rx.indication || 'Not documented'}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] border ${
                      rx.status === 'Active'
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                        : rx.status === 'Pending Sign-off'
                          ? 'bg-amber-50 text-amber-800 border-amber-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                    }`}>
                      {rx.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-[11px] text-slate-500">
                    <div className="flex items-center space-x-1">
                      {rx.source_type?.includes('OCR') ? (
                        <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                      ) : (
                        <Database className="w-3 h-3 text-slate-400 shrink-0" />
                      )}
                      <span>{rx.source_type || 'Manual'}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => onSelectPatient && onSelectPatient(rx.patient_alias === 'PT-1042' ? 'demo1' : rx.patient_alias === 'PT-1039' ? 'demo2' : 'demo3')}
                      className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              )))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add New Prescription Modal */}
      {isAddingNew && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-3xl border border-slate-200 max-w-md w-full p-6 space-y-4 shadow-xl text-left">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900">Record New Antimicrobial Regimen</h3>
              <p className="text-xs text-slate-500">Add to Supabase prescription history with AMS tracking</p>
            </div>

            <form onSubmit={handleCreatePrescription} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Patient Alias / ID</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. PT-1042"
                  value={newPatient}
                  onChange={(e) => setNewPatient(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Antimicrobial Drug</label>
                  <input
                    type="text"
                    required
                    value={newDrug}
                    onChange={(e) => setNewDrug(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Dosage</label>
                  <input
                    type="text"
                    value={newDose}
                    onChange={(e) => setNewDose(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Frequency</label>
                  <input
                    type="text"
                    value={newFreq}
                    onChange={(e) => setNewFreq(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Route</label>
                  <select
                    value={newRoute}
                    onChange={(e) => setNewRoute(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="IV">IV</option>
                    <option value="Oral">Oral</option>
                    <option value="IM">IM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Indication</label>
                <input
                  type="text"
                  value={newIndication}
                  onChange={(e) => setNewIndication(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-medium cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-semibold cursor-pointer"
                >
                  Save to Supabase
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
