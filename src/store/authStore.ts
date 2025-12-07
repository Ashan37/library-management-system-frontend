import { create } from "zustand";
import { AuthService } from "../services/authService";

type User = {
  id: number;
  email: string;
  name: string;
  password: string;
};

type AuthState = {
  user: User | null;
  login: (data: { email: string; password: string }) => Promise<void>;
  registerUser: (data: { name: string; email: string; password: string }) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,

  login: async (data) => {
    const res = await AuthService.login(data);
    set({ user: res.data });
  },

  registerUser: async (data) => {
    await AuthService.register(data);
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem("token");
  },
}));
