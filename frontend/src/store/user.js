import { create } from "zustand";
import api from "../utils/api";

export const useUserStore = create((set) => ({
  user: null,
  token: localStorage.getItem("token") || "",

  setUser: (user) => set({ user }),

  login: async ({ email, password }) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      set({ user, token });

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  },

  signup: async ({ email, password }) => {
    try {
      const res = await api.post("/auth/signup", { email, password });
      const { user, token } = res.data;

      localStorage.setItem("token", token);
      set({ user, token });

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Signup failed",
      };
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: "" });
  },
}));
