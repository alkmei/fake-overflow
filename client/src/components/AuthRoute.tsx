import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "@/helper.ts";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { loggedIn, loading } = useAuthentication();
  const [initialLoad, setInitialLoad] = useState(true);

  useEffect(() => {
    if (!loading) {
      setInitialLoad(false);
    }
  }, [loading]);

  if (initialLoad || loading) {
    return <p>Loading...</p>;
  }

  return loggedIn ? <>{children}</> : <Navigate to="/users/login" replace />;
};

export default AuthRoute;
