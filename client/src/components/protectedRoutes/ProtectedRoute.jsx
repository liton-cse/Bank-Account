import React from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user } = useAuth(); // ✅ Ensure we extract `user` from the context
  if (!user) {
    return <Navigate to="/login" replace />; // ✅ Use `replace` to prevent going back
  }
  if (adminOnly && user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
