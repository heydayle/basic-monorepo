import ProfilePage from '../../pages/user/Profile'
import UserProfileLayout from '../../components/layouts/UserProfile'
import SettingsPage from '../../pages/user/Settings'
import DashboardPage from '../../pages/user/Dashboard'

export const userProfileRoutes = [
  {
    path: 'profile',
    Component: ProfilePage,
  },
  {
    path: 'settings',
    Component: SettingsPage,
  },
]

export const userRoutes = [
  {
    path: 'u',
    element: <UserProfileLayout />,
    children: userProfileRoutes,
  },
  {
    index: true,
    path: 'dashboard',
    Component: DashboardPage,
  },
]
