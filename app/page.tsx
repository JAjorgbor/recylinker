import SignInOption from '@/components/special-cards/SignInOption'
import React from 'react'

const Page = () => {
  return (
    <div>
      <div className='min-h-screen w-full bg-[url("/media/landing-page-banner.jpg")] bg-cover bg-center bg-no-repeat relative grid place-items-center'>
        <div className='absolute top-0 left-0 w-full h-full bg-black opacity-40 z-5' />
        <div className='space-y-2 text-[2.8rem] md:text-[3.5rem] font-bold text-center z-10'>
          <h1 className='text-white'>
            Welcome To <span className='text-primary'>Recylinker</span>
          </h1>
          <p className='font-bold text-lg text-white'>
            Please select a user type to sign into.
          </p>
          <div className='grid grid-cols-2 w-4/5 mx-auto gap-5 place-items-center'>
            <SignInOption
              title='Resident'
              imageSrc='/media/resident-sign-in.jpg'
              route='/resident'
            />
            <SignInOption
              title='Driver'
              imageSrc='/media/driver-sign-in.jpg'
              route='/driver'
            />
            <SignInOption
              title='Agency'
              imageSrc='/media/recycling-agency-sign-in.jpg'
              route='/agency'
            />
            <SignInOption
              title='Manufacturer'
              imageSrc='/media/manufacturer-sign-in.jpg'
              route='/manufacturer'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
