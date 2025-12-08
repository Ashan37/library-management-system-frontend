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
  token: string | null;
  isAuthenticated: boolean;
  login: (data: { email: string; password: string }) => Promise<void>;
  registerUser: (data: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => void;
  initializeAuth: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  initializeAuth: () => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    const user = userStr ? JSON.parse(userStr) : null;

    if (token && user) {
      set({ token, user, isAuthenticated: true });
    }
  },

  login: async (data) => {
    const res = await AuthService.login(data);
    const token = res.data.token;
    const user = res.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  registerUser: async (data) => {
    const res = await AuthService.register(data);
    const token = res.data.token;
    const user = res.data.user;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    set({ user, token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({ user: null, token: null, isAuthenticated: false });
  },
}));
