import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface PublicRouteProps {
  auth?: boolean;
}

export const PublicRoute: React.FC<PublicRouteProps> = ({ auth = false }) => {
  return auth ? <Navigate to="/" /> : <Outlet />;
};
