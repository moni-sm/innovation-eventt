import dotenv from 'dotenv';
dotenv.config();

import nodemailer from 'nodemailer';
import { qrService } from './qrService.js';
import { dataService } from './dataService.js';

let ResendClass = null;
async function getResendClient(apiKey) {
  if (!apiKey) return null;
  if (!ResendClass) {
    try {
      const mod = await import('resend');
      ResendClass = mod.Resend || mod.default?.Resend;
    } catch (err) {
      console.warn('[Email Service] "resend" module not installed locally. On Render, it will be installed from package.json.');
      return null;
    }
  }
  return ResendClass ? new ResendClass(apiKey) : null;
}

class EmailService {
  constructor() {
    this.transporter = null;
    this.resend = null;
    this.initClients();
  }

  async initClients() {
    if (process.env.RESEND_API_KEY) {
      try {
        this.resend = await getResendClient(process.env.RESEND_API_KEY);
        if (this.resend) {
          console.log('[Email Service] Resend HTTP API client configured (Port 443 HTTPS)');
        }
      } catch (e) {
        console.error('[Email Service] Error initializing Resend:', e);
      }
    } else {
      this.resend = null;
    }

    const user = process.env.SMTP_USER || process.env.EMAIL_USER;
    const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = parseInt(process.env.SMTP_PORT, 10) || 587;
    const secure = process.env.SMTP_SECURE === 'true';

    if (user && pass) {
      this.transporter = nodemailer.createTransport({
        host,
        port,
        secure,
        auth: {
          user,
          pass,
        },
        family: 4, // FIXES ENETUNREACH: Forces IPv4 instead of IPv6
        connectionTimeout: 10000, // 10 seconds timeout
        tls: { rejectUnauthorized: false }
      });
      console.log(`[Email Service] SMTP Transporter configured (${host}:${port}, secure: ${secure}, user: ${user}, IPv4 forced)`);
    } else {
      this.transporter = null;
    }

    if (!this.resend && !this.transporter && !process.env.BREVO_API_KEY) {
      console.log('[Email Service] Neither BREVO_API_KEY, RESEND_API_KEY, nor SMTP credentials provided. Running in Preview/Simulation mode.');
    }
  }

  initTransporter() {
    this.initClients();
  }

  isConfigured() {
    if (!this.resend && !this.transporter) {
      this.initClients();
    }
    return !!(
      process.env.BREVO_API_KEY ||
      process.env.RESEND_API_KEY ||
      this.resend ||
      (this.transporter && (process.env.SMTP_USER || process.env.EMAIL_USER))
    );
  }

  getFromAddress() {
    return process.env.EMAIL_FROM || process.env.SMTP_FROM || '"SOLIDWORKS Innovation Day 2026" <events@conceptia.in>';
  }

