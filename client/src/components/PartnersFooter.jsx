import React from 'react';

const ECOSYSTEM_LOGOS = [
  {
    id: 'solidworks',
    name: '3DS SOLIDWORKS',
    render: () => (
      <img
        src="/Logos/solidworks-logo.png"
        alt="3DS SOLIDWORKS"
        className="h-9 sm:h-10 md:h-11 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: '3dexperience',
    name: '3DEXPERIENCE',
    render: () => (
      <div className="flex items-center gap-2 flex-shrink-0">
        <img
          src="/Logos/3DEXPERIENCE circle logo.png"
          alt="3DEXPERIENCE Compass"
          className="h-9 sm:h-10 md:h-11 w-auto object-contain flex-shrink-0"
        />
        <img
          src="/Logos/3DEXPERIENCE Logo (2).png"
          alt="3DEXPERIENCE"
          className="h-5 sm:h-6 md:h-6 w-auto object-contain"
        />
      </div>
    )
  },
  

  {
    id: 'bom-creator',
    name: 'BOM Creator',
    render: () => (
      <img
        src="/Logos/BOM-Creator.png"
        alt="BOM Creator"
        className="h-10 sm:h-12 md:h-14 w-auto object-contain flex-shrink-0"
      />
    )
  },
  

  {
    id: 'cst-studio',
    name: 'CST STUDIO SUITE',
    render: () => (
      <img
        src="/Logos/JB_CST-Studio_LOGO.png"
        alt="CST STUDIO SUITE"
        className="h-18 sm:h-20 md:h-28 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: 'solidworks-pdm',
    name: 'SOLIDWORKS PDM',
    render: () => (
      <img
        src="/Logos/SOLIDWORKS PDM Logo.png"
        alt="SOLIDWORKS PDM"
        className="h-8 sm:h-9 md:h-11 w-auto object-contain flex-shrink-0"
      />
    )
  },

  {
    id: 'driveworks',
    name: 'DriveWorks',
    render: () => (
      <img
        src="/Logos/DriveWorks Logo-02.png"
        alt="DriveWorks"
        className="h-7 sm:h-8 md:h-9 w-auto object-contain flex-shrink-0"
      />
    )
  },
  {
    id: 'solidworks-plastics',
    name: 'SOLIDWORKS Plastics',
    render: () => (
      <img
        src="/Logos/SOLIDWORKS Plastics.png"
        alt="SOLIDWORKS Plastics"
        className="h-10 sm:h-12 md:h-14 w-auto object-contain flex-shrink-0"
      />
    )
  },
  
  {
    id: 'simulia',
    name: '3DS SIMULIA',
    render: () => (
      <img
        src="/Logos/Simulia Abaqus logo.png"
        alt="3DS SIMULIA"
        className="h-16 sm:h-18 md:h-24 w-auto object-contain flex-shrink-0"
      />
    )
  },
  
];

export default function PartnersFooter({ partners, branding }) {
  return (
    <footer>
      {/* 1. Upper Section: Partners & Marquee Logos (PURE WHITE BACKGROUND) */}
      <div className="bg-white border-t border-slate-200 py-6 sm:py-7">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-8">
            
            {/* Left: Our Event Partner SolidCAM (CONSTANT / STATIC) */}
            <div className="flex flex-col items-center lg:items-start gap-2.5 flex-shrink-0 z-10">
              <span className="text-xs sm:text-[18px] font-bold uppercase tracking-wider text-black-800">
                Our Event Partner
              </span>
              
              {/* Prominent Sized-up SolidCAM Logo with Red Badge */}
              <div className="flex items-center group transition-transform duration-200 hover:scale-[1.02]">
                <div className="relative flex items-center ">
                  <img
                    src="/Logos/SOLIDCAM Png Logo (Red Color).png"
                    alt="SolidCAM - The Leaders in Integrated CAM"
                    className="h-19 sm:h-21 md:h-28 w-auto max-w-[240px] sm:max-w-[280px] object-contain drop-shadow"
                  />
                </div>
              </div>
            </div>

            {/* Vertical Divider separating SolidCAM from marquee */}
            <div className="hidden lg:block w-px h-16 bg-slate-200 mx-2 lg:mx-4 flex-shrink-0 self-center"></div>

            {/* Right: Infinite Marquee for Ecosystem Logos on White Background */}
            <div className="flex-1 w-full min-w-0 overflow-hidden relative py-2">
              
              {/* Edge Fade Gradients for white background */}
              <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none hidden sm:block"></div>
              <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none hidden sm:block"></div>

              {/* Marquee Track */}
              <div className="animate-marquee flex items-center gap-8 sm:gap-12 lg:gap-14">
                {[0, 1].map((setIndex) => (
                  <div 
                    key={`marquee-set-${setIndex}`}
                    className="flex items-center gap-8 sm:gap-12 lg:gap-14 flex-shrink-0"
                    aria-hidden={setIndex === 1 ? 'true' : undefined}
                  >
                    {ECOSYSTEM_LOGOS.map((item) => (
                      <div 
                        key={`${item.id}-${setIndex}`}
                        className="flex items-center transition-all duration-200 hover:scale-105 flex-shrink-0 cursor-pointer"
                      >
                        {item.render()}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 2. Bottom Section: Copyright & Legal Strip (BLACK BACKGROUND) */}
      <div className="relative bg-[#0c101d] text-white py-6 overflow-hidden">
        {/* Dynamic Angled Red Wing Accent matching the flyer */}
        <div 
          className="absolute top-0 right-0 h-full w-28 sm:w-40 md:w-56 bg-gradient-to-l from-red-600/90 to-brand-red pointer-events-none opacity-85 hidden sm:block"
          style={{ clipPath: 'polygon(45% 0, 100% 0, 100% 100%, 0% 100%)' }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
            <div>
              © 2026 {branding?.companyName || 'Conceptia KONNECT'}. All rights reserved. Authorized Reseller for Dassault Systèmes SOLIDWORKS.
            </div>
            <div className="flex items-center gap-6">
              <span className="hover:text-slate-200 cursor-pointer transition-colors">Privacy Policy</span>
              <span>•</span>
              <span className="hover:text-slate-200 cursor-pointer transition-colors">Terms of Registration</span>
              <span>•</span>
              <span className="hover:text-slate-200 cursor-pointer transition-colors">Contact Event Support</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
