'use client'
import { portalLogin } from '@/api/portal-user/requests/auth'
import InputField from '@/components/elements/InputField'
import { Avatar, Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Link from 'next/link'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import Image from 'next/image'

const LoginForm = () => {
  const [keepLoading, setKeepLoading] = useState(false)
  const searchParams = useSearchParams()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()
  const router = useRouter()
  const submitData = async (formData: any) => {
    try {
      const { data } = await portalLogin(formData)
      const { tokens } = data
      Cookies.set('portalAuthAccessToken', tokens.access.token, { expires: 30 })
      Cookies.set('portalAuthRefreshToken', tokens.refresh.token, {
        expires: 30,
      })
      Cookies.set('userId', data.user.id, { expires: 30 })
      router.push(searchParams.get('callback') || '/agency/dashboard')

      setKeepLoading(true)
    } catch (error: any) {
      console.error(error)
      toast.error(
        error?.data?.message ||
          error?.message ||
          'Something went wrong. Please try again later.'
      )
    }
  }

  return (
    <div className='grid place-items-center pt-[100px]'>
      <Card
        as={'form'}
        action='#'
        className='mx-auto w-full sm:w-[400px]'
        noValidate
        onSubmit={handleSubmit(submitData)}
      >
        <CardHeader>
          {' '}
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
            <h1 className='text-lg font-bold '>Recylinker Agency Login</h1>
          </div>
        </CardHeader>
        <CardBody className='gap-5'>
          <InputField
            type='email'
            label='Email Address'
            isRequired
            placeholder='joshua@example.com'
            register={register('email', {
              required: 'Email Address is required',
            })}
            isInvalid={!!errors.email}
            value={watch('email')}
            errorMessage={errors.email?.message as string}
            onChange={(value: string) => setValue('email', value.toLowerCase())}
          />

          <InputField
            isRequired
            type='password'
            label='Password'
            placeholder='******'
            register={register('password', {
              required: 'Password is required',
            })}
            isInvalid={!!errors.password}
            errorMessage={errors.password?.message as string}
          />
          <div className='flex items-center justify-between'>
            <p className='text-sm text-gray-500'>
              No account?
              <Link
                className='ml-2 text-primary'
                href={`/agency/create-account${
                  searchParams.get('callback')
                    ? '?callback=' + searchParams.get('callback')
                    : ''
                }`}
              >
                Create Account
              </Link>
            </p>
            <Button
              color='primary'
              isLoading={isSubmitting || keepLoading}
              type='submit'
            >
              Login
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  )
}
export default LoginForm
