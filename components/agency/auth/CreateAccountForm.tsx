'use client'
import { portalAgencyCreateAccount } from '@/api/portal-agency/requests/auth'
import InputField from '@/components/elements/InputField'
import useGetFormData from '@/hooks/useGetFormData'
import useHandleImageDraft from '@/hooks/useHandleImageDraft'
import { recyclableMaterials } from '@/libraries/recyclable-materials-categories'
import { Button, Card, CardBody, Tab, Tabs } from '@nextui-org/react'
import Cookies from 'js-cookie'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, Camera, MapPin, User } from 'react-feather'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

const CreateAccountForm = () => {
  const [keepLoading, setKeepLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('agency-details')
  const [showSubmitButton, setShowSubmitButton] = useState(false)
  const [formFields, setFormFields] = useState({})
  const [brandLogoPreviewUrl, setBrandLogoPreviewUrl] = useState()
  const [locationPhotosUrls, setAgencyLocationPhotoPreviewUrls] = useState([])
  const handleImageDraft = useHandleImageDraft()

  const searchParams = useSearchParams()
  const {
    register,
    reset,
    handleSubmit,
    watch,
    setValue,
    getValues,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      brandLogo: undefined,
      brandName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      recyclableCategories: '',
      phoneNumber: '',
      locationPhotos1: undefined,
      locationPhotos2: undefined,
      locationPhotos3: undefined,
      address: {
        street: '',
        city: '',
        longitude: 0,
        latitude: 0,
      },
    },
  })
  const router = useRouter()
  const objectToFormData = useGetFormData()

  useEffect(() => {
    const subscribe = watch((values) => {
      // console.log(values)
      setFormFields(values)
    })
    return () => subscribe.unsubscribe()
  }, [])

  const getCoords = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setValue('address.latitude', position.coords.latitude)
          setValue('address.longitude', position.coords.longitude)
        },
        (error) => {
          console.log(error.message)
        }
      )
    } else {
      console.log('Geolocation is not supported by your browser.')
    }
  }

  const handleLocationPhotosUpload = (imageUrl: string, index: number) => {
    const arr = [...locationPhotosUrls] as any
    arr[index] = imageUrl
    setAgencyLocationPhotoPreviewUrls(arr)
  }

  useEffect(() => {
    console.log(formFields)
    reset(formFields)
    selectedTab == 'address'
      ? setTimeout(() => {
          setShowSubmitButton(true)
        }, 0)
      : setShowSubmitButton(false)
  }, [selectedTab])

  const submitData = async (formFields: any) => {
    try {
      const { data } = await portalAgencyCreateAccount(formFields)
      const { tokens } = data
      console.log(data)
      Cookies.set('portalAgencyAccessToken', tokens.access.token, {
        expires: 30,
      })
      Cookies.set('portalAgencyRefreshToken', tokens.refresh.token, {
        expires: 30,
      })
      router.push(searchParams.get('callback') ?? '/agency/dashboard')
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
  const handleSelectedTabChange = async (key: any) => {
    const isAgencyDetailsValid = await trigger([
      'brandName',
      'recyclableCategories',
      'brandLogo',
      'email',
      'phoneNumber',
      'password',
      'confirmPassword',
    ])
    if (key == 'address' && isAgencyDetailsValid) setSelectedTab(key)
    else setSelectedTab('agency-details')
    // setSelectedTab(key)
  }
  return (
    <>
      <Card
        as='form'
        action='#'
        className='mx-auto mb-0 max-w-lg '
        noValidate
        onSubmit={handleSubmit(submitData)}
        // onSubmit={submitData}
      >
        <CardBody className='space-y-3 '>
          <div className='mx-auto max-w-lg text-center my-5'>
            <Link href='/' className='inline-block'>
              <Image
                src='/media/logo.png'
                alt='logo'
                className='w-12'
                width={80}
                height={80}
              />
            </Link>
            <h1 className='text-lg font-bold'>
              Create Recylinker Agency Account
            </h1>
          </div>
          <Tabs
            aria-label='Options'
            color='primary'
            selectedKey={selectedTab}
            onSelectionChange={handleSelectedTabChange}
          >
            <Tab
              key='agency-details'
              title={
                <div className='flex gap-1 items-center'>
                  <User size={15} />
                  Agency Details
                </div>
              }
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='md:col-span-2 flex items-center flex-col gap-3'>
                  <label>
                    <input
                      type='file'
                      accept='.jpg, .png, .jpeg'
                      hidden
                      {...register('brandLogo', {
                        validate: (value: any) =>
                          value?.[0] || 'Brand logo is required',
                        onChange: (e) => {
                          handleImageDraft(
                            e.target.files,
                            setBrandLogoPreviewUrl
                          )
                        },
                      })}
                    />
                    <div
                      className={`w-[100px] h-[80px] border ${
                        !!errors?.brandLogo?.message
                          ? 'border-danger text-danger'
                          : 'border-primary text-primary'
                      } rounded-lg grid place-items-center  bg-contain bg-center`}
                      style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url('${
                          brandLogoPreviewUrl || 'https://dummyImage.com/100x80'
                        }')`,
                      }}
                    >
                      <Camera size={20} />
                    </div>
                  </label>
                  <p className='text-sm'>
                    Brand Logo <span className='text-danger'>*</span>
                  </p>
                  <p className='text-xs text-danger'>
                    {errors?.brandLogo?.message}
                  </p>
                </div>
                <InputField
                  type='text'
                  label='Brand Name'
                  isRequired
                  placeholder='Recy Agency'
                  value={getValues('brandName')}
                  register={register('brandName', {
                    required: 'First name is required',
                  })}
                  isInvalid={!!errors.brandName}
                  errorMessage={errors.brandName?.message as string}
                />

                <InputField
                  type='multi-select'
                  label='Accepted Categories'
                  isRequired
                  value={getValues('recyclableCategories')}
                  register={register('recyclableCategories', {
                    validate: (value) =>
                      value?.length > 0 || 'Select at least one category',
                  })}
                  onChange={(value: any) =>
                    setValue('recyclableCategories', Array.from(value) as any)
                  }
                  options={recyclableMaterials}
                  isInvalid={!!errors.recyclableCategories}
                  errorMessage={errors.recyclableCategories?.message as string}
                />
                <InputField
                  type='email'
                  label='Email Address'
                  isRequired
                  className='md:col-span-2'
                  placeholder='joshua@example.com'
                  register={register('email', {
                    required: 'Email Address is required',
                  })}
                  isInvalid={!!errors.email}
                  value={watch('email')}
                  errorMessage={errors.email?.message as string}
                  onChange={(value: string) =>
                    setValue('email', value.toLowerCase())
                  }
                />
                <InputField
                  type='text'
                  label='Phone Number'
                  isRequired
                  className='md:col-span-2'
                  placeholder='090 000 000 10'
                  value={getValues('phoneNumber')}
                  register={register('phoneNumber', {
                    required: 'Last name is required',
                  })}
                  isInvalid={!!errors.phoneNumber}
                  errorMessage={errors.phoneNumber?.message as string}
                />

                <InputField
                  isRequired
                  type='password'
                  label='Password'
                  placeholder='******'
                  value={getValues('password')}
                  register={register('password', {
                    required: 'Password is required',
                    validate: (value) =>
                      value == getValues('confirmPassword') ||
                      "Passwords don't match",
                  })}
                  isInvalid={!!errors.password}
                  errorMessage={errors.password?.message as string}
                />
                <InputField
                  isRequired
                  type='password'
                  label='Confirm Password'
                  placeholder='******'
                  value={getValues('confirmPassword')}
                  register={register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) =>
                      value == getValues('password') || "Passwords don't match",
                  })}
                  isInvalid={!!errors.confirmPassword}
                  errorMessage={errors.confirmPassword?.message as string}
                />
              </div>
            </Tab>
            <Tab
              key='address'
              title={
                <div className='flex gap-1 items-center'>
                  <MapPin size={15} />
                  Address
                </div>
              }
            >
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <InputField
                  type='text'
                  label='Street'
                  isRequired
                  placeholder='No 15 katampe street'
                  register={register('address.street', {
                    required: 'Email Address is required',
                  })}
                  isInvalid={!!errors.address?.street}
                  value={watch('address.street')}
                  errorMessage={errors.address?.street?.message as string}
                />
                <InputField
                  type='text'
                  label='City'
                  isRequired
                  placeholder='Ushafa'
                  register={register('address.city', {
                    required: 'Email Address is required',
                  })}
                  isInvalid={!!errors.address?.city}
                  value={watch('address.city')}
                  errorMessage={errors.address?.city?.message as string}
                />
                <div className='md:col-span-2 '>
                  <p className='text-foreground-400 text-sm space-x-3'>
                    <span>
                      We need your exact coordinates in order to accurately put
                      you on our maps.
                    </span>
                    <Button
                      type='button'
                      size='sm'
                      color='primary'
                      variant='ghost'
                      className='py-1 px-2'
                      onClick={getCoords}
                    >
                      Get Coordinates
                    </Button>
                  </p>
                </div>
                <InputField
                  type='number'
                  label='Longitude'
                  isRequired
                  disabled
                  register={register('address.longitude', {
                    required: 'Longitude is required',
                    setValueAs: (value) => parseFloat(value),
                  })}
                  isInvalid={!!errors.address?.longitude}
                  value={getValues('address.longitude')}
                  errorMessage={errors.address?.longitude?.message as string}
                />
                <InputField
                  type='number'
                  label='Latitude'
                  disabled
                  isRequired
                  register={register('address.latitude', {
                    required: 'Latitude is required',
                  })}
                  isInvalid={!!errors.address?.latitude}
                  value={watch('address.latitude')}
                  errorMessage={errors.address?.latitude?.message as string}
                />
                <div className='space-y-2 md:col-span-2'>
                  <div>
                    <p className='text-sm'>
                      Agency Location Photos{' '}
                      <span className='text-danger'>*</span>
                    </p>
                    <small className='text-sm text-foreground-300'>
                      Photos of the agency&apos;s physical location.{' '}
                    </small>
                  </div>
                  <small className='text-sm text-danger'>
                    {(!errors?.locationPhotos1?.message &&
                      !errors?.locationPhotos2?.message &&
                      !errors?.locationPhotos3?.message) ||
                      "Please capture 3 images of the agency's location"}
                  </small>
                </div>

                <div className='flex gap-3'>
                  <label>
                    <div
                      className={`w-[100px] h-[80px] border ${
                        !!errors.locationPhotos1?.message
                          ? 'border-danger text-danger'
                          : 'border-primary text-primary'
                      } rounded-lg grid place-items-center text-primary bg-contain bg-center`}
                      style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url('${
                          locationPhotosUrls[1] ||
                          'https://dummyImage.com/100x80'
                        }')`,
                      }}
                    >
                      <Camera size={20} />
                    </div>
                    <input
                      type='file'
                      accept='.jpg, .png, .jpeg'
                      capture='environment'
                      hidden
                      {...register('locationPhotos1', {
                        validate: (value: any) =>
                          value?.[0] || 'Please capture an image',
                        onChange: (e) => {
                          handleImageDraft(
                            e.target.files,
                            handleLocationPhotosUpload,
                            1
                          )
                        },
                      })}
                    />
                  </label>
                  <label>
                    <div
                      className={`w-[100px] h-[80px] border ${
                        !!errors.locationPhotos2?.message
                          ? 'border-danger text-danger'
                          : 'border-primary text-primary'
                      } rounded-lg grid place-items-center text-primary bg-contain bg-center`}
                      style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url('${
                          locationPhotosUrls[2] ||
                          'https://dummyImage.com/100x80'
                        }')`,
                      }}
                    >
                      <Camera size={20} />
                    </div>
                    <input
                      type='file'
                      accept='.jpg, .png, .jpeg'
                      capture='environment'
                      hidden
                      {...register('locationPhotos2', {
                        validate: (value: any) =>
                          value?.[0] || 'Please capture an image',
                        onChange: (e) => {
                          handleImageDraft(
                            e.target.files,
                            handleLocationPhotosUpload,
                            2
                          )
                        },
                      })}
                    />
                  </label>
                  <label>
                    <div
                      className={`w-[100px] h-[80px] border ${
                        !!errors.locationPhotos3?.message
                          ? 'border-danger text-danger'
                          : 'border-primary text-primary'
                      } rounded-lg grid place-items-center text-primary bg-contain bg-center`}
                      style={{
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: `url('${
                          locationPhotosUrls[3] ||
                          'https://dummyImage.com/100x80'
                        }')`,
                      }}
                    >
                      <Camera size={20} />
                    </div>
                    <input
                      type='file'
                      accept='.jpg, .png, .jpeg'
                      capture='environment'
                      hidden
                      {...register('locationPhotos3', {
                        validate: (value: any) =>
                          value?.[0] || 'Please capture an image',
                        onChange: (e) => {
                          handleImageDraft(
                            e.target.files,
                            handleLocationPhotosUpload,
                            3
                          )
                        },
                      })}
                    />
                  </label>
                </div>
              </div>
            </Tab>
          </Tabs>
          <div className='flex items-center justify-between '>
            <p className='text-sm text-gray-500'>
              Already have an account?
              <Link
                className='ml-2 text-primary'
                href={`/agency${
                  searchParams.get('callback')
                    ? '?callback=' + searchParams.get('callback')
                    : ''
                }`}
              >
                Login
              </Link>
            </p>
          </div>
          <div className='flex justify-between'>
            <Button
              color='default'
              disabled={selectedTab == 'agency-details'}
              type='button'
              startContent={<ArrowLeft size={15} />}
              onClick={() => setSelectedTab('agency-details')}
            >
              Back
            </Button>
            {!showSubmitButton ? (
              <Button
                color='primary'
                isLoading={isSubmitting || keepLoading}
                type='button'
                endContent={<ArrowRight size={15} />}
                onClick={() => handleSelectedTabChange('address')}
              >
                Next
              </Button>
            ) : (
              <Button
                color='primary'
                isLoading={isSubmitting || keepLoading}
                type='submit'
              >
                Create Account
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </>
  )
}
export default CreateAccountForm
