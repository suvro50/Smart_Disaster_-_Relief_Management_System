import api from "./api";

export const evacuationService = {
  getAll: async () => {
    const response = await api.get("/evacuation-zones");
    return response.data.data;
  },
  create: async (payload) => {
    const response = await api.post("/evacuation-zones", payload);
    return response.data.data;
  },
  update: async (id, payload) => {
    const response = await api.put(`/evacuation-zones/${id}`, payload);
    return response.data.data;
  }
};
