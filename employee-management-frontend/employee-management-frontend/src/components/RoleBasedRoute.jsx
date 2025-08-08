import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ role, children }) => {
  const userRole = localStorage.getItem('role');

  if (userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RoleBasedRoute;
