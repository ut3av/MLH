import React from 'react';
import { Plus, ArrowRight, Clock, ShieldCheck, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function MainDashboard({ 
  onStartNewReview, 
  onSelectCase, 
  language = 'English' 
}) {
  const isHindi = language === 'Hindi';

  const recentReviews = [
    {
      id: 'demo1',
      patientId: 'PT-1042',
      caseName: 'Blood culture',
      organism: 'Escherichia coli bacteremia',
      ward: 'ICU Bed 08',
      status: 'Review',
      updated: '2 min ago',
      priority: 'high'
    },
    {
      id: 'demo2',
      patientId: 'PT-1039',
      caseName: 'UTI',
      organism: 'Complicated UTI (Duration review)',
      ward: 'Ward 3',
      status: 'Completed',
      updated: '24 min ago',
      priority: 'normal'
    },
    {
      id: 'demo3',
      patientId: 'PT-1035',
      caseName: 'Sepsis',
      organism: 'Post-operative abdominal infection',
      ward: 'Surgery',
      status: 'Review',
      updated: '1 hr ago',
      priority: 'high'
    }
  ];

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
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          Clinical reviews
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
            <p className="text-3xl font-bold font-mono text-slate-900">12</p>
            <p className="text-xs font-medium text-slate-500">Active reviews</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-amber-200 shadow-xs space-y-1 bg-amber-50/20">
            <p className="text-3xl font-bold font-mono text-amber-700">4</p>
            <p className="text-xs font-medium text-amber-800">Awaiting review</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-emerald-200 shadow-xs space-y-1 bg-emerald-50/20">
            <p className="text-3xl font-bold font-mono text-emerald-700">8</p>
            <p className="text-xs font-medium text-emerald-800">Completed</p>
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
                <th className="py-3 px-4">Case</th>
                <th className="py-3 px-4">Ward</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Updated</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentReviews.map((item) => (
                <tr 
                  key={item.id}
                  onClick={() => onSelectCase(item.id)}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                    {item.patientId}
                  </td>
                  <td className="py-3.5 px-4">
                    <p className="font-semibold text-slate-800">{item.caseName}</p>
                    <p className="text-[11px] text-slate-400 font-normal">{item.organism}</p>
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 font-medium">
                    {item.ward}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${
                      item.status === 'Review'
                        ? 'bg-amber-50 text-amber-800 border-amber-200'
                        : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {item.updated}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-emerald-700 group-hover:text-emerald-800">
                    <span className="inline-flex items-center space-x-1">
                      <span>Open Review</span>
                      <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </td>
                </tr>
              ))}
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
