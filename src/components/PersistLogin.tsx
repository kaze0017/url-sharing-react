import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

import useAuth from "../hooks/useAuth";

export default function PersistLogin() {
  const [isLoading, setIsLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? <div>Loading...</div> : <Outlet />;
}
