import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore.js';

/**
 * Higher Order Component to protect routes from unauthorized users
 * Redirects to login if not authenticated
 */
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to login but keep the current location so we can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

/**
 * Higher Order Component for Role-Based Access Control
 * Redirects to a default page if user doesn't have required role
 */
export const RoleRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuthStore();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    // If user role is not allowed, redirect to their home portal
    const redirectPath = user?.role === 'landlord' ? '/' : '/tenant-dashboard';
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};
