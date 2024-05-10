'use client'
import { portalLogin } from '@/api/portal-user/requests/auth'
import InputField from '@/components/elements/InputField'
import { Button, Link } from '@nextui-org/react'
import Cookies from 'js-cookie'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

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
      console.log(data)
      Cookies.set('token', data.token, { expires: 30 })
      Cookies.set('userId', data.user, { expires: 30 })

      router.push(searchParams.get('callback') ?? '/resident/dashboard')

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
    <>
      <form
        action='#'
        className='mx-auto mb-0 mt-8 max-w-md space-y-6'
        noValidate
        onSubmit={handleSubmit(submitData)}
      >
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
          onValueChange={(value: string) =>
            setValue('email', value.toLowerCase())
          }
        />

        <InputField
          isRequired
          type='password'
          label='Password'
          placeholder='******'
          register={register('password', { required: 'Password is required' })}
          isInvalid={!!errors.password}
          errorMessage={errors.password?.message as string}
        />
        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>
            No account?
            <Link
              className='ml-2'
              href={`/resident/create-account?callback=${searchParams.get(
                'callback'
              )}`}
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
      </form>
    </>
  )
}
export default LoginForm
