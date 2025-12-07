import { Link } from 'react-router'
import { SidebarTrigger } from '@basic-monorepo/ui/sidebar'
import { ToggleTheme } from './ToggleTheme'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@basic-monorepo/ui/dropdown-menu'
import { Avatar, AvatarFallback } from '@basic-monorepo/ui/avatar'
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'

const GuestHeader = () => {
  return (
    <header className='sticky top-0 bg-white dark:bg-neutral-900 shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className=''>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-neutral-200'>
              Insight Hubs
            </h1>
          </div>
          <nav className='hidden md:flex space-x-4 items-center'>
            <Link
              to='/login'
              className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 px-3 py-2 text-sm font-medium'
            >
              Login
            </Link>
            <ToggleTheme type='compact' />
          </nav>
        </div>
      </div>
    </header>
  )
}

const UserHeader = () => {
  const { logout } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  return (
    <header className='sticky top-0 bg-white dark:bg-neutral-900 shadow-sm border-b'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className=''>
            <h1 className='text-xl font-semibold text-gray-900 dark:text-neutral-200'>
              Insight Hubs
            </h1>
          </div>
          <nav className='hidden md:flex space-x-8'>
            <Link
              to='/dashboard'
              className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 px-3 py-2 text-sm font-medium'
            >
              Home
            </Link>
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Avatar className='border cursor-pointer'>
                  {/* <User className='m-auto w-6 h-6' /> */}
                  {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='start'>
                <DropdownMenuItem>
                  <Link to='/u/profile' onClick={() => setMenuOpen(false)}>Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to='/u/settings' onClick={() => setMenuOpen(false)}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    role='button'
                    onClick={logout}
                    className='text-red-500 dark:text-red-400 cursor-pointer'
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
                <hr className='my-2' />
                <div className='px-2 mb-2'>
                  <ToggleTheme />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </nav>
        </div>
      </div>
    </header>
  )
}

const AdminHeader = () => {
  return (
    <header className='sticky top-0 px-4 w-full bg-gray-800 dark:bg-neutral-900 shadow-sm border-b'>
      <div className='mx-auto'>
        <div className='flex justify-between items-center h-12'>
          <div className=''>
            <h1 className='text-xl font-semibold text-white dark:text-neutral-200'>
              <SidebarTrigger /> <span className='ml-4'>Admin Panel</span>
            </h1>
          </div>
          <nav className='hidden md:flex space-x-8'>
            <Link
              to='/admin/dashboard'
              className='text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 px-3 py-2 text-sm font-medium'
            >
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export { GuestHeader as Header, UserHeader, AdminHeader }
