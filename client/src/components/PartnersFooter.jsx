import React from 'react';

export default function PartnersFooter({ partners, branding }) {
  return (
    <footer className="bg-[#0c101d] text-white border-t border-slate-800/80 pt-10 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Partners Strip */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 pb-10 border-b border-slate-800">
          
          {/* Left: Our Event Partner SolidCAM */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Our Event Partner
            </span>
            <div className="flex h-10 w-50 items-center gap-2 bg-slate-900/90 px-4 py-2.5 rounded-xl border border-slate-700/60 shadow-inner">
              <img
                src="/uploads/SOLIDCAM White Logo-01.png"
                alt="SolidCAM"
                className="h-12 w-24 object-contain"
              />
            </div>
          </div>

          {/* Right: Ecosystem Brands */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-slate-300">
            
            {/* 3DS SOLIDWORKS */}
            <div className="flex items-center gap-2 hover:text-white transition-colors">
              <img
                src="/uploads/solidworks-logo.png"
                alt="SOLIDWORKS"
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* 3DEXPERIENCE */}
            <div className="flex items-center gap-1 hover:text-white transition-colors">
              <img
                src="/uploads/3DEXPERIENCE Logo.png"
                alt=""
                className="h-9 w-auto object-contain"
              />
            </div>

              {/* SOLIDWORKS PDM */}
            <div className="flex items-center gap-1 hover:text-white transition-colors">
              <img
                src="/uploads/SOLIDWORKS PDM Logo.png"
                alt=""
                className="h-9 w-auto object-contain"
              />
            </div> 

                {/* BOM Creator */}
            <div className="flex items-center gap-1 hover:text-white transition-colors">
              <img
                src="/uploads/JB_CST-Studio_LOGO.png"
                alt=""
                className="h-9 w-auto object-contain"
              />
            </div>

            {/* DriveWorks*/}
            <div className="flex items-center gap-1 hover:text-white transition-colors">
              <img
                src="/uploads/DriveWorks Logo-02.png"
                alt=""
                className="h-9 w-auto object-contain"
              />
            </div>

              {/* SIMULIA */}
            <div className="flex items-center gap-1 hover:text-white transition-colors">
              <img
                src="/uploads/Simulia Abaqus logo.png"
                alt=""
                className="h-10 w-auto object-contain"
              />
            </div>

            {/* BOM Creator */}
            <div className="flex items-center gap-1 hover:text-white transition-colors">
              <img
                src="/uploads/BOM-Creator.png"
                alt="BOM Creator"
                className="h-9 w-auto object-contain"
              />
            </div>


            {/* 3DEXPERIENCE */}
            <div className="flex items-center gap-1 hover:text-white transition-colors">
              <img
                src="/uploads/3DEXPERIENCE circle logo.png"
                alt="3DEXPERIENCE"
                className="h-9 w-auto object-contain"
              />
            </div>
            

             {/* SOLIDWORKS Plastics*/}
            <div className="flex items-center gap-1.5 hover:text-white transition-colors">
              <img
                src="/uploads/SOLIDWORKS Plastics.png"
                alt=""
                className="h-9 w-auto object-contain"
              />
            </div>

             


            

          </div>

        </div>

        {/* Bottom Credits & Copyright */}
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

      </div>
    </footer>
  );
}
