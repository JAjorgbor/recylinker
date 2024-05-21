'use client'
import useGetPortalAgency from '@/hooks/requests/agency/useGetPortalAgency'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import type { FC } from 'react'
import Link from 'next/link'
import DropOffsTable from '@/components/agency/dropp-offs/DropOffsTable'
import { ArrowRight, ExternalLink } from 'react-feather'

interface DashboardSectionProps {}

const DashboardSection: FC<DashboardSectionProps> = ({}) => {
  const { portalAgency, portalAgencyLoading } = useGetPortalAgency()
  return (
    <>
      <div className='grid md:grid-cols-2 gap-6 w-full'>
        <Card className=' bg-contain bg-no-repeat bg-right min-h-[400px]'>
          <CardBody className='gap-3 p-3 justify-between h-full'>
            <CardHeader className='text-xl font-bold flex justify-between'>
              Recent Drop Offs{' '}
              <Button
                as={Link}
                color='primary'
                href='/agency/drop-offs'
                endContent={<ExternalLink size={17} />}
              >
                Manage Drop Offs
              </Button>
            </CardHeader>
            <DropOffsTable className='w-full py-0' />
          </CardBody>
        </Card>
        <Card className=' bg-contain bg-no-repeat bg-right min-h-[400px]'>
          <CardBody className='gap-3 p-3 justify-between h-full'>
            <CardHeader className='text-xl font-bold flex justify-between'>
              Recent Deliveries{' '}
              <Button
                as={Link}
                color='primary'
                href='/agency/deliveries'
                endContent={<ExternalLink size={17} />}
              >
                Manage Deliveries
              </Button>
            </CardHeader>
            <DropOffsTable className='w-full py-0' />
          </CardBody>
        </Card>
      </div>
    </>
  )
}
export default DashboardSection
