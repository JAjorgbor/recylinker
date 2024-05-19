import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import type { FC } from 'react'
import Image from 'next/image'
import { CornerUpRight, Search } from 'react-feather'
import InputField from '@/components/elements/InputField'
import MapView from '@/components/elements/MapView'

interface DropPointsSectionProps {}

const DropPointsSection: FC<DropPointsSectionProps> = ({}) => {
  return (
    <>
      <Card>
        <CardBody className='flex-row md:max-h-[600px] gap-4'>
          <div className='flex flex-col md:grid grid-cols-4 gap-6'>
            <div className='flex flex-col gap-3'>
              <CardHeader className='text-xl font-bold text-foreground-600'>
                Drop Points
              </CardHeader>
              <InputField
                placeholder='Search drop points'
                type='text'
                variant='bordered'
                className='w-4/5 ml-4'
                startContent={<Search size={20} />}
              />
              <div className='flex flex-col h-[500px] overflow-y-auto p-3 gap-6'>
                <Card className='min-h-[140px]'>
                  <CardBody className='gap-4'>
                    <p>Golf Estate Rd, Okuru Ama Town, Port Harcourt</p>
                    <Button
                      endContent={<CornerUpRight size={15} />}
                      variant='ghost'
                      color='primary'
                    >
                      Get Directions
                    </Button>
                  </CardBody>
                </Card>
                <Card className='min-h-[140px]'>
                  <CardBody className='gap-4'>
                    <p>Golf Estate Rd, Okuru Ama Town, Port Harcourt</p>
                    <Button
                      endContent={<CornerUpRight size={15} />}
                      variant='ghost'
                      color='primary'
                    >
                      Get Directions
                    </Button>
                  </CardBody>
                </Card>
                <Card className='min-h-[140px]'>
                  <CardBody className='gap-4'>
                    <p>Golf Estate Rd, Okuru Ama Town, Port Harcourt</p>
                    <Button
                      endContent={<CornerUpRight size={15} />}
                      variant='ghost'
                      color='primary'
                    >
                      Get Directions
                    </Button>
                  </CardBody>
                </Card>
                <Card className='min-h-[140px]'>
                  <CardBody className='gap-4'>
                    <p>Golf Estate Rd, Okuru Ama Town, Port Harcourt</p>
                    <Button
                      endContent={<CornerUpRight size={15} />}
                      variant='ghost'
                      color='primary'
                    >
                      Get Directions
                    </Button>
                  </CardBody>
                </Card>
              </div>
            </div>
            <div className='md:col-span-3 h-[800px] md:h-full relative rounded-lg'>
              {/* <Image
                src='https://dummyimage.com/800x500/'
                alt='map placeholder'
                width={500}
                className='h-full w-full'
                height={500}
              /> */}
              <MapView />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  )
}
export default DropPointsSection
