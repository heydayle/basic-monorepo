import { Outlet } from 'react-router'
import { Footer } from '../common/Footer'
import { Header } from '../common/Header'

export default function AppLayout() {
  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-800'>
      <Header />
      <main className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
