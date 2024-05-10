'use client'
import { push as Menu } from 'next-burger-menu'
import Link from 'next/link'
import Image from 'next/image'
import { Truck, Award, BarChart2, Home, Map, Monitor } from 'react-feather'
import { setOpenSidebar } from '@/features/sidebarSlice'
import { useAppDispatch, useAppSelector } from '@/features/store'
import { Card, Divider, Listbox, ListboxItem } from '@nextui-org/react'
import { usePathname } from 'next/navigation'
import useMediaQuery from '@/hooks/useMediaQuery'
import { useEffect } from 'react'

const Sidebar = ({}) => {
  const dispatch = useAppDispatch()
  const pathname = usePathname()
  const isOpen = useAppSelector((state) => state.sidebar.isOpen)
  const { queryMatches } = useMediaQuery(1024)
  useEffect(() => {
    dispatch(setOpenSidebar(false))
  }, [pathname])
  return (
    <>
      {/* {queryMatches ? ( */}
      <div className='hidden lg:block sticky top-0 h-screen w-[250px]'>
        <SidebarContent />
      </div>
      {/* ) : ( */}
      <Menu
        pageWrapId={'page-wrap'}
        outerContainerId={'outer-container'}
        className='lg:hidden'
        width={230}
        isOpen={isOpen}
        onOpen={() => dispatch(setOpenSidebar(true))}
        onClose={() => dispatch(setOpenSidebar(false))}
        customBurgerIcon={false}
        customCrossIcon={false}
      >
        <SidebarContent />
      </Menu>
      {/* )} */}
    </>
  )
}
export default Sidebar
const SidebarContent = () => {
  const pathname = usePathname()
  return (
    <Card className='flex flex-col gap-3 rounded-s-none h-full py-4'>
      <div className='flex p-3 gap-2 font-bold items-center '>
        <Image
          src='/media/logo.png'
          alt='logo'
          height={50}
          width={50}
          className='h-8 w-8'
        />
        <p>Recylinker</p>
      </div>
      <Divider />
      <div className='flex flex-col px-1 gap-1'>
        <Link
          className={`p-3 flex gap-3 items-center rounded-lg text-sm focus:bg-default-100 focus:text-primary hover:bg-default-50 hover:text-primary ${
            pathname == '/resident/dashboard'
              ? 'bg-default-100 text-primary'
              : ''
          }`}
          href='/resident/dashboard'
        >
          <Monitor size={15} className='text-primary' />
          Dashboard
        </Link>
        <Link
          className={`p-3 flex gap-3 items-center rounded-lg text-sm focus:bg-default-100 focus:text-primary hover:bg-default-50 hover:text-primary ${
            pathname == '/resident/drop-points'
              ? 'bg-default-200 text-primary'
              : ''
          }`}
          href='/resident/drop-points'
        >
          <Map size={15} className='text-primary' />
          Drop Points
        </Link>
        <Link
          className={`p-3 flex gap-3 items-center rounded-lg text-sm focus:bg-default-100 focus:text-primary hover:bg-default-50 hover:text-primary ${
            pathname == '/resident/Pickups' ? 'bg-default-100 t2xt-primary' : ''
          }`}
          href='/resident/Pickups'
        >
          <Truck size={15} className='text-primary' />
          Pickups
        </Link>
        <Link
          className={`p-3 flex gap-3 items-center rounded-lg text-sm focus:bg-default-100 focus:text-primary hover:bg-default-50 hover:text-primary ${
            pathname == '/resident/claim-rewards'
              ? 'bg-default-200 text-primary'
              : ''
          }`}
          href='/resident/claim-rewards'
        >
          <Award size={15} className='text-primary' />
          Claim Rewards
        </Link>
        <Link
          className={`p-3 flex gap-3 items-center rounded-lg text-sm focus:bg-default-100 focus:text-primary hover:bg-default-50 hover:text-primary ${
            pathname == '/resident/home-recycle'
              ? 'bg-default-200 text-primary'
              : ''
          }`}
          href='/resident/home-recycle'
        >
          <Home size={15} className='text-primary' />
          Home Recycle
        </Link>
      </div>
    </Card>
  )
}
