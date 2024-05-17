import LoginForm from '@/components/resident/auth/LoginForm'
import LoadingState from '@/components/resident/elements/LoadingState'
import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'

const LoginPage = () => {
  return (
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
        <h1 className='text-2xl font-bold sm:text-2xl'>Login To Recylinker</h1>
        <p className='mt-4 text-gray-500'>
          We&rsquo;re glad you&rsquo;re here 🤗
        </p>
      </div>
      <Suspense fallback={<LoadingState />}>
        <LoginForm />
      </Suspense>
    </main>
  )
}
export default LoginPage
