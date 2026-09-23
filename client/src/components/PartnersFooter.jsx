import React from 'react';
import FadeIn from './FadeIn';

export default function PartnersFooter({ partners, branding }) {
  return (
    <footer className="bg-[#0b101d] text-white border-t border-slate-800/80 pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Partners Strip */}
        <FadeIn direction="up">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800">
            
            {/* Left: Our Event Partner SolidCAM */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Our Event Partner
              </span>
              <div className="flex items-center gap-3 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-700/60 shadow-inner">
                {/* SolidCAM Red & Gold Emblem */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 via-amber-600 to-red-600 flex items-center justify-center shadow-md flex-shrink-0">
                  <span className="text-slate-950 font-black text-xs">SC</span>
                </div>
                <div>
                  <div className="text-lg font-black tracking-tight text-white flex items-center">
                    <span className="text-brand-red">Solid</span>CAM
                  </div>
                  <div className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    The Leaders in Integrated CAM
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Ecosystem Brands */}
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-slate-300">
              
              {/* 3DS SOLIDWORKS */}
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-brand-red font-black text-base">3DS</span>
                <span className="font-bold text-sm tracking-wide">SOLIDWORKS</span>
              </div>

              {/* 3DEXPERIENCE */}
              <div className="flex items-center gap-1.5 hover:text-white transition-colors">
                <div className="w-5 h-5 rounded-full border-2 border-sky-400 flex items-center justify-center text-[10px] text-sky-400 font-bold">
                  &#9654;
                </div>
                <span className="font-extrabold text-sm tracking-wide text-sky-400">3D</span>
                <span className="font-bold text-sm tracking-wider">EXPERIENCE</span>
              </div>

              {/* SIMULIA */}
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <span className="text-brand-red font-black text-base">3DS</span>
                <span className="font-bold text-sm tracking-wide">SIMULIA</span>
              </div>

              {/* DraftSight */}
              <div className="flex items-center gap-2 hover:text-white transition-colors">
                <div className="w-4 h-4 bg-emerald-500 rounded flex items-center justify-center text-[9px] font-bold text-slate-950">
                  DS
                </div>
                <span className="font-bold text-sm tracking-wide text-emerald-400">DraftSight</span>
              </div>

            </div>

          </div>
        </FadeIn>

        {/* Bottom Credits & Copyright */}
        <FadeIn direction="up" delay={150}>
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <div>
              © 2026 {branding?.companyName || 'Conceptia KONNECT'}. All rights reserved. Authorized Reseller for Dassault Systèmes SOLIDWORKS.
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Terms of Registration</span>
              <span>•</span>
              <span className="hover:text-slate-400 cursor-pointer">Contact Event Support</span>
            </div>
          </div>
        </FadeIn>

      </div>
    </footer>
  );
}
