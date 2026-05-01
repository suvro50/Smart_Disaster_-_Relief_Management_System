import api from "./api";

export const volunteerService = {
  getAll: async () => {
    const response = await api.get("/volunteers");
    return response.data.data;
  },
  register: async (payload) => {
    const response = await api.post("/volunteers", payload);
    return response.data.data;
  },
  approve: async (id) => {
    const response = await api.put(`/volunteers/${id}/approve`);
    return response.data.data;
  },
  assignToTeam: async (id, teamId) => {
    const response = await api.put(`/volunteers/${id}/assign-team/${teamId}`);
    return response.data.data;
  }
};
