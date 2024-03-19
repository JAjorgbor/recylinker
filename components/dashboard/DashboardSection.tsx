'use client'
import {
  Divider,
  Card,
  CardBody,
  Button,
  CardHeader,
  Progress,
} from '@nextui-org/react'
import { CornerUpRight, ArrowRight } from 'react-feather'
import Image from 'next/image'
import type { FC } from 'react'

interface DashboardSectionProps {}

const DashboardSection: FC<DashboardSectionProps> = ({}) => {
  return (
    <>
      <div className='flex flex-col md:grid md:grid-cols-5 gap-6 w-full'>
        <Card className='col-span-3 min-h-[250px]'>
          <CardBody className='flex flex-col sm:flex-row gap-3 items-center'>
            <div className='flex flex-col text-center gap-3 flex-1'>
              <p className='text-[2rem] font-bold'>100</p>
              <p className='text-sm'>Total Times Recycled</p>
              <p className='text-xs'>January 1, 2024 - Present</p>
            </div>
            <Divider orientation='vertical' />
            <div className='flex flex-col gap-3 text-center flex-1'>
              <p className='text-[2rem] font-bold'>
                <span className='inline-block p-4 py-5 border-orange-500 border-5 rounded-full'>
                  100
                </span>
              </p>
              <p className='text-sm text-orange-500'>Current Streak</p>
              <p className='text-xs'>March 16</p>
            </div>
            <Divider orientation='vertical' />
            <div className='flex flex-col text-center gap-3 flex-1'>
              <p className='text-[2rem] font-bold'>40</p>
              <p className='text-sm'>Longest Streak</p>
              <p className='text-xs'>January 10, 2024 - Febuary 20, 2024</p>
            </div>
          </CardBody>
        </Card>
        <Card className='col-span-2 '>
          <CardBody className='gap-3 p-3 justify-center'>
            <Image
              src='https://dummyimage.com/100x80'
              alt='chat bot logo'
              width={100}
              height={80}
            />
            <p className='text-sm'>
              Learn how to recycle effectively with our interactive chatbot! Get
              personalized advice on reducing waste and recycling smartly.
            </p>
            <Button
              color='primary'
              endContent={<ArrowRight size={20} />}
              className='md:w-1/2'
            >
              Start Recycling Chat
            </Button>
          </CardBody>
        </Card>
        <Card className='col-span-2 order-4 md:order-3'>
          <CardBody className='gap-3 p-3 justify-center'>
            <Image
              src='https://dummyimage.com/100x80'
              alt='chat bot logo'
              width={100}
              height={80}
            />
            <div className='space-y'>
              <h3 className=''>Current Balance</h3>
              <p className='font-bold text-xl'>5 </p>
              <p className='text-sm'>
                Collect up to 1000 points to claim rewards.
              </p>
            </div>

            <Progress
              label={<span className='text-2xl'>🪙</span>}
              //   formatOptions={{ style: 'unit', unit: 'kg' }}
              aria-label='Loading...'
              value={60}
            />
          </CardBody>
        </Card>
        <Card className='col-span-3 order-3 md:order-4'>
          <CardHeader className='bg-default-100'>
            <h3 className='uppercase'>Drop off History</h3>
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
      </div>
    </>
  )
}
export default DashboardSection
