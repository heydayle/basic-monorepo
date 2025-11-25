import { Outlet } from 'react-router'
import { SidebarProvider } from "@/components/shadcn/ui/sidebar"
import { AppSidebar } from './sidebars/AppSidebar'
import { AdminHeader } from '../common/Header'

export default function AdminLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className='flex-1'>
        <AdminHeader />
        <Outlet />
      </main>
    </SidebarProvider>
  )
}
