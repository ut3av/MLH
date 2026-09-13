import React from 'react';
import { AlertCircle, Pill, Microchip, FileWarning } from 'lucide-react';

export default function PatientSummaryPanel({ analysisData }) {
  if (!analysisData) return null;

  const { current_antimicrobials, microbiology, allergies, renal_hepatic_data, missing_information } = analysisData;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200 h-full overflow-y-auto max-h-[800px]">
      <div className="space-y-6">
        
        {/* Missing Info Alert */}
        {missing_information && missing_information.length > 0 && (
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
            <h3 className="text-sm font-semibold text-amber-800 flex items-center mb-2 uppercase tracking-wider">
              <FileWarning className="h-4 w-4 mr-2" /> Missing Information
            </h3>
            <ul className="space-y-1">
              {missing_information.map((m, i) => (
                <li key={i} className="text-sm text-amber-700 list-disc ml-5">
                   <span className="font-semibold">{m.field}:</span> {m.message}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Current Antimicrobials */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 flex items-center mb-3 uppercase tracking-wider">
            <Pill className="h-4 w-4 mr-2 text-indigo-500" /> Current Antimicrobials
          </h3>
          {current_antimicrobials.length > 0 ? (
            <ul className="space-y-3">
              {current_antimicrobials.map((abx, i) => (
                <li key={i} className="text-sm bg-indigo-50 text-indigo-900 p-3 rounded border border-indigo-100">
                  <div className="font-bold text-base mb-1">{abx.generic_name || abx.original_document_text}</div>
                  <div className="grid grid-cols-2 gap-2 text-xs opacity-90 mt-2">
                    <div><strong>Dose:</strong> {abx.documented_dose || 'Not doc'}</div>
                    <div><strong>Route:</strong> {abx.route || 'Not doc'}</div>
                    <div><strong>Freq:</strong> {abx.frequency || 'Not doc'}</div>
                    <div><strong>Start:</strong> {abx.start_date || 'Not doc'}</div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-slate-500 italic">None documented</p>
          )}
        </div>

        {/* Microbiology */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 flex items-center mb-3 uppercase tracking-wider">
            <Microchip className="h-4 w-4 mr-2 text-emerald-500" /> Microbiology
          </h3>
          {microbiology.length > 0 ? (
            <div className="space-y-4">
              {microbiology.map((culture, i) => (
                <div key={i} className="text-sm border border-slate-200 rounded p-3 bg-slate-50">
                  <p className="font-bold text-slate-800 mb-1">{culture.specimen_type} Culture ({culture.specimen_collection_date})</p>
                  <p className="text-emerald-700 font-semibold mb-2">{culture.organism} {culture.organism_count_or_burden}</p>
                  
                  {culture.susceptibility_results && culture.susceptibility_results.length > 0 && (
                    <table className="w-full text-left mt-2 border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200">
                          <th className="py-1">Antibiotic</th>
                          <th className="py-1">Interpretation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {culture.susceptibility_results.map((ast, j) => (
                          <tr key={j} className="border-b border-slate-100 last:border-0">
                            <td className="py-1">{ast.antibiotic_original_text}</td>
                            <td className="py-1 font-semibold">
                              <span className={
                                ast.interpretation === 'S' ? 'text-emerald-600' :
                                ast.interpretation === 'R' ? 'text-rose-600' : 'text-amber-600'
                              }>{ast.interpretation}</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              ))}
            </div>
          ) : (
             <p className="text-sm text-slate-500 italic">None documented</p>
          )}
        </div>

        {/* Allergies & Labs */}
        <div>
          <h3 className="text-sm font-semibold text-slate-700 flex items-center mb-3 uppercase tracking-wider">
            <AlertCircle className="h-4 w-4 mr-2 text-rose-500" /> Allergies & Organ Function
          </h3>
          <ul className="space-y-2">
            {allergies.map((a, i) => (
              <li key={`a-${i}`} className="text-sm bg-rose-50 text-rose-900 p-2 rounded border border-rose-100 flex justify-between items-center">
                <span><strong>{a.field}:</strong> {a.value}</span>
                <span className="text-xs uppercase bg-rose-200 px-1 rounded">{a.status}</span>
              </li>
            ))}
            {renal_hepatic_data.map((l, i) => (
              <li key={`l-${i}`} className="text-sm bg-slate-50 text-slate-700 p-2 rounded border border-slate-200 flex flex-col">
                <div className="flex justify-between items-center mb-1">
                   <span className="font-semibold">{l.field}</span>
                   <span className="text-xs uppercase bg-slate-200 px-1 rounded">{l.status}</span>
                </div>
                <span>{l.evidence_text}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}
