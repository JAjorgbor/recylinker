'use client'
import { Button, Card, CardBody, CardHeader, Progress } from '@nextui-org/react'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'
import { ArrowRight, CornerUpRight } from 'react-feather'
import PickupsTable from './pickups/PickupsTable'

interface DashboardSectionProps {}

const DashboardSection: FC<DashboardSectionProps> = ({}) => {
  return (
    <>
      <div className='grid md:grid-cols-5 gap-6 w-full'>
        <Card className='md:col-span-2 bg-[url("/media/welcome-back.png")] bg-contain bg-no-repeat bg-right min-h-[250px]'>
          <CardBody className='gap-3 p-3 justify-between py-8 md:py-12 h-full'>
            {/* <Image
              src='https://dummyimage.com/100x80'
              alt='chat bot logo'
              width={100}
              height={80}
            /> */}
            {/* <div className='space-y-5'> */}
            <h3 className='text-2xl sm:text-3xl font-bold'>
              Welcome back Joshua
            </h3>
            <Button variant='solid' color='primary' className='font-bold'>
              Order Trash Pickup
            </Button>
            {/* </div> */}
          </CardBody>
        </Card>
        <Card className='md:col-span-3'>
          <CardHeader className='bg-default-100'>
            <h3 className='uppercase'>Recent Dropoffs</h3>
          </CardHeader>
          <CardBody className='h-[250px]'>
            <div className='w-full'>
              <table className='w-full overflow-auto'>
                <tbody className='divide-y'>
                  <tr className=''>
                    <td className='py-4'>
                      <div className='flex flex-col gap-2'>
                        <p>Golf Estate Rd, Okuru Ama Town</p>
                        <p className='text-sm text-foreground-400'>
                          Port Harcourt
                        </p>
                      </div>
                    </td>

                    <td className='py-4 text-end'>
                      <Button
                        endContent={<CornerUpRight size={15} />}
                        color='primary'
                        variant='ghost'
                        size='sm'
                      >
                        Get Directions
                      </Button>
                    </td>
                  </tr>
                  <tr className='border-y'>
                    <td className='py-4'>
                      <div className='flex flex-col gap-2'>
                        <p>Golf Estate Rd, Okuru Ama Town</p>
                        <p className='text-sm text-foreground-400'>
                          Port Harcourt
                        </p>
                      </div>
                    </td>

                    <td className='py-4 text-end'>
                      <Button
                        endContent={
                          <span>
                            <CornerUpRight size={15} />
                          </span>
                        }
                        color='primary'
                        variant='ghost'
                        size='sm'
                      >
                        Get Directions
                      </Button>
                    </td>
                  </tr>
                  <tr className='border-y'>
                    <td className='py-4'>
                      <div className='flex flex-col gap-2'>
                        <p>Golf Estate Rd, Okuru Ama Town</p>
                        <p className='text-sm text-foreground-400'>
                          Port Harcourt
                        </p>
                      </div>
                    </td>

                    <td className='py-4 text-end'>
                      <Button
                        endContent={
                          <span>
                            <CornerUpRight size={15} />
                          </span>
                        }
                        color='primary'
                        variant='ghost'
                        size='sm'
                      >
                        Get Directions
                      </Button>
                    </td>
                  </tr>
                  <tr className='border-y'>
                    <td className='py-4'>
                      <div className='flex flex-col gap-2'>
                        <p>Golf Estate Rd, Okuru Ama Town</p>
                        <p className='text-sm text-foreground-400'>
                          Port Harcourt
                        </p>
                      </div>
                    </td>

                    <td className='py-4 text-end'>
                      <Button
                        endContent={
                          <span>
                            <CornerUpRight size={15} />
                          </span>
                        }
                        color='primary'
                        variant='ghost'
                        size='sm'
                      >
                        Get Directions
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
        <Card className='md:col-span-3 order-4 md:order-3 '>
          <CardHeader className='bg-default-100'>
            <h3 className='uppercase'>Recent Trash Pickups</h3>
          </CardHeader>
          <CardBody className='h-[250px] p-0'>
            <PickupsTable className='w-full' />
          </CardBody>
        </Card>
        <Card className='md:col-span-2 bg-[url("/media/chat-bot.jpg")] bg-cover bg-center bg-no-repeat text-white min-h-[250px] order-3 md:order-4 relative'>
          <div className='absoulte w-full h-full top-0 left-0 bg-[rgba(0,0,0,0.3)]'>
            <CardBody className='gap-3 p-3 justify-end h-full'>
              <p className='font-bold'>
                Learn how to recycle effectively with our interactive chatbot!
                Get personalized advice on reducing waste and recycling smartly.
              </p>
              <Button
                color='primary'
                endContent={<ArrowRight size={20} />}
                className='md:w-1/2'
                href='/home-recycle'
                as={Link}
              >
                Start Recycling Chat
              </Button>
            </CardBody>
          </div>
        </Card>
      </div>
    </>
  )
}
export default DashboardSection
