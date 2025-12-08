import { api } from "./api";

type LoginData = { email: string; password: string };
type RegisterData = { name: string; email: string; password: string };

export const AuthService = {
  login: (data: LoginData) => api.post("/api/Auth/login", data),
  register: (data: RegisterData) => api.post("/api/Auth/register", data),
};
