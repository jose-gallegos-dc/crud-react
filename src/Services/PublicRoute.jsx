import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { verifyToken } from '../Services';

export const PublicRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                const isValid = await verifyToken(token);
                setIsAuthenticated(isValid);
            } else {
                setIsAuthenticated(false);
            }
        };
        checkAuth();
    }, []);

    if (isAuthenticated === null) return null; // Loading state

    return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};
