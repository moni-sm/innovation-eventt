import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import FadeIn from './FadeIn';

export default function InfoBar({ info }) {
  const {
    dates = "October 23, 2026",
    time = "09:00 AM – 02:00 PM",
    venueName = "Hablis - A Business Hotel In Chennai",
    venueAddress = "19, GST Road, Guindy, Chennai, Tamil Nadu 600032"
  } = info || {};

  return (
    <FadeIn direction="up" delay={200} className="relative -mt-10 lg:-mt-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      {/* Branded Red Pill Bar matching the uploaded flyer */}
      <div className="bg-[#ef2722] text-white rounded-[32px] shadow-2xl shadow-red-600/35 border-2 border-red-500/80 px-6 py-6 sm:px-10 sm:py-8">
        
        {/* Bar Heading */}
        <div className="text-center mb-6">
          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-[0.1em] text-white">
            Save Your Spot
          </h3>
        </div>

        {/* 3 Icon + Label Groups on One Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center md:divide-x md:divide-white/20">
          
          {/* 1. Date */}
          <div className="flex items-center gap-4 justify-start md:justify-center">
            <div className="w-12 h-12 rounded-full bg-white text-[#ef2722] flex items-center justify-center shadow-md flex-shrink-0">
              <Calendar className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-red-100 uppercase tracking-wider">
                Event Date
              </div>
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight uppercase">
                {dates}
              </div>
            </div>
          </div>

          {/* 2. Time */}
          <div className="flex items-center gap-4 justify-start md:justify-center md:pl-6">
            <div className="w-12 h-12 rounded-full bg-white text-[#ef2722] flex items-center justify-center shadow-md flex-shrink-0">
              <Clock className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-red-100 uppercase tracking-wider">
                Event Time
              </div>
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight uppercase">
                {time}
              </div>
            </div>
          </div>

          {/* 3. Location */}
          <div className="flex items-center gap-4 justify-start md:justify-center md:pl-6">
            <div className="w-12 h-12 rounded-full bg-white text-[#ef2722] flex items-center justify-center shadow-md flex-shrink-0">
              <MapPin className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-red-100 uppercase tracking-wider">
                Location
              </div>
              <div className="text-base sm:text-lg font-extrabold text-white tracking-tight uppercase">
                {venueName}
              </div>
              <div className="text-[11px] font-medium text-red-100 line-clamp-1">
                {venueAddress}
              </div>
            </div>
          </div>

        </div>

      </div>
    </FadeIn>
  );
}
