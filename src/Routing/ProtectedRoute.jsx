import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Check if the token is present

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/adminlogin" />;
};

export default ProtectedRoute;
