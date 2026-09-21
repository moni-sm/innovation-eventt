import React from 'react';
import { Sparkles, MonitorPlay, Users2, Award, CheckCircle2 } from 'lucide-react';

export default function HighlightsSection({ highlights }) {
  const getHighlightIcon = (index, iconType) => {
    switch (index) {
      case 0:
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-red to-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform">
            <Sparkles className="w-8 h-8" />
          </div>
        );
      case 1:
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0b1b3d] to-[#1e3a8a] text-white flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
            <MonitorPlay className="w-8 h-8" />
          </div>
        );
      case 2:
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-brand-red to-red-500 text-white flex items-center justify-center shadow-lg shadow-red-500/25 group-hover:scale-110 transition-transform">
            <Users2 className="w-8 h-8" />
          </div>
        );
      case 3:
      default:
        return (
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#0b1b3d] to-[#1e3a8a] text-white flex items-center justify-center shadow-lg shadow-blue-900/20 group-hover:scale-110 transition-transform">
            <Award className="w-8 h-8" />
          </div>
        );
    }
  };

  return (
    <div id="highlights" className="space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-1 bg-brand-red rounded-full"></span>
          <span className="text-xs font-black uppercase tracking-widest text-brand-red">
            WHY ATTEND
          </span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Key Highlights
        </h2>
      </div>

      {/* 4 Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-4">
        {highlights && highlights.map((hl, idx) => (
          <div
            key={hl.id || idx}
            className="group flex flex-col items-center text-center p-4 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all"
          >
            {getHighlightIcon(idx, hl.icon)}
            
            <h4 className="font-extrabold text-sm text-slate-800 mt-4 leading-snug">
              {hl.title}
            </h4>
            {hl.description && (
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                {hl.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
