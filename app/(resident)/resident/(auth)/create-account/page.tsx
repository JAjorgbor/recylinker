import CreateAccountForm from '@/components/resident/auth/CreateAccountForm'
import LoadingState from '@/components/elements/LoadingState'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense, type FC } from 'react'

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <>
      <main>
        <div className='mx-auto max-w-lg text-center'>
          <Link href='/' className='inline-block'>
            <Image
              src='/media/logo.png'
              alt='logo'
              className='w-12'
              width={80}
              height={80}
            />
          </Link>
          <h1 className='text-2xl font-bold sm:text-2xl'>
            Create Recylinker Resident Account
          </h1>
          <p className='mt-4 text-gray-500'>
            We&rsquo;re glad you&rsquo;re here 🤗
          </p>
        </div>
        <Suspense fallback={<LoadingState />}>
          <CreateAccountForm />
        </Suspense>
      </main>
    </>
  )
}
export default page
