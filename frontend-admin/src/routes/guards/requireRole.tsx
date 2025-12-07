import { Navigate, Outlet, useLocation } from 'react-router'
import { type Role, useAuth } from '../../contexts/AuthContext'
import Loading from '@/components/common/Loading'

type RequireRoleProps = {
  allow: Role[] // ['admin'] || ['user', 'admin']
}

export default function RequireRole({ allow }: RequireRoleProps) {
  const { role, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (<Loading />)
  }

  if (!allow.includes(role)) {
    // not login -> redirect to /login
    if (role === 'guest') {
      return (
        <Navigate
          to='/login'
          replace
          state={{ from: location }} // to redirect back after login
        />
      )
    }

    // Logged in but not enough permission (e.g. user accessing /admin) -> redirect to home
    return <Navigate to='/' />
  }
  return <Outlet />
}
