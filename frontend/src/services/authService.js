import api from "./api";

export const authService = {
  login: async (payload) => {
    const response = await api.post("/auth/login", payload);
    return response.data.data;
  },
  register: async (payload) => {
    const response = await api.post("/auth/register", payload);
    return response.data.data;
  },
  verifyEmail: async (payload) => {
    const response = await api.post("/auth/verify-email", payload);
    return response.data.data;
  },
  me: async () => {
    const response = await api.get("/auth/me");
    return response.data.data;
  },
  getUsers: async () => {
    const response = await api.get("/auth/users");
    return response.data.data;
  },
  updateUser: async (id, payload) => {
    const response = await api.put(`/auth/${id}`, payload);
    return response.data.data;
  }
};
