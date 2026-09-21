import React from 'react';

export default function Navbar({ eventData }) {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Brand: Conceptia KONNECT */}
          <div className="flex items-center gap-3">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight text-slate-900">
                  Conceptia
                </span>
                <span className="font-extrabold text-2xl tracking-tight text-brand-red flex items-center">
                  KONNECT
                  <span className="inline-block w-2 h-2 rounded-full bg-brand-red ml-0.5 animate-pulse"></span>
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 tracking-wide uppercase">
                {eventData?.branding?.companyTagline || 'Your Trusted Digital Solutions Partner'}
              </span>
            </div>
          </div>

          {/* Navigation Links for Public View */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#overview" className="hover:text-brand-red transition-colors">Overview</a>
            <a href="#agenda" className="hover:text-brand-red transition-colors">Agenda</a>
            <a href="#speakers" className="hover:text-brand-red transition-colors">Speakers</a>
            <a href="#venue" className="hover:text-brand-red transition-colors">Venue</a>
            <a href="#highlights" className="hover:text-brand-red transition-colors">Highlights</a>
          </nav>

          {/* Right Brand: 3DS SOLIDWORKS */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-slate-900">
              <svg className="w-7 h-7 text-brand-red" viewBox="0 0 40 40" fill="currentColor">
                <path d="M20 2C10.06 2 2 10.06 2 20s8.06 18 18 18 18-8.06 18-18S29.94 2 20 2zm0 32.5c-8 0-14.5-6.5-14.5-14.5S12 5.5 20 5.5 34.5 12 34.5 20 28 34.5 20 34.5z"/>
                <path d="M13 14l14 6-14 6V14z" />
              </svg>
              <div className="leading-tight">
                <div className="text-[10px] font-bold tracking-widest text-slate-400">DASSAULT SYSTEMES</div>
                <div className="text-base font-black tracking-tight text-slate-800">
                  <span className="text-brand-red">3D</span>S SOLIDWORKS
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
