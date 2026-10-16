import React, { useState, useEffect, useRef, useCallback } from 'react';
import jsQR from 'jsqr';
import {
  Camera,
  CameraOff,
  RefreshCw,
  Upload,
  Search,
  CheckCircle2,
  AlertCircle,
  UserCheck,
  Building,
  Briefcase,
  Mail,
  Phone,
  MapPin,
  Volume2,
  VolumeX,
  QrCode,
  Sparkles,
  Clock,
  X,
  ArrowRight
} from 'lucide-react';
import { api } from '../services/api';

/**
 * Extracts attendee Registration ID from a QR code payload (URL or raw ID)
 */
function extractAttendeeId(rawText) {
  if (!rawText) return '';
  const trimmed = rawText.trim();

  // Match /api/registrations/checkin/:id or /checkin/:id
  const checkinMatch = trimmed.match(/\/checkin\/([a-zA-Z0-9_-]+)/i);
  if (checkinMatch && checkinMatch[1]) {
    return checkinMatch[1];
  }

  // If it's a URL with a path segment at the end
  try {
    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      const url = new URL(trimmed);
      const parts = url.pathname.split('/').filter(Boolean);
      if (parts.length > 0) {
        return parts[parts.length - 1];
      }
    }
  } catch (_) {
    // Not a valid URL, fall through
  }

  return trimmed;
}

/**
 * Plays a short synthesized audio tone using Web Audio API
 */
function playFeedbackSound(type = 'success') {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'success') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      osc.frequency.setValueAtTime(1318.5, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.28);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.28);
    } else if (type === 'already') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(587.33, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.25);
    } else {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.3);
    }
  } catch (_) {
    // Ignore audio errors if browser blocks autoplay
  }
}

