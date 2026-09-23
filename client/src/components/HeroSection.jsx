import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, Calendar, Clock } from 'lucide-react';

function calculateTimeLeft() {
  // Target: October 23, 2026, 09:00:00 IST (+05:30)
  const targetDate = new Date('2026-10-23T09:00:00+05:30');
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isLive: true };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isLive: false
  };
}

export default function HeroSection({ hero, onRegisterClick }) {
  const {
    invitationTag = "YOU'RE INVITED TO",
    titlePrefix = "EXPLORE SOLIDWORKS 2027",
    titleHighlight = "at SOLIDWORKS INNOVATION DAY 2026",
    tagline = "AI is transforming engineering. Are you ready?",
    description = "Discover the latest AI-powered SOLIDWORKS innovations across design, manufacturing, data management, and simulation.",
    ctaText = "SAVE YOUR SPOT",
    heroImage = "/assets/robotic-arm.png"
  } = hero || {};

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="overview" className="relative bg-[#090d16] text-white overflow-hidden pt-12 pb-24 lg:pt-16 lg:pb-32">
      {/* Background High-Tech Grid & Glow Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none"></div>
      
      {/* Dynamic Angled Red Brand Slash & Ambient Glows */}
      <div className="absolute top-0 right-0 w-2/3 h-full overflow-hidden pointer-events-none">
        <div 
          className="absolute -right-20 -top-24 w-[750px] h-[750px] bg-gradient-to-bl from-red-600/25 via-red-900/20 to-transparent transform rotate-12 blur-3xl"
        ></div>
        <div 
          className="absolute top-0 right-1/4 w-32 h-[120%] bg-gradient-to-b from-red-600/30 via-red-800/10 to-transparent transform -skew-x-12 opacity-60 hidden lg:block"
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
            <div className="inline-flex items-center gap-2 text-xs md:text-sm font-black tracking-widest text-red-500 uppercase animate-fade-in-down">
              <span className="text-base font-bold leading-none">&#10095;</span>
              <span>{invitationTag}</span>
            </div>

            {/* Main Headline Matching Flyer Composition */}
            <div className="space-y-1.5 animate-fade-in-up [animation-delay:100ms]">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
                EXPLORE <span className="text-[#ef2722]">SOLIDWORKS 2027</span>
              </h1>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-200 leading-tight">
                at <span className="text-white">SOLIDWORKS</span> <span className="text-[#ef2722]">INNOVATION DAY 2026</span>
              </div>
              {/* Flyer Red Accent Underline Bar */}
              <div className="w-16 h-1.5 bg-[#ef2722] rounded-full mt-2"></div>
            </div>

            {/* Primary Subtext */}
            <p className="text-base sm:text-lg text-slate-200 max-w-xl font-normal leading-relaxed animate-fade-in-up [animation-delay:200ms]">
              {description}
            </p>

            {/* AI Narrative Highlight Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/90 shadow-lg shadow-black/40 max-w-xl backdrop-blur-sm animate-fade-in-up [animation-delay:300ms]">
              <div className="flex items-center gap-2 text-red-400 font-bold text-sm sm:text-base">
                <Bot className="w-5 h-5 text-[#ef2722] flex-shrink-0" />
                <span>AI is transforming engineering. Are you ready?</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Experience how AI is becoming an integral part of your workflow—helping engineers work smarter, simplify everyday tasks, and bring ideas to life faster.
              </p>
            </div>

            {/* CTA Register Button */}
            <div className="pt-2 animate-fade-in-up [animation-delay:400ms]">
              <button
                onClick={onRegisterClick}
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#ef2722] text-white font-bold text-base shadow-xl shadow-red-600/40 hover:bg-red-700 hover:shadow-red-600/60 active:scale-95 transition-all duration-200"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>

            {/* Event Countdown Timer (October 23 - Chennai) */}
            <div className="pt-2 max-w-xl animate-fade-in-up [animation-delay:500ms]">
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-950/95 border border-slate-800 shadow-2xl shadow-black/60 backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5 pb-2.5 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ef2722] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ef2722]"></span>
                    </span>
                    <span className="text-xs font-black tracking-widest text-slate-200 uppercase">
                      Chennai Event Countdown
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#ef2722]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>October 23, 2026</span>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2 sm:gap-3 text-center">
                  {/* Days */}
                  <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl py-2.5 px-1 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none">
                      {String(timeLeft.days).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-1.5">
                      Days
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl py-2.5 px-1 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-1.5">
                      Hours
                    </div>
                  </div>

                  {/* Minutes */}
                  <div className="bg-slate-950/90 border border-slate-800/90 rounded-xl py-2.5 px-1 shadow-inner">
                    <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight leading-none">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-slate-400 mt-1.5">
                      Minutes
                    </div>
                  </div>

                  {/* Seconds */}
                  <div className="bg-slate-950/90 border border-[#ef2722]/60 rounded-xl py-2.5 px-1 shadow-inner relative overflow-hidden">
                    <div className="text-2xl sm:text-3xl font-black text-[#ef2722] font-mono tracking-tight leading-none">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-wider text-red-400 mt-1.5">
                      Seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: 3D CAD Robotic Arm High-Tech Visual */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end animate-fade-in-left [animation-delay:300ms]">
            <div className="relative w-full max-w-[500px]">
              
              {/* Ambient Glows */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#ef2722]/40 via-red-900/20 to-blue-900/20 rounded-3xl filter blur-2xl opacity-70"></div>

              {/* Main CAD Visual Container */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-700/80 bg-slate-900/90 shadow-2xl shadow-black/80 backdrop-blur-sm">
                
                {/* Tech Status Header */}
                <div className="bg-slate-950/90 px-4 py-3 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef2722] animate-pulse"></span>
                    <span className="text-slate-200 font-bold tracking-wide">SOLIDWORKS 2027</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/20 text-red-400 font-bold">AI WORKCELL</span>
                  </div>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> LIVE 3D CAD
                  </span>
                </div>

                {/* Robotic Arm Visual */}
                <div className="relative aspect-[4/3] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden flex items-center justify-center p-4 group">
                  {/* Subtle Wireframe Grid */}
                  <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#38bdf8_1px,transparent_1px),linear-gradient(to_bottom,#38bdf8_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                  {/* 3D Model Image */}
                  <img
                    src="/assets/robotic-arm.png"
                    alt="SOLIDWORKS 2027 AI Robotic Workcell"
                    className="relative z-10 w-full h-full object-contain filter drop-shadow-[0_20px_35px_rgba(0,0,0,0.85)] group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Corner Accent Badge */}
                  <div className="absolute bottom-3 right-3 z-20 bg-[#ef2722] px-3 py-1 rounded-md text-[10px] font-black tracking-wider text-white uppercase shadow-lg shadow-red-600/30">
                    AI Robotic Workcell
                  </div>
                </div>

                {/* Footer specs strip */}
                <div className="bg-slate-950 px-4 py-2.5 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800/80">
                  <span className="flex items-center gap-1 text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#ef2722]"></span> Next-Gen Automation
                  </span>
                  <span className="font-mono text-slate-300 font-semibold">Chennai • Oct 23, 2026</span>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
