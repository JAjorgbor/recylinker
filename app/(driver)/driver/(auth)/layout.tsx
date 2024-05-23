import type { FC, ReactNode } from 'react'

interface layoutProps {
  children: ReactNode
}

const layout: FC<layoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-[url("/media/driver-sign-in.jpg")] bg-cover py-[40px] px-5'>
      {children}
    </div>
  )
}
export default layout
