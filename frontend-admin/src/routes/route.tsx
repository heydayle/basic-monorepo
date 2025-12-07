import { createBrowserRouter, Navigate } from 'react-router'

// Guards
import OnlyGuest from './guards/onlyGuest'
import RequireRole from './guards/requireRole'

// Layouts
import AdminLayout from '../components/layouts/Admin'
import AuthLayout from '../components/layouts/Auth'

// Pages
import LoginPage from '../pages/auth/Login'

// Routes
import adminRoutes from './modules/adminRoutes'

const AppRoutes = createBrowserRouter([
  {
    /* Routes for authentication pages */
    element: <OnlyGuest />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/login',
            Component: LoginPage,
          },
        ],
      },
      {
        path: '/',
        element: <Navigate to="/admin/dashboard" replace />
      }
    ],
  },
  {
    /* Routes for admin users within the admin layout */
    element: <RequireRole allow={['admin']} />,
    children: [
      {
        element: <AdminLayout />,
        path: 'admin',
        children: adminRoutes,
      },
    ],
  },
  {
    /* 404 Not Found page */
    path: '*',
    element: '404 Not Found',
  },
])

export default AppRoutes
