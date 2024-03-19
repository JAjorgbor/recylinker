'use client'
import { Sun, Menu as MenuBurger, Moon } from 'react-feather'
import cookies from 'js-cookie'
import React from 'react'
import {
  Avatar,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
  Switch,
} from '@nextui-org/react'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { setOpenSidebar } from '@/features/sidebarSlice'

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
              cookies.set('theme', val ? 'light' : 'dark', { expire: 30 })
              document.documentElement.className = val ? 'light' : 'dark'
            }}
          />
        </NavbarItem>
        <NavbarItem>
          <Avatar />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
