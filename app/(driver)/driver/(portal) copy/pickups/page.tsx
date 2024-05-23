// 'use client'

import PickupsTable from '@/components/driver/pickups/PickupsTable'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'react-feather'

const Page = () => {
  return (
    <div className='space-y-5'>
      <div className='flex justify-end mx-auto md:w-[90%]'></div>
      <PickupsTable />
    </div>
  )
}

export default Page
