import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PrivateRouteProps {
  auth?: boolean;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ auth = false }) => {
  return auth ? <Outlet /> : <Navigate to="auth" />;
};
