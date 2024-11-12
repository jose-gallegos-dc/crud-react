import { createBrowserRouter } from 'react-router-dom';
import { Dashboard, Login, Home, SupplierIndex, SupplierCreate, SupplierUpdate, NotFound } from '../Pages';
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
        path: '/suppliers/create',
        element: (
            <ProtectedRoute>
                <SupplierCreate />
            </ProtectedRoute>
        ),
    },
    {
        path: '/suppliers/:supplierId/edit',
        element: (
            <ProtectedRoute>
                <SupplierUpdate />
            </ProtectedRoute>
        ),
    },
    {
        path: '*',
        element: <NotFound />,
    },
]);

export default router;
