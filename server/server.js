import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB } from './db.js';
import eventRoutes from './routes/eventRoutes.js';
import registrationRoutes from './routes/registrationRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { dataService } from './services/dataService.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving
const publicDir = path.join(__dirname, 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

app.use(express.static(publicDir));
app.use('/assets', express.static(publicDir));
app.use('/uploads', express.static(uploadsDir));

// API Routes
app.use('/api/event', eventRoutes);
app.use('/api/registrations', registrationRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'SOLIDWORKS Innovation Day API'
  });
});

// Seed initial sample registrations if empty
async function seedInitialRegistrations() {
  const existing = await dataService.getAllRegistrations();
  if (existing.length === 0) {
    const samples = [
      {
        fullName: 'Rahul Varma',
        workEmail: 'rahul.varma@tcs.com',
        phoneNumber: '+91 98451 23456',
        companyName: 'Tata Consultancy Services',
        jobRole: 'CAD / Mechanical Engineer',
        status: 'Confirmed'
      },
      {
        fullName: 'Ananya Deshmukh',
        workEmail: 'ananya.d@mahindra.com',
        phoneNumber: '+91 97123 45678',
        companyName: 'Mahindra R&D',
        jobRole: 'R&D Manager / Lead',
        status: 'Confirmed'
      },
      {
        fullName: 'Vipin George',
        workEmail: 'vipin.george@lnttech.com',
        phoneNumber: '+91 94471 89012',
        companyName: 'L&T Technology Services',
        jobRole: 'Design Engineer',
        status: 'Pending'
      }
    ];

    for (const sample of samples) {
      await dataService.createRegistration(sample);
    }
    console.log('[Seed] Added sample nominations for demonstration.');
  }
}

// Start Server
async function startServer() {
  await connectDB();
  await seedInitialRegistrations();

  app.listen(PORT, () => {
    console.log(`🚀 SOLIDWORKS Innovation Day API is running at http://localhost:${PORT}`);
  });
}

startServer();
