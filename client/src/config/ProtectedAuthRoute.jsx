import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedAuthRoute = ({ children }) => {
  const user = useSelector((state) => state.auth.user);

  if (user) {
    // Redirect based on role
    if (user.role === "admin") return <Navigate to="/admin/dashboard" replace />;
    if (user.role === "user") return <Navigate to="/sweets" replace />;
  }

  // Not logged in
  return children;
};

export default ProtectedAuthRoute;
