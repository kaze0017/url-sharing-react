import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { UserProfileContext } from "../context/UserProfileProvider";
import { getUserProfile } from "../api/getUserProfile";
import { useState, useEffect, useContext } from "react";

export default function RequireAuth() {
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true); // Add loading state
  const { auth, setAuth } = useAuth();
  const { setUserProfile } = useContext(UserProfileContext);
  const location = useLocation();

  useEffect(() => {
    async function checkAuth() {
      if (auth?.token && auth?.userProfile) {
        setAuthorized(true);
        setLoading(false); // Set loading to false when done
        return;
      } else {
        setAuthorized(false);
      }

      const savedToken = localStorage.getItem("url_sharing_token");
      if (savedToken) {
        const userProfile = await getUserProfile(savedToken);
        if (!userProfile) {
          localStorage.removeItem("url_sharing_token");
          setLoading(false); // Set loading to false when done
          return;
        }
        setUserProfile(userProfile);
        setAuth({ userProfile: userProfile, token: savedToken });
        setAuthorized(true);
      }
      setLoading(false); // Set loading to false when done
    }

    checkAuth();
  }, [auth, setAuth, setUserProfile]);

  if (loading) {
    return <div>Loading...</div>; // Render loading indicator while checking auth
  }

  return authorized ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}
