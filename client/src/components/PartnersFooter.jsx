import React from 'react';
import FadeIn from './FadeIn';
import { handleImageFallback } from '../utils/assetHelper';

function LogoImg({ src, alt, className }) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => handleImageFallback(e)}
      loading="lazy"
    />
  );
}

export default function PartnersFooter({ partners, branding }) {
  return (
    <div className="w-full">
      {/* 1. Brand & Event Partners Showcase (Separate Section on Clean White Background) */}
      <section className="bg-white border-t border-slate-200 py-10 sm:py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10">
            
            {/* Left: Our Event Partner SolidCAM (CONSTANT / STATIC) */}
            <div className="flex flex-col items-center lg:items-start gap-2.5 flex-shrink-0 z-10">
              <span className="text-xs sm:text-[13px] font-black uppercase tracking-wider text-[#004771]">
                Our Event Partner
              </span>
              
              {/* Prominent Sized-up SolidCAM Logo with Red Badge styling matching the flyer */}
              <div className="flex items-center group transition-transform duration-200 hover:scale-[1.02]">
                <div className="relative flex items-center bg-[#ef2722] hover:bg-[#d61722] transition-colors rounded-xl px-5 sm:px-6 py-3 sm:py-4 shadow-lg shadow-red-500/25">
                  <LogoImg
                    src="/Logos/SOLIDCAM White Logo-01.png"
                    alt="SolidCAM - The Leaders in Integrated CAM"
                    className="h-16 sm:h-20 md:h-24 w-auto max-w-[300px] sm:max-w-[360px] object-contain drop-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Vertical Divider separating constant SolidCAM from marquee */}
            <div className="hidden lg:block w-px h-24 bg-slate-200 mx-2 lg:mx-4 flex-shrink-0 self-center"></div>

            {/* Right: Infinite Marquee for Ecosystem Logos */}
            <div className="flex-1 w-full min-w-0 overflow-hidden relative py-2">
              
              {/* Edge Fade Gradients on White */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none hidden sm:block"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none hidden sm:block"></div>

              {/* Marquee Track (Double set of logos for seamless infinite loop) */}
              <div className="animate-marquee flex items-center gap-12 sm:gap-16 lg:gap-20">
                
                {/* === Set 1 === */}
                <div className="flex items-center gap-12 sm:gap-16 lg:gap-20 flex-shrink-0">
                  {/* 1. 3DS SOLIDWORKS */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/solidworks-logo.png"
                      alt="3DS SOLIDWORKS"
                      className="h-12 sm:h-14 md:h-18 w-auto object-contain"
                    />
                  </div>

                  {/* 2. 3DEXPERIENCE */}
                  <div className="flex items-center gap-3 transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/3DEXPERIENCE circle logo.png"
                      alt="3DEXPERIENCE Compass"
                      className="h-14 sm:h-16 md:h-20 w-auto object-contain flex-shrink-0"
                    />
                    <LogoImg
                      src="/Logos/3DEXPERIENCE Logo (2).png"
                      alt="3DEXPERIENCE"
                      className="h-7 sm:h-8 md:h-10 w-auto object-contain"
                    />
                  </div>

                  {/* 3. SIMULIA Abaqus */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/Simulia Abaqus logo.png"
                      alt="3DS SIMULIA"
                      className="h-13 sm:h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* 4. CST Studio Suite */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/JB_CST-Studio_LOGO.png"
                      alt="CST STUDIO SUITE"
                      className="h-13 sm:h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* 5. SOLIDWORKS PDM */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/SOLIDWORKS PDM Logo.png"
                      alt="SOLIDWORKS PDM"
                      className="h-11 sm:h-13 md:h-16 w-auto object-contain"
                    />
                  </div> 

                  {/* 6. SOLIDWORKS Plastics */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/SOLIDWORKS Plastics.png"
                      alt="SOLIDWORKS Plastics"
                      className="h-11 sm:h-13 md:h-16 w-auto object-contain"
                    />
                  </div>

                  {/* 7. DriveWorks */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/DriveWorks Logo-01.png"
                      alt="DriveWorks"
                      className="h-11 sm:h-13 md:h-16 w-auto object-contain"
                    />
                  </div>

                  {/* 8. BOM Creator */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/BOM-Creator.png"
                      alt="BOM Creator"
                      className="h-12 sm:h-14 md:h-18 w-auto object-contain"
                    />
                  </div>
                </div>

                {/* === Set 2 (Duplicate for seamless infinite marquee loop) === */}
                <div className="flex items-center gap-12 sm:gap-16 lg:gap-20 flex-shrink-0" aria-hidden="true">
                  {/* 1. 3DS SOLIDWORKS */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/solidworks-logo.png"
                      alt="3DS SOLIDWORKS"
                      className="h-12 sm:h-14 md:h-18 w-auto object-contain"
                    />
                  </div>

                  {/* 2. 3DEXPERIENCE */}
                  <div className="flex items-center gap-3 transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/3DEXPERIENCE circle logo.png"
                      alt="3DEXPERIENCE Compass"
                      className="h-14 sm:h-16 md:h-20 w-auto object-contain flex-shrink-0"
                    />
                    <LogoImg
                      src="/Logos/3DEXPERIENCE Logo (2).png"
                      alt="3DEXPERIENCE"
                      className="h-7 sm:h-8 md:h-10 w-auto object-contain"
                    />
                  </div>

                  {/* 3. SIMULIA Abaqus */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/Simulia Abaqus logo.png"
                      alt="3DS SIMULIA"
                      className="h-13 sm:h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* 4. CST Studio Suite */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/JB_CST-Studio_LOGO.png"
                      alt="CST STUDIO SUITE"
                      className="h-13 sm:h-16 md:h-20 w-auto object-contain"
                    />
                  </div>

                  {/* 5. SOLIDWORKS PDM */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/SOLIDWORKS PDM Logo.png"
                      alt="SOLIDWORKS PDM"
                      className="h-11 sm:h-13 md:h-16 w-auto object-contain"
                    />
                  </div> 

                  {/* 6. SOLIDWORKS Plastics */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/SOLIDWORKS Plastics.png"
                      alt="SOLIDWORKS Plastics"
                      className="h-11 sm:h-13 md:h-16 w-auto object-contain"
                    />
                  </div>

                  {/* 7. DriveWorks */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/DriveWorks Logo-01.png"
                      alt="DriveWorks"
                      className="h-11 sm:h-13 md:h-16 w-auto object-contain"
                    />
                  </div>

                  {/* 8. BOM Creator */}
                  <div className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0">
                    <LogoImg
                      src="/Logos/BOM-Creator.png"
                      alt="BOM Creator"
                      className="h-12 sm:h-14 md:h-18 w-auto object-contain"
                    />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Separate Footer (Deep Corporate Blue) */}
      <footer className="relative bg-[#004771] text-white py-8 sm:py-9 border-t border-[#003859] overflow-hidden">
        {/* Dynamic Angled Red Wing Accent matching the flyer */}
        <div
          className="absolute top-0 right-0 h-full w-28 sm:w-40 md:w-56 bg-gradient-to-l from-red-600/90 to-brand-red pointer-events-none opacity-85 hidden sm:block"
          style={{ clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 0% 100%)' }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <FadeIn direction="none" delay={100}>
            <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-blue-100/80 gap-4">
              <div>
                © 2026 {branding?.companyName || 'Conceptia KONNECT'}. All rights reserved. Authorized Reseller for Dassault Systèmes SOLIDWORKS.
              </div>
              <div className="flex items-center gap-6">
                <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition-colors">Terms of Registration</span>
                <span>•</span>
                <span className="hover:text-white cursor-pointer transition-colors">Contact Event Support</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </footer>
    </div>
  );
}
