import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const authenticated = isAuthenticated();
  
  if (!authenticated) {
    // Redirect to sign in page if not authenticated
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;
