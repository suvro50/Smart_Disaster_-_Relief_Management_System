import api from "./api";

export const resourceService = {
  getAll: async () => {
    const response = await api.get("/resources");
    return response.data.data;
  },
  create: async (payload) => {
    const response = await api.post("/resources", payload);
    return response.data.data;
  },
  update: async (id, payload) => {
    const response = await api.put(`/resources/${id}`, payload);
    return response.data.data;
  },
  getLowStock: async () => {
    const response = await api.get("/resources/low-stock");
    return response.data.data;
  },
  getAnalytics: async () => {
    const response = await api.get("/resources/analytics");
    return response.data.data;
  },
  getAllocations: async () => {
    const response = await api.get("/resources/allocations");
    return response.data.data;
  },
  allocateToDisaster: async (resourceId, disasterId, payload) => {
    const response = await api.post(`/resources/${resourceId}/allocate/${disasterId}`, payload);
    return response.data.data;
  }
};
