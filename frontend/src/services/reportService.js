import api from "./api";

export const reportService = {
  getAll: async () => {
    const response = await api.get("/reports");
    return response.data.data;
  },
  createMonthlySummary: async (month) => {
    const response = await api.post("/reports/monthly-summary", { month });
    return response.data.data;
  },
  exportPdf: async (id) => {
    const response = await api.get(`/reports/${id}/export?format=pdf`, { responseType: "blob" });
    return response.data;
  },
  exportCsv: async (id) => {
    const response = await api.get(`/reports/${id}/export?format=csv`, { responseType: "blob" });
    return response.data;
  }
};
