import React, { useState } from 'react';
import { ChevronRight, ShieldAlert } from 'lucide-react';
import FlagDetailSheet from './FlagDetailSheet';

const API_BASE = 'http://localhost:8000';

export default function ReviewFlagsDashboard({ 
  flags = [], 
  setFlags, 
  language = 'English',
  onOpenDocumentViewer 
}) {
  const [selectedFlag, setSelectedFlag] = useState(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const isHindi = language === 'Hindi';

  if (!flags || flags.length === 0) return null;

  const handleOpenFlag = (flag) => {
    setSelectedFlag(flag);
    setIsSheetOpen(true);
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };

  const handleStatusChange = async (id, status) => {
    // Optimistic update
    if (setFlags) {
      setFlags(flags.map(f => (f.id === id || f.flag_id === id) ? { ...f, status } : f));
    }
    if (selectedFlag && (selectedFlag.id === id || selectedFlag.flag_id === id)) {
      setSelectedFlag(prev => ({ ...prev, status }));
    }

    try {
      await fetch(`${API_BASE}/api/reviews/${id}/status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, note: `Status updated by user to ${status}` })
      });
    } catch (err) {
      console.warn('Backend status update failed, state preserved locally:', err);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Section Header */}
      <div className="space-y-1">
        <h2 className="text-xl font-semibold text-slate-900 flex items-center space-x-2">
          <ShieldAlert className="w-5 h-5 text-amber-600" />
          <span>Clinical Review Flags</span>
        </h2>
        <p className="text-xs text-slate-500 font-normal">
          DIYA identified information that may require pharmacist or clinician review before therapy continuation.
        </p>
      </div>

      {/* Vertical List */}
      <div className="space-y-3 pt-1">
        {flags.map((flag, idx) => {
          const flagId = flag.id || flag.flag_id || idx;
          const num = String(idx + 1).padStart(2, '0');
          const isHigh = flag.priority === 'high';
          const isAttention = flag.type?.includes('gap') || flag.type?.includes('allergy') || flag.type?.includes('clarification');

          const badgeLabel = isHigh ? 'HIGH' : isAttention ? 'ATTENTION' : 'REVIEW';
          const badgeStyle = isHigh 
            ? 'text-rose-700 border-rose-300 bg-rose-50'
            : isAttention 
              ? 'text-amber-700 border-amber-300 bg-amber-50'
              : 'text-emerald-700 border-emerald-300 bg-emerald-50';

          const rationaleText = (isHindi && flag.rationale_hi) ? flag.rationale_hi : (flag.rationale || flag.description);

          const rawTitle = flag.title || flag.rationale || 'Stewardship Review';
          const cleanTitle = String(rawTitle)
            .replace(' requires review', '')
            .replace(' is unverified (UNKNOWN vs NEGATIVE)', '')
            .replace(' recency (>48 hours) exceeded', '');

          const statusSubtitle = isHigh 
            ? 'Review required' 
            : isAttention 
              ? 'Incomplete information' 
              : 'Confirmation required';

          return (
            <div
              key={flagId}
              onClick={() => handleOpenFlag(flag)}
              className="rounded-xl bg-white p-5 border border-slate-200 hover:border-emerald-300 hover:shadow-xs transition-all cursor-pointer group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
            >
              {/* Left Column: Number + Content */}
              <div className="flex items-start space-x-4">
                <span className="text-lg font-bold font-mono text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0">
                  {num}
                </span>

                <div className="space-y-1 max-w-xl">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-800 transition-colors">
                      {cleanTitle}
                    </h3>
                  </div>

                  <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    {statusSubtitle}
                  </p>

                  <p className="text-xs text-slate-600 font-normal leading-relaxed pt-0.5">
                    {rationaleText}
                  </p>
                </div>
              </div>

              {/* Right Column: Priority Badge + Arrow */}
              <div className="flex items-center space-x-3 shrink-0 sm:self-center self-end">
                {flag.status && flag.status !== 'open' && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 border border-slate-200 px-2 py-0.5 rounded-full bg-slate-50">
                    {flag.status.replace('_', ' ')}
                  </span>
                )}

                <span className={`text-[10px] font-mono font-bold tracking-widest px-2.5 py-0.5 rounded-full border uppercase ${badgeStyle}`}>
                  {badgeLabel}
                </span>

                <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-emerald-50 flex items-center justify-center text-slate-400 group-hover:text-emerald-700 transition-all">
                  <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Sheet for Detailed Review */}
      {selectedFlag && (
        <FlagDetailSheet
          flag={selectedFlag}
          isOpen={isSheetOpen}
          onClose={handleCloseSheet}
          onUpdateStatus={handleStatusChange}
          language={language}
          onOpenDocumentViewer={onOpenDocumentViewer}
        />
      )}
    </div>
  );
}
