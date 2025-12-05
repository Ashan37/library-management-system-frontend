import { create } from "zustand";
import { AuthService } from "../services/authService";

export const useAuthStore = create((set) => ({
  user: null,

  login: async (data: any) => {
    const res = await AuthService.login(data);
    set({ user: res.data });
  },

  registerUser: async (data: any) => {
    await AuthService.register(data);
  },
}));
