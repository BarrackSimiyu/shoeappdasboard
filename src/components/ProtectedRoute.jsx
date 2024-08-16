import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../helpers/AuthContext'; // Import AuthContext

const ProtectedRoute = ({ element }) => {
    const { auth } = useAuth();

    return auth.isAuthenticated ? element : <Navigate to="/admin_signin" />;
};

export default ProtectedRoute;
