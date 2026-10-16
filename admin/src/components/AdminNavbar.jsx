import React from 'react';
import { Download, RefreshCw, Mail, QrCode, Users } from 'lucide-react';
import { api } from '../services/api';

export default function AdminNavbar({
  loading,
  onRefresh,
  onOpenBulkEmail,
  activeTab = 'nominations',
  onTabChange
}) {
  return (
    <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between py-3 sm:h-16 gap-3">
        
        {/* Brand + Navigation Tabs */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white">
                SOLIDWORKS Innovation Day&nbsp;
              </span>
              <span className="text-brand-red font-extrabold">2026</span>
              <span className="hidden sm:inline-block ml-2 text-[11px] font-semibold text-slate-400 uppercase tracking-widest">
                Admin Portal
              </span>
            </div>
          </div>

          {/* Section Switcher Pills */}
          {onTabChange && (
            <nav className="flex items-center bg-slate-800/90 p-1 rounded-xl border border-slate-700/80">
              <button
                type="button"
                onClick={() => onTabChange('nominations')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  activeTab === 'nominations'
                    ? 'bg-brand-red text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Nominations</span>
              </button>

              <button
                type="button"
                onClick={() => onTabChange('scanner')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-extrabold transition-all ${
                  activeTab === 'scanner'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <QrCode className="w-3.5 h-3.5" />
                <span>QR Scanner</span>
              </button>
            </nav>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onTabChange && onTabChange(activeTab === 'scanner' ? 'nominations' : 'scanner')}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold tracking-wide shadow-md transition-all hover:scale-[1.02] ${
              activeTab === 'scanner'
                ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white'
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>{activeTab === 'scanner' ? 'View Nominations' : 'Scan QR Pass'}</span>
          </button>

          <button
            onClick={onOpenBulkEmail}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-wide shadow-md transition-all hover:scale-[1.02]"
          >
            <Mail className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Send QR Passes</span>
          </button>

          <a
            href={api.getExportCsvUrl()}
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold uppercase tracking-wider shadow transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export CSV</span>
          </a>

          <button
            onClick={onRefresh}
            title="Refresh"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>

      </div>
    </header>
  );
}
