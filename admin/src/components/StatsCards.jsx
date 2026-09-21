import React from 'react';
import { Users, CheckCircle, Clock, UserCheck } from 'lucide-react';

const CARDS = [
  { key: 'total',     label: 'Total Nominations', icon: Users,       bg: 'bg-slate-100',   color: 'text-slate-700',  val: 'text-slate-900',  sub: 'All registered candidates' },
  { key: 'confirmed', label: 'Confirmed',          icon: CheckCircle, bg: 'bg-emerald-50',  color: 'text-emerald-600',val: 'text-emerald-600',sub: 'Confirmed seats' },
  { key: 'pending',   label: 'Pending',            icon: Clock,       bg: 'bg-amber-50',    color: 'text-amber-600',  val: 'text-amber-600',  sub: 'Awaiting confirmation' },
  { key: 'attended',  label: 'Attended',           icon: UserCheck,   bg: 'bg-blue-50',     color: 'text-blue-600',   val: 'text-blue-600',   sub: 'Checked in at venue' },
];

export default function StatsCards({ stats, fallbackTotal }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map(({ key, label, icon: Icon, bg, color, val, sub }) => (
        <div key={key} className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className={`text-[11px] font-bold uppercase tracking-wider ${color}`}>{label}</span>
            <div className={`w-8 h-8 rounded-xl ${bg} flex items-center justify-center ${color}`}>
              <Icon className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-3xl font-black ${val}`}>
            {stats?.[key] ?? (key === 'total' ? fallbackTotal : 0)}
          </div>
          <div className="text-[11px] text-slate-400 font-medium mt-1">{sub}</div>
        </div>
      ))}
    </div>
  );
}
