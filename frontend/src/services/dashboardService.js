import api from "./api";

export const dashboardService = {
  getStats: async () => {
    const response = await api.get("/dashboard/stats");
    return response.data.data;
  },
  getLiveFeed: async () => {
    const response = await api.get("/dashboard/live-feed");
    return response.data.data;
  }
};
