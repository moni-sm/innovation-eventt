import React from 'react';

export default function SpeakersSection({ speakers }) {
  return (
    <div id="speakers" className="space-y-6">
      {/* Section Header */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="w-6 h-1 bg-brand-red rounded-full"></span>
          <span className="text-xs font-black uppercase tracking-widest text-brand-red">
            SPEAKERS
          </span>
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">
          Industry Experts. Real Insights.
        </h2>
        <p className="text-slate-500 text-sm mt-1">
          Gain valuable perspectives from SOLIDWORKS experts and industry leaders.
        </p>
      </div>

      {/* Speaker Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-2">
        {speakers && speakers.map((speaker, idx) => (
          <div
            key={speaker.id || idx}
            className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300"
          >
            {/* Speaker Image Container */}
            <div className="relative aspect-[4/4.5] overflow-hidden bg-slate-100">
              <img
                src={speaker.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'}
                alt={speaker.name}
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>

            {/* Info & Red Accent */}
            <div className="p-4 flex flex-col items-center text-center flex-1 justify-between">
              <div>
                <h4 className="font-extrabold text-base text-slate-900 tracking-tight group-hover:text-brand-red transition-colors">
                  {speaker.name}
                </h4>
                <p className="text-xs font-medium text-slate-500 mt-1 line-clamp-2">
                  {speaker.designation}
                </p>
              </div>

              {/* Red Accent Dash under designation */}
              <div className="w-8 h-1 bg-brand-red rounded-full mt-3 mx-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
