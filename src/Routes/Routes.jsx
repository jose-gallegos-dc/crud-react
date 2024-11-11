import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, Login, Home, SupplierIndex, UserCreate, UserUpdate, NotFound } from '../Pages';
import { ProtectedRoute, PublicRoute } from '../Services';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        ),
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        ),
    },
    {
        path: '/suppliers',
        element: (
            <ProtectedRoute>
                <SupplierIndex />
            </ProtectedRoute>
        ),
    },
    {
        path: '/users/create',
        element: (
            <ProtectedRoute>
                <UserCreate />
            </ProtectedRoute>
        ),
    },
    {
        path: '/users/:userId/edit',
        element: (
            <ProtectedRoute>
                <UserUpdate />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
