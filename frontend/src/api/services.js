import api from './axios.js';

export const propertyService = {
  getProperties: async () => {
    const response = await api.get('/properties');
    return response.data;
  },
  getProperty: async (id) => {
    const response = await api.get(`/properties/${id}`);
    return response.data;
  },
  createProperty: async (data) => {
    const response = await api.post('/properties', data);
    return response.data;
  },
  updateProperty: async (id, data) => {
    const response = await api.put(`/properties/${id}`, data);
    return response.data;
  },
  deleteProperty: async (id) => {
    const response = await api.delete(`/properties/${id}`);
    return response.data;
  }
};

export const tenantService = {
  getTenants: async () => {
    const response = await api.get('/tenants');
    return response.data;
  },
  addTenant: async (data) => {
    const response = await api.post('/tenants', data);
    return response.data;
  },
  getTenantById: async (id) => {
    const response = await api.get(`/tenants/${id}`);
    return response.data;
  }
};

export const paymentService = {
  getPayments: async () => {
    const response = await api.get('/payments');
    return response.data;
  },
  recordPayment: async (data) => {
    const response = await api.post('/payments', data);
    return response.data;
  },
  getSummary: async () => {
    const response = await api.get('/payments/stats/summary');
    return response.data;
  },
  getTenantPayments: async (tenantId) => {
    const response = await api.get(`/payments/tenant/${tenantId}`);
    return response.data;
  }
};

export const complaintService = {
  getComplaints: async () => {
    const response = await api.get('/complaints');
    return response.data;
  },
  createComplaint: async (data) => {
    const response = await api.post('/complaints', data);
    return response.data;
  },
  updateStatus: async (id, status) => {
    const response = await api.patch(`/complaints/${id}`, { status });
    return response.data;
  }
};

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  }
};
