import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from server directory
dotenv.config({ path: path.join(__dirname, '../.env') });

import { connectDB } from '../db.js';
import { dataService } from '../services/dataService.js';
import { emailService } from '../services/emailService.js';

async function main() {
  const args = process.argv.slice(2);
  const isStatus = args.includes('--status');
  const isAll = args.includes('--all');
  const testIndex = args.indexOf('--test');
  const testEmail = testIndex !== -1 ? args[testIndex + 1] : null;

  console.log('\n======================================================');
  console.log('   SOLIDWORKS Innovation Day - QR Pass Email Dispatch');
  console.log('======================================================\n');

  // Connect to DB (will gracefully fall back to local JSON if Mongo not reachable)
  try {
    await connectDB();
  } catch (e) {
    console.log('Using local JSON storage fallback.');
  }

  const isConfigured = emailService.isConfigured();
  console.log(`📡 SMTP Configured: ${isConfigured ? '✅ YES (Live Delivery)' : '⚠️ NO (Simulation Mode)'}`);
  if (!isConfigured) {
    console.log('   To send real emails, set SMTP_USER and SMTP_PASS in server/.env\n');
  }

  const registrations = await dataService.getAllRegistrations();
  console.log(`📋 Total Registrations found: ${registrations.length}\n`);

  if (isStatus) {
    console.table(
      registrations.map(r => ({
        ID: r._id || r.id,
        Name: r.fullName,
        Email: r.workEmail,
        Status: r.status,
        EmailSent: r.emailSent ? '✅ Yes' : '❌ No'
      }))
    );
    process.exit(0);
  }

  const baseUrl = process.env.APP_URL || process.env.BASE_URL || 'http://localhost:5000';

  if (testEmail) {
    console.log(`🧪 Sending test QR Pass to: ${testEmail}...`);
    const mockAttendee = {
      _id: 'test_pass_' + Date.now(),
      fullName: 'Test Attendee',
      workEmail: testEmail,
      companyName: 'Innovation Tech Corp',
      jobRole: 'Design Engineer',
      city: 'Chennai',
      status: 'Confirmed'
    };

    try {
      const res = await emailService.sendAttendanceEmail(mockAttendee, baseUrl);
      console.log('✅ Test email dispatched successfully:', res);
    } catch (err) {
      console.error('❌ Failed to dispatch test email:', err.message);
    }
    process.exit(0);
  }

  // Filter confirmed attendees
  const confirmed = registrations.filter(r => r.status === 'Confirmed' || r.status === 'Attended');
  const targetList = isAll ? confirmed : confirmed.filter(r => !r.emailSent);

  if (targetList.length === 0) {
    console.log('🎉 All confirmed attendees already received their QR pass email!');
    console.log('   Use `node server/scripts/send-qr.js --all` to force resend to all confirmed attendees.\n');
    process.exit(0);
  }

  console.log(`🚀 Dispatching QR pass emails to ${targetList.length} attendee(s)...\n`);

  for (let i = 0; i < targetList.length; i++) {
    const attendee = targetList[i];
    process.stdout.write(`[${i + 1}/${targetList.length}] Sending to ${attendee.fullName} <${attendee.workEmail}>... `);
    try {
      const res = await emailService.sendAttendanceEmail(attendee, baseUrl);
      if (res.simulated) {
        console.log('⚠️ [SIMULATED]');
      } else {
        console.log('✅ [SENT]');
      }
    } catch (err) {
      console.log(`❌ [FAILED: ${err.message}]`);
    }

    if (i < targetList.length - 1) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log('\n✨ Finished processing QR pass emails!\n');
  process.exit(0);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
