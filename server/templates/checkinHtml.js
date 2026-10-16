/**
 * Generates mobile-friendly responsive HTML for the read-only Digital Entry Pass page
 * (Attendance is ONLY marked when scanned via the Admin Portal QR Scanner)
 */
export function renderCheckinPage({ attendee, alreadyAttended = false, qrDataUrl = null, error = null }) {
  if (error || !attendee) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Badge Invalid - SOLIDWORKS Innovation Day</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-slate-100 min-h-screen flex items-center justify-center p-4 font-sans text-slate-800">
  <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-xl border border-rose-100 text-center">
    <div class="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
      ✕
    </div>
    <h1 class="text-xl font-black text-slate-900 mb-2">Invalid or Expired Badge</h1>
    <p class="text-slate-500 text-sm mb-6">${error || 'The scanned QR code does not correspond to an active registration record.'}</p>
    <div class="bg-slate-50 rounded-2xl p-4 text-xs text-slate-600 mb-6">
      Please contact the registration helpdesk at the venue entrance.
    </div>
    <a href="/" class="inline-block px-6 py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition">
      Return to Home
    </a>
  </div>
</body>
</html>`;
  }

  const isAttended = attendee.status === 'Attended' || alreadyAttended;

  const checkinTime = attendee.attendedAt
    ? new Date(attendee.attendedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null;

  const checkinDate = attendee.attendedAt
    ? new Date(attendee.attendedAt).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Digital Entry Pass - ${attendee.fullName} | SOLIDWORKS Innovation Day 2026</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gradient-to-br from-slate-900 via-slate-800 to-[#002b49] min-h-screen flex items-center justify-center p-4 font-sans text-slate-800">
  <div class="bg-white rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden border border-slate-200">
    
    <!-- Top Event Header -->
    <div class="bg-[#002b49] p-6 text-center text-white relative">
      <div class="inline-flex items-center gap-2 px-3 py-1 bg-red-600/20 text-red-400 border border-red-500/30 rounded-full text-[11px] font-bold uppercase tracking-wider mb-2">
        <span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
        SOLIDWORKS Innovation Day 2026
      </div>
      <h2 class="text-xs uppercase tracking-widest text-slate-300 font-semibold">Official Digital Entry Pass</h2>
    </div>

    <!-- Status Badge & Pass Content -->
    <div class="p-8 text-center">
      ${
        isAttended
          ? `
          <div class="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl font-black shadow-inner">
            ✓
          </div>
          <span class="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Checked In by Admin
          </span>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Attendance Verified</h1>
          ${
            checkinTime
              ? `<p class="text-slate-500 text-xs mt-1">Checked in at ${checkinTime} on ${checkinDate}.</p>`
              : `<p class="text-slate-500 text-xs mt-1">Your attendance has been verified at the registration desk.</p>`
          }
          `
          : `
          <span class="inline-block px-4 py-1.5 bg-sky-50 text-sky-700 border border-sky-200 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            Confirmed Delegate Pass
          </span>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">${attendee.fullName}</h1>
          <p class="text-xs font-bold text-red-600 mt-1">${attendee.jobRole}</p>
          `
      }

      ${
        qrDataUrl
          ? `
          <div class="my-5 inline-block p-3 bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-sm">
            <img src="${qrDataUrl}" alt="Attendee QR Pass" class="w-44 h-44 mx-auto block" />
          </div>
          `
          : ''
      }

      <!-- Attendee Pass Info Card -->
      <div class="mt-4 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 text-left space-y-3">
        <div class="flex items-center justify-between border-b border-slate-200/60 pb-3">
          <span class="text-slate-400 font-bold uppercase text-[10px] tracking-wider">Pass Status</span>
          <span class="${
            isAttended
              ? 'text-emerald-700 bg-emerald-100'
              : 'text-sky-700 bg-sky-100'
          } font-bold text-[11px] px-2.5 py-0.5 rounded-full">
            ${isAttended ? 'Attended (Checked In)' : 'Confirmed — Present at Desk'}
          </span>
        </div>

        <div>
          <h3 class="text-lg font-black text-slate-900">${attendee.fullName}</h3>
          <p class="text-xs font-bold text-red-600">${attendee.jobRole}</p>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
          <div>
            <span class="text-slate-400 font-bold block text-[10px] uppercase">Company</span>
            <span class="font-bold text-slate-800">${attendee.companyName}</span>
          </div>
          <div>
            <span class="text-slate-400 font-bold block text-[10px] uppercase">Work Email</span>
            <span class="font-mono text-slate-700 text-[11px] truncate block">${attendee.workEmail}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/60 text-xs">
          <div>
            <span class="text-slate-400 font-bold block text-[10px] uppercase">Date &amp; Time</span>
            <span class="font-semibold text-slate-800">Oct 23, 2026 • 09:00 AM</span>
          </div>
          <div>
            <span class="text-slate-400 font-bold block text-[10px] uppercase">Venue</span>
            <span class="text-slate-700 font-semibold">Hablis Hotel, Guindy</span>
          </div>
        </div>
      </div>

      <!-- Instructions -->
      <div class="mt-6 text-xs text-slate-600 bg-amber-50/80 p-4 rounded-xl border border-amber-200/80">
        <p class="font-bold text-amber-900 mb-1">
          ${isAttended ? '🎉 Check-in Complete!' : '📲 Reception Check-In Required'}
        </p>
        <p class="text-[11px] text-amber-800">
          ${
            isAttended
              ? 'Please collect your delegate kit at the reception counter and head to the main auditorium.'
              : 'Please show this QR code to the event registration staff at Hablis Hotel. Only scanning via the official Admin Portal marks your attendance.'
          }
        </p>
      </div>

      <div class="mt-6 text-center">
        <p class="text-[11px] text-slate-400">Conceptia KONNECT • SOLIDWORKS Innovation Day 2026</p>
      </div>
    </div>

  </div>
</body>
</html>`;
}
