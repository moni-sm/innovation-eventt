import React from 'react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Brand: Conceptia KONNECT Logo from Logos folder */}
          <a href="#overview" className="flex items-center gap-3 transition-opacity hover:opacity-90">
            <img
              src="/Logos/conceptia-konnect-logo.png"
              alt="Conceptia KONNECT - Your Trusted Digital Solutions Partner"
              className="h-28 sm:h-24 w-auto object-contain"
            />
          </a>

          {/* Navigation Links for Public View */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <a href="#overview" className="hover:text-brand-red transition-colors">Overview</a>
            <a href="#what-to-expect" className="hover:text-brand-red transition-colors">What to Expect</a>
            <a href="#agenda" className="hover:text-brand-red transition-colors">Agenda</a>
            <a href="#venue" className="hover:text-brand-red transition-colors">Venue</a>
            <a href="#speakers" className="hover:text-brand-red transition-colors">Speakers</a>
          </nav>

          {/* Right Brand: Dassault Systèmes & 3DS SOLIDWORKS Logo from Logos folder */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="flex flex-col justify-center">
              <img
                src="/Logos/solidworks-logo.png"
                alt="3DS SOLIDWORKS"
                className="h-18 sm:h-14 w-auto object-contain"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
