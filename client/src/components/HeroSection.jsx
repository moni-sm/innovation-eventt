import React from 'react';
import { ArrowRight, ChevronRight, Sparkles } from 'lucide-react';

export default function HeroSection({ hero, onRegisterClick }) {
  const {
    invitationTag = "YOU'RE INVITED TO",
    titlePrefix = "SOLIDWORKS",
    titleHighlight = "Innovation Day 2026",
    tagline = "Smarter Design. Faster Innovation.",
    description = "Discover the latest in SOLIDWORKS and 3DEXPERIENCE and how it can power your next big idea.",
    ctaText = "REGISTER NOW",
    heroImage
  } = hero || {};

  return (
    <section id="overview" className="relative bg-[#0b0f19] text-white overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32">
      {/* Background High-Tech Grid & Glow Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25"></div>
      
      {/* Dynamic Angled Red Brand Slash */}
      <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden pointer-events-none">
        <div 
          className="absolute -right-20 -top-24 w-[750px] h-[750px] bg-gradient-to-bl from-red-600/30 via-red-900/20 to-transparent transform rotate-12 blur-3xl"
        ></div>
        <div 
          className="absolute top-0 right-1/4 w-32 h-[120%] bg-gradient-to-b from-red-600/40 via-red-800/10 to-transparent transform -skew-x-12 opacity-60 hidden lg:block"
        ></div>
        <div 
          className="absolute -bottom-20 right-10 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headlines & Call to Action */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Invitation Tag */}
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-black tracking-widest text-red-500 uppercase">
              <span className="text-base font-bold leading-none">&#10095;</span>
              <span>{invitationTag}</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {titlePrefix}
              </h1>
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-brand-red">
                {titleHighlight}
              </div>
            </div>

            {/* Tagline */}
            <p className="text-xl sm:text-2xl font-bold text-slate-200 tracking-tight">
              {tagline}
            </p>

            {/* Body Description */}
            <p className="text-slate-300 text-base sm:text-lg max-w-xl leading-relaxed font-normal">
              {description}
            </p>

            {/* CTA Register Button */}
            <div className="pt-2">
              <button
                onClick={onRegisterClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-red text-white font-bold text-base shadow-lg shadow-red-600/40 hover:bg-red-700 hover:shadow-red-600/60 active:scale-95 transition-all duration-200"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Key benefits pill */}
            <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400">
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/60">
                <Sparkles className="w-3.5 h-3.5 text-red-400" /> Free Registration
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/60">
                Hands-on 3DEXPERIENCE Demos
              </span>
              <span className="flex items-center gap-1.5 bg-slate-800/80 px-3 py-1.5 rounded-md border border-slate-700/60">
                Certificate of Attendance
              </span>
            </div>

          </div>

          {/* Right Column: 3D CAD Turbine / High-Tech Visual */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[480px]">
              
              {/* Background angled accent polygon behind image */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-brand-red via-red-900/30 to-blue-900/20 rounded-2xl filter blur-xl opacity-70"></div>

              {/* Main CAD Visual Container */}
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl shadow-black/80">
                
                {/* Tech Status Header */}
                <div className="bg-slate-950/80 px-4 py-2 border-b border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                    <span className="text-slate-300 font-semibold">SOLIDWORKS 2026</span>
                  </div>
                  <span className="text-red-400">CAD MODEL ACTIVE</span>
                </div>

                {/* Visual Image */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-900 via-slate-950 to-black overflow-hidden flex items-center justify-center">
                  {heroImage && heroImage !== '/assets/turbine.png' ? (
                    <img
                      src={heroImage}
                      alt="SOLIDWORKS 3D CAD Innovation Engine"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    /* High-fidelity procedural SVG/Graphic matching the jet turbine flyer */
                    <div className="relative w-full h-full flex items-center justify-center p-4">
                      {/* Wireframe CAD Blueprint Grid */}
                      <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:16px_16px]"></div>
                      
                      {/* 3D Turbine Graphic */}
                      <svg className="w-full h-full max-h-[300px] drop-shadow-[0_15px_25px_rgba(220,38,38,0.35)]" viewBox="0 0 500 360" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                          <radialGradient id="engineCore" cx="48%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#ff1e27" />
                            <stop offset="45%" stopColor="#c50a12" />
                            <stop offset="85%" stopColor="#550005" />
                            <stop offset="100%" stopColor="#111" />
                          </radialGradient>
                          <linearGradient id="chromeMetal" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#f8fafc" />
                            <stop offset="25%" stopColor="#94a3b8" />
                            <stop offset="50%" stopColor="#e2e8f0" />
                            <stop offset="75%" stopColor="#475569" />
                            <stop offset="100%" stopColor="#cbd5e1" />
                          </linearGradient>
                          <linearGradient id="darkCasing" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="50%" stopColor="#1e293b" />
                            <stop offset="100%" stopColor="#0f172a" />
                          </linearGradient>
                        </defs>

                        {/* Background Laptop Wireframe Screen */}
                        <rect x="250" y="30" width="220" height="150" rx="8" fill="#030712" stroke="#0284c7" strokeWidth="2" strokeDasharray="4 2" />
                        <rect x="260" y="45" width="200" height="120" rx="4" fill="#082f49" fillOpacity="0.4" />
                        <path d="M280 130 L320 80 L380 95 L420 70 L440 120" stroke="#38bdf8" strokeWidth="2" fill="none" />
                        <circle cx="320" cy="80" r="4" fill="#38bdf8" />
                        <circle cx="380" cy="95" r="4" fill="#38bdf8" />
                        <text x="270" y="65" fill="#38bdf8" fontSize="10" fontFamily="monospace">PART_ASSEMBLY_v26.SLDPRT</text>
                        <text x="270" y="155" fill="#94a3b8" fontSize="9" fontFamily="monospace">STRESS ANALYSIS: OPTIMAL</text>

                        {/* Outer Turbine Casing */}
                        <ellipse cx="230" cy="190" rx="140" ry="115" fill="url(#darkCasing)" stroke="url(#chromeMetal)" strokeWidth="6" />
                        <ellipse cx="230" cy="190" rx="122" ry="98" fill="#090d16" stroke="#e60012" strokeWidth="3" />

                        {/* Turbine Stator Ring & Bolts */}
                        <circle cx="230" cy="190" r="100" stroke="#64748b" strokeWidth="2" strokeDasharray="6 6" />

                        {/* Red Intake Cone & Glowing Turbine Core */}
                        <ellipse cx="230" cy="190" rx="42" ry="42" fill="url(#engineCore)" />
                        <circle cx="230" cy="190" r="15" fill="#fff" opacity="0.9" />

                        {/* Dynamic Blades */}
                        <g stroke="#94a3b8" strokeWidth="3" strokeLinecap="round">
                          {/* 16 Radial Blades */}
                          <path d="M230 190 L230 92" />
                          <path d="M230 190 L268 99" />
                          <path d="M230 190 L299 121" />
                          <path d="M230 190 L318 152" />
                          <path d="M230 190 L328 190" />
                          <path d="M230 190 L318 228" />
                          <path d="M230 190 L299 259" />
                          <path d="M230 190 L268 281" />
                          <path d="M230 190 L230 288" />
                          <path d="M230 190 L192 281" />
                          <path d="M230 190 L161 259" />
                          <path d="M230 190 L142 228" />
                          <path d="M230 190 L132 190" />
                          <path d="M230 190 L142 152" />
                          <path d="M230 190 L161 121" />
                          <path d="M230 190 L192 99" />
                        </g>

                        {/* Dynamic Red Aerodynamic Swirls */}
                        <path d="M230 190 Q280 140 330 120" stroke="#ff2d37" strokeWidth="4" fill="none" opacity="0.8" />
                        <path d="M230 190 Q290 230 350 210" stroke="#ff2d37" strokeWidth="4" fill="none" opacity="0.8" />
                        <path d="M230 190 Q170 240 110 230" stroke="#ff2d37" strokeWidth="4" fill="none" opacity="0.8" />

                        {/* Hydraulic Line and Manifold Detail */}
                        <path d="M340 150 L400 130 L450 150 L460 210" stroke="url(#chromeMetal)" strokeWidth="6" strokeLinecap="round" />
                        <rect x="390" y="122" width="20" height="16" rx="2" fill="#e60012" />
                        <rect x="445" y="170" width="16" height="24" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
                      </svg>
                    </div>
                  )}

                  {/* Corner Accent Badge */}
                  <div className="absolute bottom-3 right-3 bg-red-600/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] font-black tracking-wider text-white uppercase shadow">
                    Next-Gen Modeling
                  </div>
                </div>

                {/* Footer specs strip */}
                <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Live Innovation Showcase
                  </span>
                  <span className="font-mono text-slate-300">Kochi • Nov 13</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
