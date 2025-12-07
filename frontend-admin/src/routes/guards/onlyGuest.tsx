import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth, type Role } from '../../contexts/AuthContext'
import Loading from '@/components/common/Loading'

const getRoleDefaultPath = (role: Role): string => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard'
    default:
      return '/login'
  }
}

export default function OnlyGuest() {
  const { role, authLoading } = useAuth()
  
  if (authLoading) {
    return (<Loading />)
  }
  
  if (role !== 'guest') {
    const redirectPath = getRoleDefaultPath(role)
    return <Navigate to={redirectPath} replace />
  }
  
  return <Outlet />
}
