import api from "./api";

export const disasterService = {
  getAll: async (params = {}) => {
    const response = await api.get("/disasters", { params });
    return response.data.data;
  },
  create: async (payload) => {
    const response = await api.post("/disasters", payload);
    return response.data.data;
  },
  update: async (id, payload) => {
    const response = await api.put(`/disasters/${id}`, payload);
    return response.data.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/disasters/${id}`);
    return response.data.data;
  },
  predictRisk: async (payload) => {
    const response = await api.post("/disasters/risk-score", payload);
    return response.data.data;
  }
};
