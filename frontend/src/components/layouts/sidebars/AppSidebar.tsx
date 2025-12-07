import { Home, Inbox, Settings, LogOut } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@basic-monorepo/ui/sidebar'
import Button from '../../ui/Button'
import { useAuth } from '@/contexts/AuthContext'
import { NavLink } from 'react-router'

// Menu items.
const items = [
  {
    title: 'Dashboard',
    url: 'dashboard',
    icon: Home,
  },
  {
    title: 'Tools',
    url: 'tools',
    icon: Inbox,
  },
]

export function AppSidebar() {
  const { logout } = useAuth()
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className='font-bold text-2xl my-1'>Inside Hubs</SidebarGroupLabel>
          <SidebarGroupContent className='border-t py-4'>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <div>
                      <NavLink
                        to={item.url}
                        key={item.url}
                        className={({ isActive }) =>
                          `w-full flex gap-2 items-center p-2 ${isActive ? 'text-blue-500' : ''}`
                        }
                      >
                        <item.icon className='w-4 h-4' />
                        <span>{item.title}</span>
                      </NavLink>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <div className='p-2'>
        <Button
          variant='ghost'
          className='flex items-center w-content gap-4 mt-auto text-red-500 hover:text-red-500 hover:bg-red-100'
          onClick={() => logout()}
        >
          <LogOut className='w-4 h-4' /> <span>Logout</span>
        </Button>
      </div>
    </Sidebar>
  )
}
