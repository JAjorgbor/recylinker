// 'use client'

import PickupsTable from '@/components/resident/pickups/PickupsTable'
import { Button } from '@nextui-org/react'
import Link from 'next/link'
import React from 'react'
import { ArrowRight } from 'react-feather'

const Page = () => {
  return (
    <div className='space-y-5'>
      <div className='flex justify-end mx-auto md:w-[90%]'>
        <Button
          endContent={<ArrowRight size={15} />}
          color='primary'
          href='/resident/pickups/new-pickup'
          as={Link}
        >
          Order New Pickup
        </Button>
      </div>
      <PickupsTable />
    </div>
  )
}

export default Page
