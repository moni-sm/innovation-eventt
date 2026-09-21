import React from 'react';
import { X } from 'lucide-react';

const STATUS_COLOR = {
  Confirmed: 'text-emerald-600',
  Pending:   'text-amber-600',
  Attended:  'text-blue-600',
  Cancelled: 'text-rose-600',
};

export default function AttendeeModal({ attendee, onClose }) {
  if (!attendee) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b pb-4 mb-5">
          <div>
            <h3 className="text-lg font-black text-slate-900">Nomination Details</h3>
            <p className="text-[11px] text-slate-400 font-mono mt-0.5">
              ID: {attendee._id || attendee.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
            <p className="text-base font-bold text-slate-900 mt-0.5">{attendee.fullName}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider">Work Email</label>
              <p className="font-mono text-slate-800 mt-0.5 break-all">{attendee.workEmail}</p>
            </div>
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider">Phone</label>
              <p className="font-mono text-slate-800 mt-0.5">{attendee.phoneNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider">Company</label>
              <p className="font-bold text-slate-800 mt-0.5">{attendee.companyName}</p>
            </div>
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider">Job Role</label>
              <p className="font-bold text-slate-800 mt-0.5">{attendee.jobRole}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider">Status</label>
              <p className={`font-bold mt-0.5 ${STATUS_COLOR[attendee.status] || 'text-slate-700'}`}>
                {attendee.status}
              </p>
            </div>
            <div>
              <label className="font-bold text-slate-400 uppercase tracking-wider">Registered On</label>
              <p className="text-slate-700 mt-0.5">{new Date(attendee.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors"
          >Close</button>
        </div>

      </div>
    </div>
  );
}
