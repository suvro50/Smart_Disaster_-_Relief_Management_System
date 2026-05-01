import api from "./api";

export const alertService = {
  getAll: async () => {
    const response = await api.get("/alerts");
    return response.data.data;
  },
  create: async (payload) => {
    const response = await api.post("/alerts", payload);
    return response.data.data;
  },
  deactivate: async (id) => {
    const response = await api.put(`/alerts/${id}/deactivate`);
    return response.data.data;
  }
};