  /**
   * Generates the personalized HTML email template with embedded QR code pass
   */
  generateEmailHtml(attendee, checkinUrl, qrImageSrc = 'cid:entry_pass_qr') {
    const id = attendee._id || attendee.id || 'N/A';
    const fullName = attendee.fullName || 'Valued Attendee';
    const jobRole = attendee.jobRole || 'Engineering Professional';
    const companyName = attendee.companyName || 'Corporate Delegate';
    const city = attendee.city ? ` (${attendee.city})` : '';

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Pass for SOLIDWORKS Innovation Day 2026</title>
</head>
<body style="margin:0; padding:0; background-color:#f1f5f9; font-family:'Segoe UI', Arial, sans-serif; color:#1e293b; -webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f1f5f9" style="padding:24px 10px;">
    <tr>
      <td align="center">
        <!-- Main Card Container -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="#ffffff" style="max-width:600px; width:100%; border-radius:20px; overflow:hidden; box-shadow:0 10px 25px rgba(0,0,0,0.08); border:1px solid #e2e8f0;">
          
          <!-- Header Banner -->
          <tr>
            <td bgcolor="#002b49" style="padding:28px 32px; background:linear-gradient(135deg, #00172e 0%, #003865 100%); text-align:center;">
              <p style="margin:0 0 6px 0; font-size:12px; font-weight:800; letter-spacing:2px; text-transform:uppercase; color:#ef4444;">
                OFFICIAL ENTRY PASS
              </p>
              <h1 style="margin:0; font-size:24px; font-weight:900; color:#ffffff; letter-spacing:-0.5px; line-height:1.2;">
                SOLIDWORKS INNOVATION DAY <span style="color:#ef2722;">2026</span>
              </h1>
              <p style="margin:8px 0 0 0; font-size:13px; color:#cbd5e1;">
                AI-Powered Engineering • Design • Simulation • Collaboration
              </p>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding:28px 32px 16px;">
              <p style="margin:0 0 10px 0; font-size:18px; font-weight:700; color:#0f172a;">
                Dear ${fullName},
              </p>
              <p style="margin:0 0 16px 0; font-size:14px; line-height:1.6; color:#475569;">
                Your seat for <strong>SOLIDWORKS Innovation Day 2026</strong> has been confirmed! Please find your personalized Digital Badge and Express Check-in QR Code below.
              </p>
            </td>
          </tr>

          <!-- PASS / QR BADGE CONTAINER -->
          <tr>
            <td align="center" style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#f8fafc" style="border:2px dashed #cbd5e1; border-radius:18px; padding:24px; text-align:center;">
                <tr>
                  <td align="center">
                    
                    <!-- Candidate Details Badge -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:18px;">
                      <tr>
                        <td align="center">
                          <span style="display:inline-block; padding:4px 12px; background:#e0f2fe; color:#0369a1; border-radius:999px; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:1px; margin-bottom:8px;">
                            Verified Attendee
                          </span>
                          <h2 style="margin:0; font-size:20px; font-weight:800; color:#0f172a;">
                            ${fullName}
                          </h2>
                          <p style="margin:4px 0 0 0; font-size:14px; font-weight:600; color:#ef2722;">
                            ${jobRole}
                          </p>
                          <p style="margin:2px 0 0 0; font-size:13px; color:#64748b;">
                            <strong>${companyName}</strong>${city}
                          </p>
                          <p style="margin:6px 0 0 0; font-family:monospace; font-size:11px; color:#94a3b8;">
                            Reg ID: ${id}
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- QR CODE IMAGE -->
                    <div style="background:#ffffff; display:inline-block; padding:14px; border-radius:14px; border:1px solid #e2e8f0; box-shadow:0 4px 12px rgba(0,0,0,0.04); margin-bottom:16px;">
                      <img src="${qrImageSrc}" alt="Your Attendance QR Code" width="200" height="200" style="display:block; border:0; width:200px; height:200px; margin:0 auto;" />
                    </div>

                    <!-- Scan Instructions -->
                    <p style="margin:0 0 14px 0; font-size:13px; font-weight:600; color:#0f172a;">
                      📲 Scan this QR code upon arrival to instantly mark your attendance!
                    </p>
                    <p style="margin:0 0 18px 0; font-size:12px; color:#64748b; line-height:1.5; max-width:440px;">
                      Present this badge at the reception desk at Hablis Hotel, or scan it with your smartphone camera to self-verify your check-in.
                    </p>

                    <!-- Direct Check-in / View Pass CTA -->
                    <a href="${checkinUrl}" target="_blank" style="display:inline-block; background-color:#ef2722; color:#ffffff; font-size:13px; font-weight:700; text-decoration:none; padding:11px 26px; border-radius:10px; box-shadow:0 4px 10px rgba(239,39,34,0.3);">
                      Open Digital Pass & Check-In
                    </a>

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- EVENT DETAILS SCHEDULE CARD -->
          <tr>
            <td style="padding:0 32px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#002b49" style="border-radius:16px; padding:20px; color:#ffffff;">
                <tr>
                  <td width="33%" align="center" style="padding:6px; border-right:1px solid rgba(255,255,255,0.15);">
                    <p style="margin:0; font-size:11px; text-transform:uppercase; color:#93c5fd; font-weight:700;">DATE</p>
                    <p style="margin:4px 0 0 0; font-size:13px; font-weight:800; color:#ffffff;">October 23, 2026</p>
                  </td>
                  <td width="33%" align="center" style="padding:6px; border-right:1px solid rgba(255,255,255,0.15);">
                    <p style="margin:0; font-size:11px; text-transform:uppercase; color:#93c5fd; font-weight:700;">TIME</p>
                    <p style="margin:4px 0 0 0; font-size:13px; font-weight:800; color:#ffffff;">09:00 AM – 02:00 PM</p>
                  </td>
                  <td width="33%" align="center" style="padding:6px;">
                    <p style="margin:0; font-size:11px; text-transform:uppercase; color:#93c5fd; font-weight:700;">VENUE</p>
                    <p style="margin:4px 0 0 0; font-size:12px; font-weight:800; color:#ffffff; line-height:1.2;">Hablis Hotel, Guindy, Chennai</p>
                  </td>
                </tr>
              </table>

              <div style="margin-top:14px; text-align:center;">
                <a href="https://maps.app.goo.gl/mUu2i567Ca8FwLG78" target="_blank" style="color:#0284c7; font-size:12px; font-weight:700; text-decoration:none;">
                  📍 View Location on Google Maps &rarr;
                </a>
              </div>
            </td>
          </tr>

          <!-- Agenda Quick Highlights -->
          <tr>
            <td style="padding:0 32px 24px;">
              <div style="background-color:#f8fafc; border-radius:14px; padding:18px 22px; border:1px solid #e2e8f0;">
                <p style="margin:0 0 10px 0; font-size:13px; font-weight:800; color:#0f172a; text-transform:uppercase; letter-spacing:0.5px;">
                  Quick Schedule
                </p>
                <ul style="margin:0; padding-left:18px; font-size:12px; line-height:1.8; color:#475569;">
                  <li><strong>09:00 AM – 10:00 AM:</strong> Registration, Welcome Breakfast &amp; Networking</li>
                  <li><strong>10:00 AM – 11:15 AM:</strong> Test-Drive SOLIDWORKS 2027 &amp; AI Features</li>
                  <li><strong>11:15 AM – 12:15 PM:</strong> AI Virtual Companions &amp; Real-World Case Studies</li>
                  <li><strong>12:15 PM – 01:00 PM:</strong> Interactive CAD, Expert Q&amp;A &amp; Live Demos</li>
                  <li><strong>01:00 PM – 02:00 PM:</strong> Networking Lunch &amp; Wrap-Up</li>
                </ul>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td bgcolor="#0f172a" style="padding:24px 32px; text-align:center; color:#94a3b8; font-size:12px;">
              <p style="margin:0 0 6px 0; font-weight:700; color:#ffffff; font-size:13px;">
                Conceptia KONNECT
              </p>
              <p style="margin:0 0 12px 0; line-height:1.4;">
                Authorized Dassault Systèmes Reseller &amp; Digital Engineering Partner<br>
                For any questions regarding your registration, contact <a href="mailto:info@conceptia.in" style="color:#ef4444; text-decoration:none;">info@conceptia.in</a>
              </p>
              <p style="margin:0; font-size:11px; color:#64748b;">
                &copy; 2026 Conceptia Software Technologies Pvt. Ltd. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
  }

