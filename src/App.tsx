import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { useAuthStore } from "./store/authStore";
import { useEffect } from "react";

export default function App() {
  const initializeAuth = useAuthStore((state) => state.initializeAuth);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return <RouterProvider router={router} />;
}