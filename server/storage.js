import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');
const EVENT_FILE = path.join(DATA_DIR, 'event.json');

export const defaultEventData = {
  hero: {
    invitationTag: "YOU'RE INVITED TO",
    titlePrefix: "SOLIDWORKS",
    titleHighlight: "Innovation Day 2026",
    tagline: "Smarter Design. Faster Innovation.",
    description: "Discover the latest in SOLIDWORKS and 3DEXPERIENCE and how it can power your next big idea.",
    ctaText: "REGISTER NOW",
    heroImage: "/assets/turbine.png"
  },
  info: {
    dates: "November 13, 2026",
    time: "09:00 AM – 02:00 PM",
    venueName: "Novotel Kochi Infopark",
    venueAddress: "Kakkanad, Kochi, Kerala 682030",
    mode: "In-Person Event"
  },
  registrationForm: {
    title: "Register Now",
    subtitle: "Secure your spot for this exclusive event.",
    buttonText: "Register Now",
    roles: [
      "Design Engineer",
      "CAD / Mechanical Engineer",
      "R&D Manager / Lead",
      "Engineering Director",
      "Manufacturing Specialist",
      "Academic / Student",
      "Other"
    ]
  },
  agenda: [
    {
      id: "ag-1",
      time: "09:00 AM – 10:00 AM",
      title: "Registration & Networking",
      icon: "user",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-2",
      time: "10:00 AM – 10:45 AM",
      title: "SOLIDWORKS 2026 – What's New",
      icon: "monitor",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-3",
      time: "11:00 AM – 12:00 PM",
      title: "Industry Applications & Customer Success Stories",
      icon: "settings",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-4",
      time: "12:00 PM – 01:00 PM",
      title: "Expert Panel Discussion",
      icon: "users",
      badgeColor: "bg-red-500"
    },
    {
      id: "ag-5",
      time: "01:00 PM – 02:00 PM",
      title: "Lunch & Networking",
      icon: "utensils",
      badgeColor: "bg-red-500"
    }
  ],
  speakers: [
    {
      id: "sp-1",
      name: "Priya Sharma",
      designation: "VP, Digital Engineering Solutions",
      photoUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "sp-2",
      name: "Alexander Reed",
      designation: "Principal 3D Design Architect",
      photoUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
    },
    {
      id: "sp-3",
      name: "Karthik Nair",
      designation: "Lead SOLIDWORKS Evangelist & Specialist",
      photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    }
  ],
  venue: {
    name: "Novotel Kochi Infopark",
    address: "Kakkanad, Kochi, Kerala 682030",
    directionsUrl: "https://www.google.com/maps/search/?api=1&query=Novotel+Kochi+Infopark+Kakkanad",
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800"
  },
  highlights: [
    {
      id: "hl-1",
      title: "Latest Product Updates",
      icon: "calendar",
      description: "Get first-hand look at SOLIDWORKS 2026 features."
    },
    {
      id: "hl-2",
      title: "Live Demos & Real-World Use Cases",
      icon: "presentation",
      description: "Deep dive into real-world simulation and modeling."
    },
    {
      id: "hl-3",
      title: "Expert Networking",
      icon: "users",
      description: "Connect with 250+ top engineering professionals."
    },
    {
      id: "hl-4",
      title: "Exclusive Customer Stories",
      icon: "award",
      description: "Inspiring transformations from premier companies."
    }
  ],
  partners: {
    eventPartner: {
      name: "SolidCAM",
      tagline: "The Leaders in Integrated CAM",
      logo: "/assets/solidcam.png"
    },
    ecosystemBrands: [
      { name: "SOLIDWORKS", logo: "/assets/solidworks-brand.png" },
      { name: "3DEXPERIENCE", logo: "/assets/3dexperience.png" },
      { name: "SIMULIA", logo: "/assets/simulia.png" },
      { name: "DraftSight", logo: "/assets/draftsight.png" }
    ]
  },
  branding: {
    companyName: "Conceptia KONNECT",
    companyTagline: "Your Trusted Digital Solutions Partner",
    primaryColor: "#dc2626",
    secondaryColor: "#111827"
  }
};

// Helpers for file persistence
function readJSON(file, fallback) {
  try {
    if (fs.existsSync(file)) {
      const raw = fs.readFileSync(file, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error(`Error reading ${file}:`, err);
  }
  return fallback;
}

function writeJSON(file, data) {
  try {
    fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf-8');
  } catch (err) {
    console.error(`Error writing to ${file}:`, err);
  }
}

// In-file store
export const localStore = {
  getEventData() {
    return readJSON(EVENT_FILE, defaultEventData);
  },
  saveEventData(data) {
    writeJSON(EVENT_FILE, data);
    return data;
  },
  getRegistrations() {
    const list = readJSON(REGISTRATIONS_FILE, []);
    return list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },
  addRegistration(record) {
    const list = readJSON(REGISTRATIONS_FILE, []);
    const newRecord = {
      _id: 'reg_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
      ...record,
      status: record.status || 'Confirmed',
      createdAt: new Date().toISOString()
    };
    list.unshift(newRecord);
    writeJSON(REGISTRATIONS_FILE, list);
    return newRecord;
  },
  updateRegistrationStatus(id, status) {
    const list = readJSON(REGISTRATIONS_FILE, []);
    const index = list.findIndex(r => r._id === id || r.id === id);
    if (index !== -1) {
      list[index].status = status;
      writeJSON(REGISTRATIONS_FILE, list);
      return list[index];
    }
    return null;
  },
  deleteRegistration(id) {
    let list = readJSON(REGISTRATIONS_FILE, []);
    const initialLen = list.length;
    list = list.filter(r => r._id !== id && r.id !== id);
    writeJSON(REGISTRATIONS_FILE, list);
    return list.length < initialLen;
  }
};