  /**
   * Send single personalized attendance QR pass email
   */
  async sendAttendanceEmail(attendee, baseUrl) {
    if (!attendee || !attendee.workEmail) {
      throw new Error('Attendee email is required');
    }

    const { checkinUrl, buffer, dataUrl } = await qrService.generateAttendeeQr(attendee, baseUrl);

    if (!this.isConfigured()) {
      // Simulation / Preview Mode
      console.log(`[Email Simulation] Pass email generated for: ${attendee.fullName} <${attendee.workEmail}>`);
      console.log(`[Email Simulation] Checkin URL: ${checkinUrl}`);

      // Still mark email sent in database so workflow succeeds
      await dataService.markEmailSent(attendee._id || attendee.id);

      return {
        success: true,
        simulated: true,
        recipient: attendee.workEmail,
        fullName: attendee.fullName,
        jobRole: attendee.jobRole,
        checkinUrl,
        message: 'Email simulated successfully (SMTP not configured in server/.env). Attendance record updated.'
      };
    }

    const fullName = attendee.fullName || 'Valued Attendee';
    const textFallback = `Hello ${fullName},\n\nYour seat for SOLIDWORKS Innovation Day 2026 has been confirmed!\n\nEvent Details:\nDate: October 23, 2026\nTime: 09:00 AM – 02:00 PM\nVenue: Hablis Hotel, Guindy, Chennai\n\nYour Check-In & Digital Badge URL:\n${checkinUrl}\n\nPlease present this pass or show your attached QR code upon arrival.\n\nBest regards,\nConceptia KONNECT`;

    // 0. Brevo (Sendinblue) HTTP API Delivery (HTTPS Port 443 - Can send to ANY domain!)
    if (process.env.BREVO_API_KEY) {
      const brevoHtml = this.generateEmailHtml(attendee, checkinUrl, dataUrl);
      const senderEmail = process.env.BREVO_SENDER_EMAIL || process.env.SMTP_USER || 'monikashivakumar2001@gmail.com';
      const senderName = process.env.BREVO_SENDER_NAME || 'SOLIDWORKS Innovation Day 2026';

      const brevoPayload = {
        sender: {
          name: senderName,
          email: senderEmail
        },
        to: [
          {
            email: attendee.workEmail,
            name: fullName
          }
        ],
        subject: `Your Entry Pass & QR Code: SOLIDWORKS Innovation Day 2026 - ${fullName}`,
        htmlContent: brevoHtml,
        textContent: textFallback,
        attachment: [
          {
            name: `pass-${attendee._id || attendee.id}.png`,
            content: buffer.toString('base64')
          }
        ]
      };

      const brevoRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': process.env.BREVO_API_KEY,
          'content-type': 'application/json'
        },
        body: JSON.stringify(brevoPayload)
      });

      const brevoData = await brevoRes.json();
      if (!brevoRes.ok) {
        console.warn(`[Email Service] Brevo API notice:`, brevoData);
        if (!this.transporter && !process.env.RESEND_API_KEY) {
          throw new Error(brevoData.message || 'Brevo HTTP API failed to send email');
        }
      } else {
        await dataService.markEmailSent(attendee._id || attendee.id);

        return {
          success: true,
          provider: 'brevo',
          simulated: false,
          messageId: brevoData.messageId,
          recipient: attendee.workEmail,
          checkinUrl
        };
      }
    }

    // 1. Resend HTTP API Delivery (HTTPS Port 443 - Never blocked by Render firewall)
    if (process.env.RESEND_API_KEY) {
      // In HTML for Resend, embed the QR image dataUrl directly so it displays everywhere
      const resendHtml = this.generateEmailHtml(attendee, checkinUrl, dataUrl);
      const resendFrom = process.env.RESEND_FROM || 'SOLIDWORKS Event <onboarding@resend.dev>';

      const payload = {
        from: resendFrom,
        to: [attendee.workEmail],
        subject: `Your Entry Pass & QR Code: SOLIDWORKS Innovation Day 2026 - ${fullName}`,
        html: resendHtml,
        text: textFallback,
        attachments: [
          {
            filename: `pass-${attendee._id || attendee.id}.png`,
            content: buffer.toString('base64'),
          }
        ]
      };

      const resendRes = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const resendData = await resendRes.json();
      if (!resendRes.ok) {
        console.warn(`[Email Service] Resend API notice: ${resendData.message || 'Sandbox restriction'}`);
        if (this.transporter) {
          console.log('[Email Service] Automatically falling back to Gmail SMTP...');
        } else {
          throw new Error(resendData.message || 'Resend HTTP API failed to send email');
        }
      } else {
        await dataService.markEmailSent(attendee._id || attendee.id);

        return {
          success: true,
          provider: 'resend',
          simulated: false,
          messageId: resendData.id,
          recipient: attendee.workEmail,
          checkinUrl
        };
      }
    }

    // 2. Standard Nodemailer SMTP Send
    const html = this.generateEmailHtml(attendee, checkinUrl, 'cid:entry_pass_qr');
    const mailOptions = {
      from: this.getFromAddress(),
      to: attendee.workEmail,
      subject: `Your Entry Pass & QR Code: SOLIDWORKS Innovation Day 2026 - ${fullName}`,
      text: textFallback,
      html,
      attachments: [
        {
          filename: `pass-${attendee._id || attendee.id}.png`,
          content: buffer,
          contentType: 'image/png',
          contentDisposition: 'inline',
          cid: 'entry_pass_qr'
        }
      ]
    };

    const info = await this.transporter.sendMail(mailOptions);
    await dataService.markEmailSent(attendee._id || attendee.id);

    return {
      success: true,
      simulated: false,
      messageId: info.messageId,
      recipient: attendee.workEmail,
      checkinUrl
    };
  }

  /**
   * Send bulk attendance QR pass emails with throttling
   */
  async sendBulkAttendanceEmails(attendees, baseUrl, onProgress) {
    const results = {
      total: attendees.length,
      sent: 0,
      failed: 0,
      errors: [],
      details: []
    };

    for (let i = 0; i < attendees.length; i++) {
      const attendee = attendees[i];
      try {
        const res = await this.sendAttendanceEmail(attendee, baseUrl);
        results.sent++;
        results.details.push({
          id: attendee._id || attendee.id,
          name: attendee.fullName,
          email: attendee.workEmail,
          role: attendee.jobRole,
          status: 'success',
          simulated: res.simulated || false
        });
      } catch (err) {
        console.error(`Failed to send email to ${attendee.workEmail}:`, err);
        results.failed++;
        results.errors.push({
          email: attendee.workEmail,
          name: attendee.fullName,
          error: err.message
        });
        results.details.push({
          id: attendee._id || attendee.id,
          name: attendee.fullName,
          email: attendee.workEmail,
          status: 'error',
          error: err.message
        });
      }

      if (onProgress) {
        onProgress(i + 1, attendees.length);
      }

      // Small throttle to be courteous to SMTP servers
      if (i < attendees.length - 1) {
        await new Promise(r => setTimeout(r, 200));
      }
    }

    return results;
  }
}

export const emailService = new EmailService();
