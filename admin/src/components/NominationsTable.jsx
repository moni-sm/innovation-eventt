import React from 'react';
import { Users, Building, Briefcase, Trash2 } from 'lucide-react';

const STATUS_CLS = {
  Confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Pending:   'bg-amber-50  text-amber-700  border-amber-200',
  Attended:  'bg-blue-50   text-blue-700   border-blue-200',
  Cancelled: 'bg-rose-50   text-rose-700   border-rose-200',
};

export default function NominationsTable({ registrations, onStatusChange, onDelete, onView }) {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
            <tr>
              <th className="py-4 px-6">Candidate</th>
              <th className="py-4 px-6">Company &amp; Role</th>
              <th className="py-4 px-6">Phone</th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6">Registered</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {registrations.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-14 text-center text-slate-400">
                  <Users className="w-10 h-10 mx-auto mb-2 opacity-25" />
                  <p className="font-bold text-slate-700 text-sm">No nominations found</p>
                  <p className="text-xs mt-1">Registrations from the landing page appear here instantly.</p>
                </td>
              </tr>
            ) : registrations.map(reg => {
              const id  = reg._id || reg.id;
              const cls = STATUS_CLS[reg.status] || STATUS_CLS.Confirmed;
              return (
                <tr key={id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-slate-900 text-sm">{reg.fullName}</div>
                    <div className="font-mono text-slate-400 text-[11px] mt-0.5">{reg.workEmail}</div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-800">
                      <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      {reg.companyName}
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 text-[11px] mt-0.5">
                      <Briefcase className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      {reg.jobRole}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-slate-600">{reg.phoneNumber}</td>
                  <td className="py-4 px-6">
                    <select
                      value={reg.status || 'Confirmed'}
                      onChange={e => onStatusChange(id, e.target.value)}
                      className={`text-xs font-bold px-3 py-1 rounded-full border cursor-pointer ${cls}`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Pending">Pending</option>
                      <option value="Attended">Attended</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-[11px]">
                    {new Date(reg.createdAt).toLocaleDateString(undefined, { month:'short', day:'numeric', year:'numeric' })}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    <button
                      onClick={() => onView(reg)}
                      className="px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 font-bold transition-colors"
                    >View</button>
                    <button
                      onClick={() => onDelete(id)}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete"
                    ><Trash2 className="w-3.5 h-3.5" /></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
