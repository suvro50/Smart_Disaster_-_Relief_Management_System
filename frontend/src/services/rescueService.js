import api from "./api";

export const rescueService = {
  getAll: async () => {
    const response = await api.get("/rescue-teams");
    return response.data.data;
  },
  getById: async (id) => {
    const response = await api.get(`/rescue-teams/${id}`);
    return response.data.data;
  },
  getMissions: async () => {
    const response = await api.get("/rescue-teams/my-missions");
    return response.data.data;
  },
  getMissionHistory: async (teamId) => {
    const response = await api.get(`/rescue-teams/${teamId}/missions`);
    return response.data.data;
  },
  updateMission: async (id, payload) => {
    const response = await api.put(`/aid-requests/${id}`, payload);
    return response.data.data;
  }
};
