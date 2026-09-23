const BASE = import.meta.env.VITE_API_URL || '/api';

export const api = {
  async getRegistrations({ search = '', status = '', role = '' } = {}) {
    const q = new URLSearchParams();
    if (search) q.append('search', search);
    if (status && status !== 'All') q.append('status', status);
    if (role   && role   !== 'All') q.append('role',   role);
    const res = await fetch(`${BASE}/registrations${q.toString() ? '?' + q : ''}`);
    if (!res.ok) throw new Error('Failed to fetch registrations');
    return res.json();
  },

  async getStats() {
    const res = await fetch(`${BASE}/registrations/stats`);
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  async updateStatus(id, status) {
    const res = await fetch(`${BASE}/registrations/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (!res.ok) throw new Error('Failed to update status');
    return res.json();
  },

  async deleteRegistration(id) {
    const res = await fetch(`${BASE}/registrations/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete registration');
    return res.json();
  },

  getExportCsvUrl() {
    return `${BASE}/registrations/export/csv`;
  }
};
