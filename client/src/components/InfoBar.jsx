import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';

export default function InfoBar({ info }) {
  const {
    dates = "November 13, 2026",
    time = "09:00 AM – 02:00 PM",
    venueName = "Novotel Kochi Infopark",
    venueAddress = "Kakkanad, Kochi, Kerala 682030",
    mode = "In-Person Event"
  } = info || {};

  return (
    <div className="relative -mt-10 lg:-mt-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-20">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-300/40 border border-slate-100 p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:divide-x md:divide-slate-200">
          
          {/* Item 1: Event Dates & Time */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-red to-red-500 flex items-center justify-center text-white shadow-md shadow-red-500/30 flex-shrink-0">
              <Calendar className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Event Dates
              </div>
              <div className="text-lg font-bold text-slate-900 leading-tight">
                {dates}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5 flex items-center gap-1">
                <Clock className="w-3 h-3 text-red-500" />
                {time}
              </div>
            </div>
          </div>

          {/* Item 2: Venue */}
          <div className="flex items-center gap-4 md:pl-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-red to-red-500 flex items-center justify-center text-white shadow-md shadow-red-500/30 flex-shrink-0">
              <MapPin className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Venue
              </div>
              <div className="text-lg font-bold text-slate-900 leading-tight">
                {venueName}
              </div>
              <div className="text-xs font-medium text-slate-500 mt-0.5">
                {venueAddress}
              </div>
            </div>
          </div>

          {/* Item 3: Mode */}
          <div className="flex items-center gap-4 md:pl-6">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-red to-red-500 flex items-center justify-center text-white shadow-md shadow-red-500/30 flex-shrink-0">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Mode
              </div>
              <div className="text-lg font-bold text-slate-900 leading-tight">
                {mode}
              </div>
              <div className="text-xs font-medium text-emerald-600 mt-0.5 flex items-center gap-1 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Seats Filling Fast
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
