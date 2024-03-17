import { ReactNode } from 'react'
import type { FC } from 'react'
import Sidebar from '@/scaffold/Sidebar'
import Header from '@/scaffold/Header'

interface layoutProps {
  children: ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <>
      <div className='flex' id={'outer-container'}>
        <div>
          <Sidebar />
        </div>
        <div id='page-wrap' className='flex-grow'>
          <Header />
          <main className='min-h-screen w-full p-10 relative'>{children}</main>
        </div>
      </div>
    </>
  )
}
export default layout
