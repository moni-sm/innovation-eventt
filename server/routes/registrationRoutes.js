import express from 'express';
import { dataService } from '../services/dataService.js';

const router = express.Router();

// POST /api/registrations - Register / nominate
router.post('/', async (req, res) => {
  try {
    const { fullName, workEmail, phoneNumber, companyName, jobRole } = req.body;

    if (!fullName || !workEmail || !phoneNumber || !companyName || !jobRole) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required: Full Name, Work Email, Phone Number, Company Name, and Job Role.'
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid work email address.'
      });
    }

    const newRecord = await dataService.createRegistration({
      fullName: fullName.trim(),
      workEmail: workEmail.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      companyName: companyName.trim(),
      jobRole: jobRole.trim(),
      status: 'Confirmed'
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful! See you at SOLIDWORKS Innovation Day 2026.',
      data: newRecord
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ success: false, message: 'Internal server error while processing registration.' });
  }
});

// GET /api/registrations - List with search, filter, pagination
router.get('/', async (req, res) => {
  try {
    const { search = '', status = '', role = '' } = req.query;
    let registrations = await dataService.getAllRegistrations();

    if (search) {
      const q = search.toLowerCase();
      registrations = registrations.filter(
        r =>
          (r.fullName && r.fullName.toLowerCase().includes(q)) ||
          (r.workEmail && r.workEmail.toLowerCase().includes(q)) ||
          (r.companyName && r.companyName.toLowerCase().includes(q)) ||
          (r.phoneNumber && r.phoneNumber.includes(q))
      );
    }

    if (status && status !== 'All') {
      registrations = registrations.filter(r => r.status === status);
    }

    if (role && role !== 'All') {
      registrations = registrations.filter(r => r.jobRole === role);
    }

    res.json({
      success: true,
      count: registrations.length,
      data: registrations
    });
  } catch (err) {
    console.error('Error fetching registrations:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve registrations' });
  }
});

// GET /api/registrations/stats - KPI Summary & Breakdown
router.get('/stats', async (req, res) => {
  try {
    const registrations = await dataService.getAllRegistrations();
    const total = registrations.length;
    const confirmed = registrations.filter(r => r.status === 'Confirmed').length;
    const pending = registrations.filter(r => r.status === 'Pending').length;
    const attended = registrations.filter(r => r.status === 'Attended').length;

    // Breakdown by role
    const roleMap = {};
    registrations.forEach(r => {
      const role = r.jobRole || 'Other';
      roleMap[role] = (roleMap[role] || 0) + 1;
    });

    // Breakdown by top companies
    const companyMap = {};
    registrations.forEach(r => {
      const comp = r.companyName || 'Unknown';
      companyMap[comp] = (companyMap[comp] || 0) + 1;
    });

    res.json({
      success: true,
      stats: {
        total,
        confirmed,
        pending,
        attended,
        roleBreakdown: roleMap,
        companyBreakdown: companyMap
      }
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ success: false, message: 'Failed to retrieve stats' });
  }
});

// PATCH /api/registrations/:id/status - Update nomination status
router.patch('/:id/status', async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['Confirmed', 'Pending', 'Attended', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updated = await dataService.updateRegistrationStatus(id, status);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Registration record not found' });
    }

    res.json({ success: true, message: 'Status updated', data: updated });
  } catch (err) {
    console.error('Update status error:', err);
    res.status(500).json({ success: false, message: 'Failed to update status' });
  }
});

// DELETE /api/registrations/:id - Delete nomination
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const success = await dataService.deleteRegistration(id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Registration not found' });
    }
    res.json({ success: true, message: 'Registration deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete registration' });
  }
});

// GET /api/registrations/export/csv - Download nominations CSV
router.get('/export/csv', async (req, res) => {
  try {
    const registrations = await dataService.getAllRegistrations();

    const headers = ['ID', 'Full Name', 'Work Email', 'Phone Number', 'Company Name', 'Job Role', 'Status', 'Registered Date'];
    const rows = registrations.map(r => [
      `"${r._id || r.id || ''}"`,
      `"${(r.fullName || '').replace(/"/g, '""')}"`,
      `"${(r.workEmail || '').replace(/"/g, '""')}"`,
      `"${(r.phoneNumber || '').replace(/"/g, '""')}"`,
      `"${(r.companyName || '').replace(/"/g, '""')}"`,
      `"${(r.jobRole || '').replace(/"/g, '""')}"`,
      `"${r.status || 'Confirmed'}"`,
      `"${new Date(r.createdAt).toLocaleString()}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map(row => row.join(','))].join('\r\n');

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename=solidworks_nominations_${Date.now()}.csv`);
    res.status(200).send(csvContent);
  } catch (err) {
    console.error('Export CSV error:', err);
    res.status(500).json({ success: false, message: 'Failed to generate CSV export' });
  }
});

export default router;
