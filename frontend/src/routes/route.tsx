import { createBrowserRouter } from 'react-router'

// Guards
import OnlyGuest from './guards/onlyGuest'
import RequireRole from './guards/requireRole'

// Layouts
import AuthLayout from '../components/layouts/Auth'
import AppLayout from '../components/layouts/Default'
import UserLayout from '../components/layouts/User'

// Pages
import LoginPage from '../pages/auth/Login'

// Routes
import { userRoutes } from './modules/userRoutes'
import guestRoutes from './modules/guestRoutes'

const AppRoutes = createBrowserRouter([
  {
    /* Routes for all users within the main application layout */
    // path: "/",
    // loader: loadHome,
    // HydrateFallback: <></>,
    id: 'root',
    element: <OnlyGuest />,
    children: [
      {
        element: <AppLayout />,
        children: guestRoutes,
      },
    ],
  },
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
    ],
  },
  {
    /* Routes for logged-in users within the main application layout */
    element: <RequireRole allow={['user']} />,
    children: [
      {
        element: <UserLayout />,
        children: userRoutes,
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
