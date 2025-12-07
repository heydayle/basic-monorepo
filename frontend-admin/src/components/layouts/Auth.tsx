import { Link, Outlet } from 'react-router'

export default function AuthLayout() {
  return (
    <div className='min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-800 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div className='text-center'>
          <Link to='/'>
            <h1 className='inline text-3xl font-bold text-gray-900 dark:text-neutral-200'>
              Insight Hubs
            </h1>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  )
}
