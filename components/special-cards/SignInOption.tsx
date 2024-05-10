import { Card, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import type { FC } from 'react'
import Link from 'next/link'

const SignInOption = ({
  title,
  imageSrc,
  route,
}: {
  title: string
  imageSrc: string
  route: string
}) => {
  return (
    <>
      <Link className='inline-block' href={route}>
        <Card className='h-[250px] sign-in-option-card text-white hover:text-primary transition-colors group'>
          <Image
            alt={title}
            className='z-0 w-full h-full object-cover transform transition-transform delay-300 group-hover:scale-[1.3]'
            // src="https://dummyimage.com/200x400"
            src={imageSrc}
            width={1000}
            height={1000}
            // isZoomed
          />
          <CardHeader className='absolute z-10 bottom-1/2 left-5 p-[1.5] md:p-3 text-[0.8rem] flex-col !items-start text-inherit transform transition-all rotate-90 group-hover:left-0 group-hover:rotate-[initial] group-hover:text-[2rem] group-hover:bottom-10 origin-left'>
            <h4 className='font-bold text-large'>{title}</h4>
          </CardHeader>
        </Card>
      </Link>
    </>
  )
}
export default SignInOption
