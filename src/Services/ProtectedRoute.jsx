// src/Components/ProtectedRoute.jsx
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../Services';

export const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                // const isValid = await verifyToken(token);
                // setIsAuthenticated(isValid);
                setIsAuthenticated(true);
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) return null; // Loading state

    return isAuthenticated ? children : <Navigate to="/login" />;
};
