import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function RequireAuth() {
  const { auth } = useAuth();
  console.log("render RequireAuth");

  console.log(auth);
  const location = useLocation();
  return auth?.user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}
