import api from "./api";

export const aidService = {
  getAll: async () => {
    const response = await api.get("/aid-requests");
    return response.data.data;
  },
  getById: async (id) => {
    const response = await api.get(`/aid-requests/${id}`);
    return response.data.data;
  },
  create: async (payload) => {
    const response = await api.post("/aid-requests", payload);
    return response.data.data;
  },
  update: async (id, payload) => {
    const response = await api.put(`/aid-requests/${id}`, payload);
    return response.data.data;
  }
};
