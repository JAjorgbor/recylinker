'use client'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'

import { setOpenSidebar } from '@/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import {
  Avatar,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  Switch,
} from '@nextui-org/react'
import cookies from 'js-cookie'
import React from 'react'
import {
  LogOut,
  Menu as MenuBurger,
  Moon,
  Plus,
  Settings,
  Sun,
} from 'react-feather'

export default function Header() {
  const dispatch = useAppDispatch()
  const [theme, setTheme] = React.useState('light')
  const isSidebarOpen = useAppSelector((state) => state.sidebar.isOpen)
  React.useEffect(() => {
    setTheme(cookies.get('theme') || 'light')
  }, [])
  return (
    <Navbar>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isSidebarOpen ? 'Close sidebar' : 'Open sidebar'}
          className='lg:hidden'
          icon={<MenuBurger className='hover:text-primary' />}
          onClickCapture={() => dispatch(setOpenSidebar(!isSidebarOpen))}
        />
      </NavbarContent>

      <NavbarContent justify='end'>
        <NavbarItem>
          <Switch
            isSelected={theme === 'light'}
            size='md'
            color='primary'
            thumbIcon={({ isSelected, className }) =>
              isSelected ? (
                <Sun className={className} size={15} />
              ) : (
                <Moon className={className} size={15} />
              )
            }
            onValueChange={(val) => {
              setTheme(val ? 'light' : 'dark')
              cookies.set('theme', val ? 'light' : 'dark', { expires: 30 })
              document.documentElement.className = val ? 'light' : 'dark'
            }}
          />
        </NavbarItem>
        <NavbarItem>
          <Dropdown>
            <DropdownTrigger>
              <Avatar className='cursor-pointer' />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key='1' startContent={<Settings size={15} />}>
                Settings
              </DropdownItem>
              <DropdownItem key='2' startContent={<Plus size={15} />}>
                New Pickup Order
              </DropdownItem>
              <DropdownItem
                key='3'
                color='danger'
                variant='solid'
                className='text-danger transition-colors'
                startContent={<LogOut size={15} />}
              >
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
