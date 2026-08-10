import { Navigate } from "react-router-dom";
import { isLoggedIn } from "../lib/adminApi";

export default function ProtectedRoute({ children }) {
  if (!isLoggedIn()) {
    return <Navigate to="/admin/login" replace />;
  }
  return children;
}