import AdminSettingsPage from '@/pages/admin/Settings'
import CategoryPage from '@/pages/admin/Category'
import DashboardPage from '@/pages/admin/Dashboard'

export default [
  {
    index: true,
    path: 'dashboard',
    Component: DashboardPage,
  },
  {
    path: 'category',
    Component: CategoryPage,
  },
  {
    path: 'settings',
    Component: AdminSettingsPage,
  }
]
