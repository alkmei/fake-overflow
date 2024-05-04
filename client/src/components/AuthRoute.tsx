import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthentication } from "@/helper.ts";

interface AuthRouteProps {
  children: React.ReactNode;
}

const AuthRoute: React.FC<AuthRouteProps> = ({ children }) => {
  const { loggedIn } = useAuthentication();

  return loggedIn ? <>{children}</> : <Navigate to="/users/login" replace />;
};

export default AuthRoute;
