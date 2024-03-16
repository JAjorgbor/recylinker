import LoginForm from '@/components/auth/LoginForm'
import LoadingState from '@/components/elements/LoadingState'
import { Suspense } from 'react'

const LoginPage = () => {
  return (
    <main>
      <div className='mx-auto max-w-lg text-center'>
        <h1 className='text-2xl font-bold sm:text-2xl'>Login To Recylinker</h1>
        <p className='mt-4 text-gray-500'>
          We&rsquo;re glad you&rsquo;r here 🤗
        </p>
      </div>
      <Suspense fallback={<LoadingState />}>
        <LoginForm />
      </Suspense>
    </main>
  )
}
export default LoginPage
