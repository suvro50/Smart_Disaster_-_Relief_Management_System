import api from "./api";

export const weatherService = {
  byDistrict: async (district) => {
    const response = await api.get(`/weather/${district}`);
    return response.data.data;
  }
};
