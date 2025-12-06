import { Avatar, AvatarFallback } from "@basic/components/shadcn/ui/avatar"
import { useAuth } from '@/contexts/AuthContext'
import { NavLink } from 'react-router'

const PROFILE_MENUS = [
  { name: 'Profile', path: '/u/profile' },
  { name: 'Settings', path: '/u/settings' },
]

export default function ProfileSidebar() {
  const { user } = useAuth()
  return (
    <aside className='w-64 bg-white dark:bg-neutral-900 p-4 rounded-2xl shadow'>
      <div className='flex flex-col items-center mb-6'>
        <Avatar className='w-24 h-24 border cursor-pointer'>
          {/* <AvatarImage src='https://github.com/shadcn.png' /> */}
          <AvatarFallback className='text-3xl'>{user?.username.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className='text-xl font-semibold text-primary'>{user?.username}</h2>
        <p className='text-sm text-gray-500'>{user?.email}</p>
      </div>

      <nav className='flex flex-col space-y-2'>
        {PROFILE_MENUS.map((menu) => (
          <NavLink
            key={menu.name}
            to={menu.path}
            className={({ isActive }) =>
              `w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-neutral-800
              ${isActive ? 'bg-blue-50 dark:bg-blue-900/10 text-blue-600 font-medium' : 'text-gray-700 dark:text-neutral-300'}`
            }
          >
            {menu.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
