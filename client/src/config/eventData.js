/**
 * Centralized Event Content Configuration
 * You can easily modify any texts, dates, speakers, and images here or via server/data/event.json
 */
export const defaultEventConfig = {
  hero: {
    invitationTag: "YOU'RE INVITED TO",
    titlePrefix: "SOLIDWORKS",
    titleHighlight: "Innovation Day 2026",
    tagline: "Smarter Design. Faster Innovation.",
    description: "Discover the latest in SOLIDWORKS and 3DEXPERIENCE and how it can power your next big idea.",
    ctaText: "REGISTER NOW",
    heroImage: "/assets/turbine.png" // Replace with any image URL or path
  },
  info: {
    dates: "November 13, 2026",
    time: "09:00 AM – 02:00 PM",
    venueName: "Hablis Hotel Chennai",
    venueAddress: " 19, Grand Southern Trunk (GST) Road, Guindy, Chennai, Tamil Nadu 600032",
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
      icon: "user"
    },
    {
      id: "ag-2",
      time: "10:00 AM – 10:45 AM",
      title: "SOLIDWORKS 2026 – What's New",
      icon: "monitor"
    },
    {
      id: "ag-3",
      time: "11:00 AM – 12:00 PM",
      title: "Industry Applications & Customer Success Stories",
      icon: "settings"
    },
    {
      id: "ag-4",
      time: "12:00 PM – 01:00 PM",
      title: "Expert Panel Discussion",
      icon: "users"
    },
    {
      id: "ag-5",
      time: "01:00 PM – 02:00 PM",
      title: "Lunch & Networking",
      icon: "utensils"
    }
  ],
  speakers: [
    {
      id: "sp-1",
      name: "Vijay Karthik Dhanapal",
      designation: "Partner Sales Manager, Dassault Systemes",
      photoUrl: "/uploads/Vijay-Karthik-Dhanapal.png"
    },
    {
      id: "sp-2",
      name: "Ramesh Aravind",
      designation: "Principal 3D Design Architect",
      photoUrl: "/uploads/ramesh-aravind.jpg"
    },
    {
      id: "sp-3",
      name: "Mohamed Riswan M",
      designation: "Lead SOLIDWORKS Evangelist & Specialist",
      photoUrl: "/uploads/Mohamed Riswan M.png"
    },
    {
      id: "sp-4",
      name: "Mahendra H",
      designation: "Product Manager,Simulation Solutions",
      photoUrl: "/uploads/Mahendra H.png"
    },
    {
      id: "sp-5",
      name: "sathish",
      designation: "Lead SOLIDWORKS Evangelist & Specialist",
      photoUrl: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400"
    }
  ],
  venue: {
    name: "Hablis Hotel Chennai",
    address: " 19, Grand Southern Trunk (GST) Road, Guindy, Chennai, Tamil Nadu 600032",
    directionsUrl: "https://maps.app.goo.gl/mUu2i567Ca8FwLG78",
    imageUrl: "https://lh3.googleusercontent.com/gps-cs-s/AHRPTWkD101tjl_C92FsvKQf1xGDk3z-pEuVeaHyRDq3sSq8mj1Zcj3b0GNv8_ImN3gHut2Hu5h_0bUT0HaGaMjRcfY_poaG8blSWDtG1Teinh9c8Jdqm7NFD-8rSyNSt_U_-i4jAa4qSA=s1360-w1360-h1020-rw"
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
      tagline: "The Leaders in Integrated CAM"
    }
  },
  branding: {
    companyName: "Conceptia KONNECT",
    companyTagline: "Your Trusted Digital Solutions Partner"
  }
};
