// import Header from "@/scaffold/Header";
import Image from 'next/image'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <main className='2xl:container mx-auto'>
        <section className='relative flex flex-wrap lg:h-screen lg:items-center'>
          <div className='hidden md:block w-full sm:h-96  lg:w-1/2 relative'>
            <Image
              alt='Welcome'
              src='/media/auth-banner.jpg'
              className='absolute inset-0 h-full lg:w-1/2 w- object-cover lg:h-screen lg:fixed top-0 left-0'
              width={2000}
              height={2000}
            />
          </div>
          <div className='w-full lg:w-1/2 h-full'>
            {/* <Header /> */}
            <div className='w-full px-4 py-12 sm:px-6 sm:py-16  lg:px-8  '>
              {children}
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
export default Layout
