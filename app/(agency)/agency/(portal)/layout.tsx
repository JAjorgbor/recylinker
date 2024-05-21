import Header from '@/scaffold/agency/Header'
import Sidebar from '@/scaffold/agency/Sidebar'
import React from 'react'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <div className='lg:flex' id={'outer-container'}>
        <div>
          <Sidebar />
        </div>
        <div id='page-wrap' className='flex-grow'>
          <Header />
          <main className='min-h-screen w-full p-5 relative'>{children}</main>
        </div>
      </div>
    </>
  )
}

export default Layout
