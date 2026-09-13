import React, { useState } from 'react';
import { ChevronRight, ArrowUpRight, Check, AlertCircle } from 'lucide-react';
import FlagDetailSheet from './FlagDetailSheet';

const API_BASE = 'http://localhost:8000';

export default function ReviewFlagsDashboard({ 
  flags, 
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
    setFlags(flags.map(f => f.id === id ? { ...f, status } : f));
    if (selectedFlag && selectedFlag.id === id) {
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
        <h2 className="text-2xl sm:text-3xl font-light text-white tracking-tight">
          What deserves attention
        </h2>
        <p className="text-xs text-sage-300/80 font-light max-w-xl">
          DIYA identified information that may require pharmacist or clinician review.
        </p>
      </div>

      {/* Vertical List with Generous Whitespace */}
      <div className="space-y-4 pt-2">
        {flags.map((flag, idx) => {
          const num = String(idx + 1).padStart(2, '0');
          const isHigh = flag.priority === 'high';
          const isAttention = flag.type?.includes('gap') || flag.type?.includes('allergy') || flag.type?.includes('clarification');
          const isReviewed = flag.status === 'reviewed';

          const badgeLabel = isHigh ? 'HIGH' : isAttention ? 'ATTENTION' : 'REVIEW';
          const badgeStyle = isHigh 
            ? 'text-rose-400 border-rose-500/30 bg-rose-950/40'
            : isAttention 
              ? 'text-amber-400 border-amber-500/30 bg-amber-950/40'
              : 'text-emerald-400 border-emerald-500/30 bg-emerald-950/40';

          const rationaleText = (isHindi && flag.rationale_hi) ? flag.rationale_hi : flag.rationale;

          // Simplify title display for the Apple aesthetic
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
              key={flag.id || idx}
              onClick={() => handleOpenFlag(flag)}
              className="rounded-3xl glass-surface p-7 sm:p-8 border border-white/8 hover:border-emerald-500/30 transition-all duration-300 cursor-pointer group shadow-glass relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
            >
              {/* Left Column: Number + Content */}
              <div className="flex items-start space-x-6">
                <span className="text-2xl font-light font-mono text-sage-500 group-hover:text-emerald-400/80 transition-colors shrink-0">
                  {num}
                </span>

                <div className="space-y-1.5 max-w-xl">
                  <div className="flex items-center space-x-3">
                    <h3 className="text-base sm:text-lg font-normal text-white group-hover:text-emerald-200 transition-colors">
                      {cleanTitle}
                    </h3>
                  </div>

                  <p className="text-xs font-mono uppercase tracking-wider text-sage-400/90">
                    {statusSubtitle}
                  </p>

                  <p className="text-xs text-sage-300/80 font-light leading-relaxed pt-1">
                    {rationaleText}
                  </p>
                </div>
              </div>

              {/* Right Column: Priority Badge + Arrow */}
              <div className="flex items-center space-x-4 shrink-0 sm:self-center self-end">
                {flag.status && flag.status !== 'open' && (
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sage-400 border border-white/10 px-2 py-0.5 rounded-full">
                    {flag.status.replace('_', ' ')}
                  </span>
                )}

                <span className={`text-[10px] font-mono tracking-widest px-3 py-1 rounded-full border uppercase ${badgeStyle}`}>
                  {badgeLabel}
                </span>

                <div className="w-8 h-8 rounded-full bg-white/5 group-hover:bg-white/10 flex items-center justify-center text-sage-400 group-hover:text-white transition-all">
                  <ChevronRight className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Side Sheet for Detailed Review */}
      <FlagDetailSheet
        flag={selectedFlag}
        isOpen={isSheetOpen}
        onClose={handleCloseSheet}
        onUpdateStatus={handleStatusChange}
        language={language}
        onOpenDocumentViewer={onOpenDocumentViewer}
      />
    </div>
  );
}
