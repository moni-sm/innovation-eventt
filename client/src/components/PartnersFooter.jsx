import React from 'react';
import FadeIn from './FadeIn';

export default function PartnersFooter({ partners, branding }) {
  return (
    <footer className="relative bg-[#0c101d] text-white border-t border-slate-800/80 pt-10 pb-12 overflow-hidden">
      {/* Dynamic Angled Red Wing Accent matching the flyer */}
      <div
        className="absolute top-0 right-0 h-full w-28 sm:w-40 md:w-56 bg-gradient-to-l from-red-600/90 to-brand-red pointer-events-none opacity-85 hidden sm:block"
        style={{ clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 0% 100%)' }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Partners Strip */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-between gap-8 lg:gap-8 pb-10 border-b border-slate-800/90">
          
          {/* Left: Our Event Partner SolidCAM (CONSTANT / STATIC) */}
          <div className="flex flex-col items-center lg:items-start gap-2.5 flex-shrink-0 z-10">
            <span className="text-xs sm:text-[13px] font-semibold tracking-wide text-slate-200">
              Our Event Partner
            </span>
            
            {/* Prominent Sized-up SolidCAM Logo with Red Badge styling matching the flyer */}
            <div className="flex items-center group transition-transform duration-200 hover:scale-[1.02]">
              <div className="relative flex items-center bg-[#e51924] hover:bg-[#d61722] transition-colors rounded-md pl-2 pr-3 sm:pr-4 py-1.5 sm:py-2 shadow-lg shadow-red-950/40">
                <img
                  src="/Logos/SOLIDCAM White Logo-01.png"
                  alt="SolidCAM - The Leaders in Integrated CAM"
                  className="h-12 sm:h-14 md:h-16 w-auto max-w-[240px] sm:max-w-[280px] object-contain drop-shadow"
                />
              </div>
            </div>
          </div>

          {/* Vertical Divider separating constant SolidCAM from marquee */}
          <div className="hidden lg:block w-px h-16 bg-slate-700/80 mx-2 lg:mx-4 flex-shrink-0 self-center"></div>

          {/* Right: Infinite Marquee for Ecosystem Logos */}
          <div className="flex-1 w-full min-w-0 overflow-hidden relative py-2">
            
            {/* Edge Fade Gradients */}
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-r from-[#0c101d] to-transparent z-10 pointer-events-none hidden sm:block"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-14 bg-gradient-to-l from-[#0c101d] to-transparent z-10 pointer-events-none hidden sm:block"></div>

            {/* Marquee Track (Double set of logos for seamless infinite loop) */}
            <div className="animate-marquee flex items-center gap-8 sm:gap-12 lg:gap-14 text-slate-300">
              
              {/* === Set 1 === */}
              <div className="flex items-center gap-8 sm:gap-12 lg:gap-14 flex-shrink-0">
                {/* 1. 3DS SOLIDWORKS */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/solidworks-logo.png"
                    alt="3DS SOLIDWORKS"
                    className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                  />
                </div>

                {/* 2. 3DEXPERIENCE */}
                <div className="flex items-center gap-2 hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/3DEXPERIENCE circle logo.png"
                    alt="3DEXPERIENCE Compass"
                    className="h-9 sm:h-10 md:h-11 w-auto object-contain flex-shrink-0"
                  />
                  <img
                    src="/Logos/3DEXPERIENCE Logo.png"
                    alt="3DEXPERIENCE"
                    className="h-4 sm:h-5 md:h-5.5 w-auto object-contain"
                  />
                </div>

                {/* 3. SIMULIA Abaqus */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/Simulia Abaqus logo.png"
                    alt="3DS SIMULIA"
                    className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                  />
                </div>

                {/* 5. SOLIDWORKS PDM */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/SOLIDWORKS PDM Logo.png"
                    alt="SOLIDWORKS PDM"
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                  />
                </div> 

                {/* 4. CST Studio Suite */}
                <div className="flex items-center ">
                  <img
                    src="/Logos/JB_CST-Studio_LOGO.png"
                    alt="CST STUDIO SUITE"
                    className="h-9 sm:h-8 md:h-9 w-auto  "
                  />
                </div>

                

                {/* 6. SOLIDWORKS Plastics */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/SOLIDWORKS Plastics.png"
                    alt="SOLIDWORKS Plastics"
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                  />
                </div>

                {/* 7. DriveWorks */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/DriveWorks Logo-02.png"
                    alt="DriveWorks"
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                  />
                </div>

                {/* 8. BOM Creator */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/BOM-Creator.png"
                    alt="BOM Creator"
                    className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                  />
                </div>
              </div>

              {/* === Set 2 (Duplicate for seamless infinite marquee loop) === */}
              <div className="flex items-center gap-8 sm:gap-12 lg:gap-14 flex-shrink-0" aria-hidden="true">
                {/* 1. 3DS SOLIDWORKS */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/solidworks-logo.png"
                    alt="3DS SOLIDWORKS"
                    className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                  />
                </div>

                {/* 2. 3DEXPERIENCE */}
                <div className="flex items-center gap-2 hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/3DEXPERIENCE circle logo.png"
                    alt="3DEXPERIENCE Compass"
                    className="h-9 sm:h-10 md:h-11 w-auto object-contain flex-shrink-0"
                  />
                  <img
                    src="/Logos/3DEXPERIENCE Logo.png"
                    alt="3DEXPERIENCE"
                    className="h-4 sm:h-5 md:h-5.5 w-auto object-contain"
                  />
                </div>

                {/* 3. SIMULIA Abaqus */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/Simulia Abaqus logo.png"
                    alt="3DS SIMULIA"
                    className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                  />
                </div>

                {/* 4. CST Studio Suite */}
                <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/JB_CST-Studio_LOGO.png"
                    alt="CST STUDIO SUITE"
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert opacity-95 hover:opacity-100"
                  />
                </div>

                {/* 5. SOLIDWORKS PDM */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/SOLIDWORKS PDM Logo.png"
                    alt="SOLIDWORKS PDM"
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                  />
                </div> 

                {/* 6. SOLIDWORKS Plastics */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/SOLIDWORKS Plastics.png"
                    alt="SOLIDWORKS Plastics"
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                  />
                </div>

                {/* 7. DriveWorks */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/DriveWorks Logo-02.png"
                    alt="DriveWorks"
                    className="h-7 sm:h-8 md:h-9 w-auto object-contain"
                  />
                </div>

                {/* 8. BOM Creator */}
                <div className="flex items-center hover:text-white transition-all duration-200 hover:scale-105 flex-shrink-0">
                  <img
                    src="/Logos/BOM-Creator.png"
                    alt="BOM Creator"
                    className="h-8 sm:h-9 md:h-10 w-auto object-contain"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

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
