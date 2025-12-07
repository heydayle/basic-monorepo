import { Outlet } from 'react-router'
import { Footer } from '../common/Footer'
import { UserHeader } from '../common/Header'
import { AppSidebar } from './sidebars/AppSidebar'
import { SidebarProvider } from '@basic-monorepo/ui/sidebar'

export default function AppLayout() {
  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-800'>
      <SidebarProvider>
        <AppSidebar />
        <main className='w-full'>
          <UserHeader />
          <Outlet />
        </main>
      </SidebarProvider>
      <Footer />
    </div>
  )
}
