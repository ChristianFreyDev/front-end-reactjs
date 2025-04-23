import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from '../../contexts/AuthContext';

export const PrivateRoute = ({ children }) => {
  const { authenticated, loading } = useAuth();

  if (loading) {
    // Pode retornar um loader, splash screen ou até null
    return <div>Carregando...</div>;
  }

  if (!authenticated) {
    return <Navigate to="/Login" />;
  }

  return children;
};
