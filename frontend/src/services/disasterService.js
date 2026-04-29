import api from "./api";

export const disasterService = {
  getAll: async (params = {}) => {
    const response = await api.get("/disasters", { params });
    return response.data.data;
  },
  predictRisk: async (payload) => {
    const response = await api.post("/disasters/risk-score", payload);
    return response.data.data;
  }
};
