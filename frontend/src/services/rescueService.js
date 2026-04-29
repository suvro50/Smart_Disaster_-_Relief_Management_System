import api from "./api";

export const rescueService = {
  getAll: async () => {
    const response = await api.get("/rescue-teams");
    return response.data.data;
  },
  getMissionHistory: async (teamId) => {
    const response = await api.get(`/rescue-teams/${teamId}/missions`);
    return response.data.data;
  }
};
