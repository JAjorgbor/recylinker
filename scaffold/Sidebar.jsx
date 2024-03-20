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
      <Listbox selectionMode='single'>
        <ListboxItem
          startContent={<Monitor size={15} className='text-primary' />}
          className={`p-3 ${
            pathname == '/dashboard' ? 'bg-default-100 text-primary' : ''
          }`}
          href='/dashboard'
          as={Link}
        >
          Dashboard
        </ListboxItem>
        <ListboxItem
          startContent={<Map size={15} className='text-primary' />}
          className={`p-3 ${
            pathname == '/drop-points' ? 'bg-default-100 text-primary' : ''
          }`}
          href='/drop-points'
          as={Link}
        >
          Drop Points
        </ListboxItem>
        <ListboxItem
          startContent={<Truck size={15} className='text-primary' />}
          className={`p-3 ${
            pathname == '/Pickups' ? 'bg-default-100 text-primary' : ''
          }`}
          href='/Pickups'
          as={Link}
        >
          Pickups
        </ListboxItem>
        <ListboxItem
          startContent={<Award size={15} className='text-primary' />}
          className={`p-3 ${
            pathname == '/claim-rewards' ? 'bg-default-100 text-primary' : ''
          }`}
          href='/claim-rewards'
          as={Link}
        >
          Claim Rewards
        </ListboxItem>
        <ListboxItem
          startContent={<Home size={15} className='text-primary' />}
          className={`p-3 ${
            pathname == '/home-recycle' ? 'bg-default-100 text-primary' : ''
          }`}
          href='/home-recycle'
          as={Link}
        >
          Home Recycle
        </ListboxItem>
      </Listbox>
    </Card>
  )
}
