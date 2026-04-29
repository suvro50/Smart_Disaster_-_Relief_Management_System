import api from "./api";

export const evacuationService = {
  getAll: async () => {
    const response = await api.get("/evacuation-zones");
    return response.data.data;
  }
};
