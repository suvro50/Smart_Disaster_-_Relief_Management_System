import api from "./api";

export const aidService = {
  getAll: async () => {
    const response = await api.get("/aid-requests");
    return response.data.data;
  },
  create: async (payload) => {
    const response = await api.post("/aid-requests", payload);
    return response.data.data;
  }
};
