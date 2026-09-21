import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import { api } from './services/api';

export default function App() {
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getEventContent()
      .then(res => { if (res.success) setEventData(res.data); })
      .catch(err => console.error('Failed to load event data:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white space-y-4 font-sans">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-slate-800 border-t-red-600 animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center font-bold text-xs text-red-500">3DS</div>
        </div>
        <p className="text-slate-400 font-medium text-sm animate-pulse tracking-wide">
          Loading SOLIDWORKS Innovation Day...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar eventData={eventData} />
      <LandingPage eventData={eventData} />
    </div>
  );
}
