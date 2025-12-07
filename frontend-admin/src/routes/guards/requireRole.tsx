import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../../contexts/AuthContext'
import Loading from '@/components/common/Loading'

export default function RequireRole() {
  const { isAuthenticated, authLoading } = useAuth()
  const location = useLocation()

  if (authLoading) {
    return (<Loading />)
  }

  // not login -> redirect to /login
  if (!isAuthenticated) {
    return (
      <Navigate
        to='/login'
        replace
        state={{ from: location }} // to redirect back after login
      />
    )
  }
  return <Outlet />
}
