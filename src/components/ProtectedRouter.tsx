import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
//protected route component
interface ProtectedRouterProps {
  children: React.ReactNode;
}

export default function ProtectedRouter({ children }: ProtectedRouterProps) {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
