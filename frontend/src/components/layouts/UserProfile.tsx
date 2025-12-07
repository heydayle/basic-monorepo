import { Outlet } from 'react-router'
import ProfileSidebar from './sidebars/ProfileSidebar'

export default function AppLayout() {
  return (
    <div className='flex h-[calc(100vh-166px)]'>
      <ProfileSidebar />
      <Outlet />
    </div>
  )
}