export default function QrScannerSection({
  registrations = [],
  onCheckinSuccess,
  onViewAttendee
}) {
  const [cameraActive, setCameraActive] = useState(false);
  const [facingMode, setFacingMode] = useState('environment');
  const [cameraError, setCameraError] = useState('');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [scanResult, setScanResult] = useState(null); // { status: 'success'|'already'|'error', message, attendee, timestamp }
  const [manualInput, setManualInput] = useState('');

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);
  const lastScannedRef = useRef({ text: '', time: 0 });
  const fileInputRef = useRef(null);

  // Stop camera stream cleanly
  const stopCamera = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  }, []);

  // Process a decoded QR payload or attendee ID
  const handleProcessCheckin = useCallback(async (rawPayload) => {
    const extractedId = extractAttendeeId(rawPayload);
    if (!extractedId) return;

    try {
      setProcessing(true);
      const res = await api.checkinAttendee(extractedId);
      const isAlready = !!res.alreadyAttended;

      if (soundEnabled) {
        playFeedbackSound(isAlready ? 'already' : 'success');
      }

      setScanResult({
        status: isAlready ? 'already' : 'success',
        message: isAlready
          ? 'Attendee was already checked in earlier.'
          : 'Attendance confirmed! Welcome to SOLIDWORKS Innovation Day 2026.',
        attendee: res.data,
        timestamp: new Date()
      });

      if (onCheckinSuccess) {
        onCheckinSuccess(res.data);
      }
    } catch (err) {
      if (soundEnabled) {
        playFeedbackSound('error');
      }
      setScanResult({
        status: 'error',
        message: err.message || 'Invalid QR Code or Registration ID not found.',
        attendee: null,
        rawCode: extractedId,
        timestamp: new Date()
      });
    } finally {
      setProcessing(false);
    }
  }, [soundEnabled, onCheckinSuccess]);

  // Continuous frame scanning loop
  const scanVideoFrame = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
      const width = video.videoWidth;
      const height = video.videoHeight;

      if (width > 0 && height > 0) {
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        ctx.drawImage(video, 0, 0, width, height);

        const imageData = ctx.getImageData(0, 0, width, height);
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        });

        if (code && code.data) {
          const now = Date.now();
          const isSameRecent =
            lastScannedRef.current.text === code.data &&
            now - lastScannedRef.current.time < 3000;

          if (!isSameRecent) {
            lastScannedRef.current = { text: code.data, time: now };
            handleProcessCheckin(code.data);
          }
        }
      }
    }

    rafRef.current = requestAnimationFrame(scanVideoFrame);
  }, [handleProcessCheckin]);

  // Start camera stream
  const startCamera = useCallback(async (preferredFacing = facingMode) => {
    stopCamera();
    setCameraError('');

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setCameraError('Camera access is not supported in this browser or requires HTTPS / localhost.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: preferredFacing },
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      rafRef.current = requestAnimationFrame(scanVideoFrame);
    } catch (err) {
      console.error('Camera start error:', err);
      setCameraError(
        err.name === 'NotAllowedError'
          ? 'Camera permission denied. Please allow camera access in your browser address bar.'
          : `Unable to access camera: ${err.message}`
      );
      setCameraActive(false);
    }
  }, [facingMode, stopCamera, scanVideoFrame]);

  // Toggle Front / Back camera
  const handleSwitchCamera = () => {
    const nextFacing = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextFacing);
    if (cameraActive) {
      startCamera(nextFacing);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => stopCamera();
  }, [stopCamera]);

  // Decode QR from uploaded image file
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          handleProcessCheckin(code.data);
        } else {
          if (soundEnabled) playFeedbackSound('error');
          setScanResult({
            status: 'error',
            message: 'No valid QR code found in the uploaded image. Please try a clearer image.',
            attendee: null,
            timestamp: new Date()
          });
        }
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle manual / USB scanner form submit
  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualInput.trim()) return;

    const q = manualInput.trim();

    // If user pasted a checkin URL or exact 24-char Mongo ID, process directly
    if (q.includes('/checkin/') || /^[a-f0-9]{24}$/i.test(q)) {
      handleProcessCheckin(q);
      setManualInput('');
      return;
    }

    // Otherwise check if there's an exact email or single match in registrations
    const lower = q.toLowerCase();
    const exactMatch = registrations.find(
      r =>
        (r._id || r.id || '').toLowerCase() === lower ||
        (r.workEmail || '').toLowerCase() === lower ||
        (r.phoneNumber || '').replace(/\s+/g, '') === q.replace(/\s+/g, '')
    );

    if (exactMatch) {
      handleProcessCheckin(exactMatch._id || exactMatch.id);
      setManualInput('');
    }
  };

  // Filter matching attendees when typing in manual lookup
  const matchingAttendees = manualInput.trim().length >= 2
    ? registrations
        .filter(r => {
          const q = manualInput.trim().toLowerCase();
          return (
            (r.fullName && r.fullName.toLowerCase().includes(q)) ||
            (r.workEmail && r.workEmail.toLowerCase().includes(q)) ||
            (r.companyName && r.companyName.toLowerCase().includes(q)) ||
            (r.phoneNumber && r.phoneNumber.includes(q)) ||
            ((r._id || r.id || '').toLowerCase().includes(q))
          );
        })
        .slice(0, 6)
    : [];

  // Recently checked-in attendees
  const attendedList = registrations
    .filter(r => r.status === 'Attended')
    .sort((a, b) => new Date(b.attendedAt || b.updatedAt || 0) - new Date(a.attendedAt || a.updatedAt || 0));

  const totalConfirmedOrAttended = registrations.filter(
    r => r.status === 'Confirmed' || r.status === 'Attended'
  ).length;
  const attendancePercent = totalConfirmedOrAttended > 0
    ? Math.round((attendedList.length / totalConfirmedOrAttended) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Top Express Check-in Header & Live Progress */}
      <div className="bg-gradient-to-r from-slate-900 via-[#002b49] to-slate-900 rounded-3xl p-6 text-white shadow-lg border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-red/20 border border-brand-red/40 flex items-center justify-center flex-shrink-0">
              <QrCode className="w-6 h-6 text-brand-red" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                  Reception Desk Mode
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight mt-1">
                QR Pass Scanner &amp; Express Check-In
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Scan attendee QR passes via camera, upload a pass image, or search by name/email to mark attendance instantly.
              </p>
            </div>
          </div>

          {/* Live Check-in Progress Pill */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15">
            <div>
              <div className="text-[11px] uppercase tracking-wider text-slate-300 font-bold">
                Checked In
              </div>
              <div className="text-2xl font-black text-white">
                {attendedList.length}{' '}
                <span className="text-sm font-semibold text-slate-300">
                  / {totalConfirmedOrAttended}
                </span>
              </div>
            </div>
            <div className="h-10 w-px bg-white/15" />
            <div>
              <div className="text-[11px] uppercase tracking-wider text-emerald-300 font-bold">
                Turnout
              </div>
              <div className="text-2xl font-black text-emerald-400">
                {attendancePercent}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left = Camera & Manual Scanner, Right = Verification Result & Recent Scans */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Camera Viewfinder + Manual Lookup (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Camera Scanner Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 flex flex-wrap items-center justify-between gap-3 bg-slate-50/70">
              <div className="flex items-center gap-2.5">
                <Camera className="w-4 h-4 text-brand-red" />
                <span className="font-extrabold text-slate-900 text-sm">
                  Live Camera QR Scanner
                </span>
                {cameraActive && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Scanning
                  </span>
                )}
              </div>

              {/* Camera Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSoundEnabled(s => !s)}
                  title={soundEnabled ? 'Mute scan beep' : 'Enable scan beep'}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
                </button>

                {cameraActive && (
                  <button
                    type="button"
                    onClick={handleSwitchCamera}
                    title="Switch Front/Back Camera"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Flip Camera</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload QR Image</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {cameraActive ? (
                  <button
                    type="button"
                    onClick={stopCamera}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <CameraOff className="w-3.5 h-3.5" />
                    <span>Stop Camera</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => startCamera()}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-brand-red hover:bg-brand-redHover text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Start Camera</span>
                  </button>
                )}
              </div>
            </div>

            {/* Video Viewfinder */}
            <div className="p-6">
              <div className="relative w-full aspect-video max-h-[380px] bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800">
                <video
                  ref={videoRef}
                  playsInline
                  muted
                  className={`w-full h-full object-cover ${cameraActive ? 'block' : 'hidden'}`}
                />
                <canvas ref={canvasRef} className="hidden" />

                {/* Targeting Overlay when active */}
                {cameraActive && (
                  <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                    <div className="relative w-56 h-56 sm:w-64 sm:h-64 border-2 border-white/20 rounded-3xl">
                      {/* Corner Brackets */}
                      <div className="absolute -top-0.5 -left-0.5 w-8 h-8 border-t-4 border-l-4 border-brand-red rounded-tl-2xl" />
                      <div className="absolute -top-0.5 -right-0.5 w-8 h-8 border-t-4 border-r-4 border-brand-red rounded-tr-2xl" />
                      <div className="absolute -bottom-0.5 -left-0.5 w-8 h-8 border-b-4 border-l-4 border-brand-red rounded-bl-2xl" />
                      <div className="absolute -bottom-0.5 -right-0.5 w-8 h-8 border-b-4 border-r-4 border-brand-red rounded-br-2xl" />

                      {/* Animated Laser Line */}
                      <div className="absolute inset-x-3 top-1/2 h-0.5 bg-gradient-to-r from-transparent via-brand-red to-transparent shadow-[0_0_12px_#ef2722] animate-pulse" />
                    </div>
                    <p className="mt-4 px-3 py-1 rounded-full bg-slate-900/80 text-white text-xs font-semibold border border-white/10">
                      Hold attendee QR Code inside the frame
                    </p>
                  </div>
                )}

                {/* Placeholder when camera is off */}
                {!cameraActive && (
                  <div className="text-center p-6 max-w-md">
                    <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
                      <QrCode className="w-8 h-8 text-brand-red" />
                    </div>
                    <h4 className="text-white font-extrabold text-base">
                      Ready to Scan Attendee Badges
                    </h4>
                    <p className="text-slate-400 text-xs mt-1.5 leading-relaxed">
                      Click <strong>Start Camera</strong> to scan QR passes using your webcam or mobile camera, or upload a QR image file.
                    </p>
                    {cameraError && (
                      <div className="mt-4 p-3 rounded-xl bg-rose-950/90 border border-rose-700 text-rose-200 text-xs">
                        {cameraError}
                      </div>
                    )}
                    <div className="mt-5 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => startCamera()}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-red hover:bg-brand-redHover text-white text-xs font-extrabold shadow-lg transition-all"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Launch Camera Scanner</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Scan Image File</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Manual Search / USB Barcode Scanner Input Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                  <Search className="w-4 h-4 text-brand-red" />
                  <span>Quick Lookup / Hardware Barcode Scanner</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Scan with a USB QR scanner or type attendee name, email, phone, company, or Reg ID
                </p>
              </div>
            </div>

            <form onSubmit={handleManualSubmit} className="flex gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={manualInput}
                  onChange={e => setManualInput(e.target.value)}
                  placeholder="Paste QR link, Reg ID, or search name / email / phone..."
                  className="w-full pl-10 pr-9 py-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red"
                />
                {manualInput && (
                  <button
                    type="button"
                    onClick={() => setManualInput('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              <button
                type="submit"
                disabled={!manualInput.trim() || processing}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white text-xs font-extrabold transition-colors flex items-center gap-1.5"
              >
                <UserCheck className="w-4 h-4" />
                <span>Check In</span>
              </button>
            </form>

            {/* Instant Search Suggestions for 1-Click Check-in */}
            {matchingAttendees.length > 0 && (
              <div className="mt-4 divide-y divide-slate-100 border border-slate-200 rounded-2xl overflow-hidden">
                {matchingAttendees.map(att => {
                  const id = att._id || att.id;
                  const isAttended = att.status === 'Attended';
                  return (
                    <div
                      key={id}
                      className="p-3 bg-slate-50/60 hover:bg-slate-100/80 transition-colors flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-slate-900 text-xs truncate">
                            {att.fullName}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                              isAttended
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            }`}
                          >
                            {att.status}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {att.companyName} • {att.workEmail} • {att.phoneNumber}
                        </div>
                      </div>

                      <button
                        type="button"
                        disabled={processing}
                        onClick={() => handleProcessCheckin(id)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center gap-1.5 flex-shrink-0 transition-all ${
                          isAttended
                            ? 'bg-slate-200 text-slate-700 hover:bg-slate-300'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm'
                        }`}
                      >
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>{isAttended ? 'Verify Again' : 'Mark Attended'}</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Live Scan Verification Result + Recent Check-ins Log (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Latest Scan Result Card */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-brand-red" />
                <span>Pass Verification Status</span>
              </span>
              {scanResult && (
                <button
                  type="button"
                  onClick={() => setScanResult(null)}
                  className="text-xs text-slate-400 hover:text-slate-600 font-semibold"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="p-6">
              {processing ? (
                <div className="py-12 text-center space-y-3">
                  <div className="w-10 h-10 rounded-full border-3 border-slate-200 border-t-brand-red animate-spin mx-auto" />
                  <p className="text-xs font-bold text-slate-600">
                    Verifying pass &amp; recording attendance...
                  </p>
                </div>
              ) : !scanResult ? (
                <div className="py-10 text-center text-slate-400">
                  <UserCheck className="w-10 h-10 mx-auto mb-2 opacity-25" />
                  <p className="font-bold text-slate-700 text-sm">
                    Waiting for QR Scan
                  </p>
                  <p className="text-xs mt-1 max-w-xs mx-auto">
                    Scan any attendee QR badge or select an attendee from the search box to verify their pass.
                  </p>
                </div>
              ) : scanResult.status === 'error' ? (
                <div className="rounded-2xl bg-rose-50 border-2 border-rose-200 p-5 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                    <AlertCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-rose-200 text-rose-800">
                      Verification Failed
                    </span>
                    <h4 className="text-base font-extrabold text-rose-950 mt-2">
                      Invalid or Unrecognized Pass
                    </h4>
                    <p className="text-xs text-rose-700 mt-1">
                      {scanResult.message}
                    </p>
                    {scanResult.rawCode && (
                      <p className="text-[11px] font-mono text-rose-500 mt-2 break-all">
                        Code: {scanResult.rawCode}
                      </p>
                    )}
                  </div>
                </div>
              ) : (
                <div
                  className={`rounded-2xl border-2 p-5 space-y-4 ${
                    scanResult.status === 'already'
                      ? 'bg-amber-50/70 border-amber-300'
                      : 'bg-emerald-50/70 border-emerald-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                          scanResult.status === 'already'
                            ? 'bg-amber-500 text-white'
                            : 'bg-emerald-600 text-white'
                        }`}
                      >
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                      <div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                            scanResult.status === 'already'
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-emerald-200 text-emerald-900'
                          }`}
                        >
                          {scanResult.status === 'already' ? 'Already Checked In' : 'Check-In Confirmed'}
                        </span>
                        <h4 className="text-lg font-black text-slate-900 mt-1">
                          {scanResult.attendee?.fullName}
                        </h4>
                        <p className="text-xs font-bold text-brand-red">
                          {scanResult.attendee?.jobRole}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Attendee Details Breakdown */}
                  <div className="bg-white rounded-xl p-3.5 border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex items-center gap-2 text-slate-700">
                      <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="font-bold">{scanResult.attendee?.companyName}</span>
                    </div>
                    {scanResult.attendee?.city && (
                      <div className="flex items-center gap-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                        <span>{scanResult.attendee.city}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-slate-600">
                      <Mail className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="font-mono text-[11px]">{scanResult.attendee?.workEmail}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Phone className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                      <span className="font-mono">{scanResult.attendee?.phoneNumber}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-500 font-medium">
                      {scanResult.message}
                    </span>
                    {onViewAttendee && scanResult.attendee && (
                      <button
                        type="button"
                        onClick={() => onViewAttendee(scanResult.attendee)}
                        className="inline-flex items-center gap-1 text-xs font-extrabold text-slate-900 hover:text-brand-red"
                      >
                        <span>Details</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Recent Check-Ins Feed */}
          <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between">
              <span className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>Recent Check-Ins ({attendedList.length})</span>
              </span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[320px] overflow-y-auto">
              {attendedList.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No attendees have checked in yet.
                </div>
              ) : (
                attendedList.slice(0, 15).map(att => {
                  const id = att._id || att.id;
                  return (
                    <div
                      key={id}
                      onClick={() => onViewAttendee && onViewAttendee(att)}
                      className="px-5 py-3 hover:bg-slate-50 transition-colors flex items-center justify-between gap-3 cursor-pointer"
                    >
                      <div className="min-w-0">
                        <div className="font-bold text-slate-900 text-xs truncate">
                          {att.fullName}
                        </div>
                        <div className="text-[11px] text-slate-500 truncate">
                          {att.companyName} • {att.jobRole}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                          <UserCheck className="w-2.5 h-2.5" />
                          Attended
                        </span>
                        {att.attendedAt && (
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {new Date(att.attendedAt).toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
