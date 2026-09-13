import React, { useState } from 'react';
import { 
  ArrowLeft, ArrowRight, UploadCloud, FileText, CheckCircle2, 
  X, Plus, ShieldCheck, FileCheck, Layers, FileCode 
} from 'lucide-react';

export default function NewReviewScreen({ 
  onAnalyze, 
  isAnalyzing, 
  onBack,
  language = 'English' 
}) {
  const isHindi = language === 'Hindi';

  // Patient Identifiers
  const [patientId, setPatientId] = useState('PT-1042');
  const [age, setAge] = useState('62');
  const [sex, setSex] = useState('Male');
  const [ward, setWard] = useState('Medicine / ICU Bed 08');

  // Attached files list
  const [attachedFiles, setAttachedFiles] = useState([
    { name: 'Blood_Culture_Report.pdf', category: 'Microbiology', size: '320 KB', status: 'Ready for analysis' },
    { name: 'Patient_History.pdf', category: 'Patient history', size: '210 KB', status: 'Ready for analysis' },
    { name: 'Renal_Function.pdf', category: 'Laboratory reports', size: '145 KB', status: 'Ready for analysis' },
    { name: 'Allergy_History.pdf', category: 'Medication & allergy history', size: '95 KB', status: 'Ready for analysis' }
  ]);

  const categories = [
    {
      title: 'Patient history',
      sub: 'Upload history / medical record',
      formats: 'PDF, JPG, PNG'
    },
    {
      title: 'Microbiology',
      sub: 'Upload blood culture report, AST report',
      formats: 'PDF, JPG, PNG'
    },
    {
      title: 'Laboratory reports',
      sub: 'Upload CBC, renal function, liver function',
      formats: 'PDF, JPG, PNG'
    },
    {
      title: 'Medication & allergy history',
      sub: 'Upload medication chart, allergy history',
      formats: 'PDF, JPG, PNG'
    },
    {
      title: 'Additional clinical information',
      sub: 'Upload discharge summary, previous prescription',
      formats: 'PDF, JPG, PNG'
    }
  ];

  const handleFileUpload = (categoryTitle) => {
    // Simulated upload of clinical file in category
    const simulatedFile = {
      name: `${categoryTitle.replace(/\s+/g, '_')}_Document.pdf`,
      category: categoryTitle,
      size: '185 KB',
      status: 'Ready for analysis'
    };
    setAttachedFiles(prev => [...prev, simulatedFile]);
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const loadPreset = (presetKey) => {
    if (presetKey === 'pt1042') {
      setPatientId('PT-1042');
      setAge('62');
      setSex('Male');
      setWard('Medicine / ICU Bed 08');
      setAttachedFiles([
        { name: 'Blood_Culture_Report.pdf', category: 'Microbiology', size: '320 KB', status: 'Ready for analysis' },
        { name: 'Patient_History.pdf', category: 'Patient history', size: '210 KB', status: 'Ready for analysis' },
        { name: 'Renal_Function.pdf', category: 'Laboratory reports', size: '145 KB', status: 'Ready for analysis' },
        { name: 'Allergy_History.pdf', category: 'Medication & allergy history', size: '95 KB', status: 'Ready for analysis' }
      ]);
    } else if (presetKey === 'pt1039') {
      setPatientId('PT-1039');
      setAge('54');
      setSex('Female');
      setWard('Ward 3 (General)');
      setAttachedFiles([
        { name: 'Urine_Culture_Report.pdf', category: 'Microbiology', size: '280 KB', status: 'Ready for analysis' },
        { name: 'Medication_Chart_Ongoing.pdf', category: 'Medication & allergy history', size: '190 KB', status: 'Ready for analysis' },
        { name: 'Allergy_Intake_Summary.pdf', category: 'Medication & allergy history', size: '110 KB', status: 'Ready for analysis' }
      ]);
    } else if (presetKey === 'pt1035') {
      setPatientId('PT-1035');
      setAge('70');
      setSex('Male');
      setWard('Surgical Ward 2');
      setAttachedFiles([
        { name: 'Surgical_Progress_Note.pdf', category: 'Patient history', size: '240 KB', status: 'Ready for analysis' },
        { name: 'Ward_Medication_Chart.pdf', category: 'Medication & allergy history', size: '205 KB', status: 'Ready for analysis' },
        { name: 'ER_Admission_Allergy_Record.pdf', category: 'Medication & allergy history', size: '130 KB', status: 'Ready for analysis' }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze({
      patient_alias: patientId,
      age,
      sex,
      ward,
      infection_site: patientId === 'PT-1042' ? 'Bloodstream (Bacteremia)' : patientId === 'PT-1039' ? 'Urinary tract' : 'Surgical site',
      user_role: 'Hospital Pharmacist',
      language,
      files: attachedFiles
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4 text-left">
      
      {/* Back button and Header */}
      <div className="space-y-3">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reviews</span>
        </button>

        <div className="border-b border-slate-200 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Start a patient review
          </h1>
          <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed max-w-2xl">
            Upload the clinical information available for this patient. DIYA will organize the evidence and prepare a decision-support review.
          </p>
        </div>
      </div>

      {/* Preset Quick Load Bar */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
          Clinical Benchmark Presets:
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadPreset('pt1042')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              patientId === 'PT-1042'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            PT-1042: Blood Culture Bacteremia
          </button>
          <button
            type="button"
            onClick={() => loadPreset('pt1039')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              patientId === 'PT-1039'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            PT-1039: Complicated UTI (Data Gaps)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('pt1035')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              patientId === 'PT-1035'
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            PT-1035: Surgical Site Discrepancy
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Patient Identifiers Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Patient identifier
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Patient ID / Hospital ID
              </label>
              <input
                type="text"
                required
                value={patientId}
                onChange={(e) => setPatientId(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                placeholder="e.g. PT-1042"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Age
              </label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                placeholder="e.g. 62"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Sex
              </label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all cursor-pointer"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Ward / Department
              </label>
              <input
                type="text"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all"
                placeholder="e.g. Medicine / ICU Bed 08"
              />
            </div>
          </div>
        </div>

        {/* Clinical Information Upload Section */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Clinical information
            </h2>
            <p className="text-xs text-slate-500 font-normal mt-0.5">
              Upload the available patient records. DIYA will extract and connect the relevant information.
            </p>
          </div>

          {/* 5 Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3"
              >
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-normal leading-snug">
                    {cat.sub}
                  </p>
                  <span className="inline-block text-[10px] font-mono text-slate-400">
                    Supported: {cat.formats}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleFileUpload(cat.title)}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 rounded-xl border border-slate-200 hover:border-emerald-300 text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Attach {cat.title}</span>
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Attached Records Summary */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Attached Clinical Documents ({attachedFiles.length})
            </h3>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Gemini Multimodal Parsing
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {attachedFiles.map((file, i) => (
              <div key={i} className="py-3 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
                    <FileCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 font-mono text-xs">{file.name}</p>
                    <p className="text-[11px] text-slate-400">{file.category} · {file.size}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50/80 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    ✓ {file.status}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(i)}
                    className="text-slate-400 hover:text-rose-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button: Analyze Patient */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-slate-500 font-normal">
            DIYA connects patient records to antimicrobial guidelines without prescribing autonomously.
          </p>

          <button
            type="submit"
            disabled={isAnalyzing || attachedFiles.length === 0}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            <span>Analyze Patient</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
