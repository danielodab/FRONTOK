import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectRoute({ element }) {
  const token = localStorage.getItem('token');
  
  return token ? element : <Navigate to="/" />;
}

export default ProtectRoute;
