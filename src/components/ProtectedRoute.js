// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

// Assuming you have a way to check if the user is authenticated
const isAuthenticated = () => {
  // Replace this logic with actual authentication check
  return localStorage.getItem('authToken') !== null;
};

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
