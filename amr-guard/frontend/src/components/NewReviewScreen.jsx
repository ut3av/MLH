import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, UploadCloud, FileText, CheckCircle2, 
  X, Plus, FileCheck, RotateCcw, FolderOpen
} from 'lucide-react';

export default function NewReviewScreen({ 
  onAnalyze, 
  isAnalyzing, 
  onBack,
  language = 'English' 
}) {
  const isHindi = language === 'Hindi';
  const fileInputRef = useRef(null);
  const [activeUploadCategory, setActiveUploadCategory] = useState('Microbiology');

  // Patient Identifiers: Fresh and clean by default
  const [patientId, setPatientId] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('Male');
  const [ward, setWard] = useState('');

  // Attached files list: Starts empty for real clinical uploads
  const [attachedFiles, setAttachedFiles] = useState([]);

  const categories = [
    {
      title: 'Microbiology',
      sub: 'Blood culture report, AST panel, Gram stain',
      formats: 'PDF, JPG, PNG'
    },
    {
      title: 'Patient History',
      sub: 'Admission note, clinical summary, comorbidities',
      formats: 'PDF, JPG, PNG'
    },
    {
      title: 'Laboratory Reports',
      sub: 'Serum creatinine, eGFR, liver enzymes, CBC',
      formats: 'PDF, JPG, PNG'
    },
    {
      title: 'Medication & Allergy Chart',
      sub: 'Current antibiotics, dose timings, allergy notes',
      formats: 'PDF, JPG, PNG'
    },
    {
      title: 'Clinical Progress Notes',
      sub: 'Vital trends, ICU nursing observations',
      formats: 'PDF, JPG, PNG'
    }
  ];

  // Handle native file input selection
  const handleNativeFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newEntries = files.map(file => ({
      name: file.name,
      category: activeUploadCategory,
      size: `${(file.size / 1024).toFixed(0)} KB`,
      status: 'Ready for analysis'
    }));

    setAttachedFiles(prev => [...prev, ...newEntries]);
    // reset file input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const triggerFileUpload = (categoryTitle) => {
    setActiveUploadCategory(categoryTitle);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeFile = (index) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleResetForm = () => {
    setPatientId('');
    setAge('');
    setSex('Male');
    setWard('');
    setAttachedFiles([]);
  };

  const loadPreset = (presetKey) => {
    if (presetKey === 'pt1042') {
      setPatientId('PT-1042');
      setAge('62');
      setSex('Male');
      setWard('Medicine / ICU Bed 08');
      setAttachedFiles([
        { name: 'Blood_Culture_Report.pdf', category: 'Microbiology', size: '320 KB', status: 'Ready for analysis' },
        { name: 'Patient_History.pdf', category: 'Patient History', size: '210 KB', status: 'Ready for analysis' },
        { name: 'Renal_Function.pdf', category: 'Laboratory Reports', size: '145 KB', status: 'Ready for analysis' },
        { name: 'Allergy_History.pdf', category: 'Medication & Allergy Chart', size: '95 KB', status: 'Ready for analysis' }
      ]);
    } else if (presetKey === 'pt1039') {
      setPatientId('PT-1039');
      setAge('54');
      setSex('Female');
      setWard('Ward 3 (General)');
      setAttachedFiles([
        { name: 'Urine_Culture_Report.pdf', category: 'Microbiology', size: '280 KB', status: 'Ready for analysis' },
        { name: 'Medication_Chart_Ongoing.pdf', category: 'Medication & Allergy Chart', size: '190 KB', status: 'Ready for analysis' },
        { name: 'Allergy_Intake_Summary.pdf', category: 'Medication & Allergy Chart', size: '110 KB', status: 'Ready for analysis' }
      ]);
    } else if (presetKey === 'pt1035') {
      setPatientId('PT-1035');
      setAge('70');
      setSex('Male');
      setWard('Surgical Ward 2');
      setAttachedFiles([
        { name: 'Surgical_Progress_Note.pdf', category: 'Patient History', size: '240 KB', status: 'Ready for analysis' },
        { name: 'Ward_Medication_Chart.pdf', category: 'Medication & Allergy Chart', size: '205 KB', status: 'Ready for analysis' },
        { name: 'ER_Admission_Allergy_Record.pdf', category: 'Medication & Allergy Chart', size: '130 KB', status: 'Ready for analysis' }
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAnalyze({
      patient_alias: patientId.trim() || 'PT-NEW',
      age: age.trim() || '60',
      sex,
      ward: ward.trim() || 'Inpatient Ward',
      infection_site: patientId.includes('1039') ? 'Urinary tract' : patientId.includes('1035') ? 'Surgical site' : 'Bloodstream (Bacteremia)',
      user_role: 'Hospital Pharmacist',
      language,
      files: attachedFiles
    });
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto py-4 text-left">
      
      {/* Hidden real file input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleNativeFileChange} 
        multiple 
        accept=".pdf,.png,.jpg,.jpeg,.txt" 
        className="hidden" 
      />

      {/* Back button and Header */}
      <div className="space-y-3">
        <button
          onClick={onBack}
          className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Reviews</span>
        </button>

        <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {isHindi ? 'नया रोगी समीक्षा शुरू करें' : 'Start a patient review'}
            </h1>
            <p className="text-xs text-slate-500 font-normal mt-1 leading-relaxed max-w-2xl">
              Upload patient clinical documents (blood culture, AST report, renal labs, medication chart). DIYA organizes the evidence into an antimicrobial review brief.
            </p>
          </div>

          {(patientId || attachedFiles.length > 0) && (
            <button
              type="button"
              onClick={handleResetForm}
              className="text-xs text-slate-500 hover:text-slate-900 font-medium flex items-center space-x-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Form</span>
            </button>
          )}
        </div>
      </div>

      {/* Reference Clinical Case Quick Load Bar */}
      <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            Quick Reference Cases:
          </span>
          <span className="text-[10px] text-slate-400">Click to test instant workflow</span>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => loadPreset('pt1042')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              patientId === 'PT-1042'
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            PT-1042: Blood Culture Bacteremia
          </button>
          <button
            type="button"
            onClick={() => loadPreset('pt1039')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              patientId === 'PT-1039'
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
            }`}
          >
            PT-1039: Complicated UTI (Data Gaps)
          </button>
          <button
            type="button"
            onClick={() => loadPreset('pt1035')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
              patientId === 'PT-1035'
                ? 'bg-slate-900 text-white border-slate-900 shadow-2xs'
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
            Patient Identifiers
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all placeholder:text-slate-400 placeholder:font-normal"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all cursor-pointer"
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
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:bg-white transition-all placeholder:text-slate-400"
                placeholder="e.g. Medicine / ICU Bed 08"
              />
            </div>
          </div>
        </div>

        {/* Clinical Information Upload Categories */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-2 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Clinical Documents
              </h2>
              <p className="text-xs text-slate-500 font-normal mt-0.5">
                Attach available clinical records. DIYA will parse AST sensitivity, renal function, and allergy records.
              </p>
            </div>
            
            <button
              type="button"
              onClick={() => triggerFileUpload('Microbiology')}
              className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium border border-slate-200 transition-colors flex items-center space-x-1.5 cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-slate-500" />
              <span>Browse Local Files</span>
            </button>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categories.map((cat, idx) => (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
              >
                <div className="space-y-1">
                  <h3 className="text-xs font-bold text-slate-900">
                    {cat.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 font-normal leading-snug">
                    {cat.sub}
                  </p>
                  <span className="inline-block text-[10px] font-mono text-slate-400">
                    Formats: {cat.formats}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => triggerFileUpload(cat.title)}
                  className="w-full py-2 px-3 bg-slate-50 hover:bg-slate-100 text-slate-700 hover:text-slate-950 rounded-xl border border-slate-200 text-xs font-semibold transition-colors flex items-center justify-center space-x-1.5 cursor-pointer"
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
            <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Multimodal Ingestion Ready
            </span>
          </div>

          {attachedFiles.length === 0 ? (
            <div className="py-8 text-center border-2 border-dashed border-slate-200 rounded-xl space-y-2">
              <UploadCloud className="w-8 h-8 text-slate-400 mx-auto" />
              <p className="text-xs font-medium text-slate-700">No documents attached yet</p>
              <p className="text-[11px] text-slate-400 max-w-sm mx-auto">
                Click any category above to attach hospital documents, or load a quick reference case above.
              </p>
            </div>
          ) : (
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
                    <span className="text-[11px] font-medium text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                      {file.status}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                      title="Remove attachment"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Button: Analyze Patient */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <p className="text-xs text-slate-500 font-normal">
            DIYA cross-references clinical records against antimicrobial guidelines without prescribing autonomously.
          </p>

          <button
            type="submit"
            disabled={isAnalyzing || (!patientId && attachedFiles.length === 0)}
            className="w-full sm:w-auto px-7 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-sm hover:shadow transition-all flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <span>Run Antimicrobial Review</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </form>
    </div>
  );
}
