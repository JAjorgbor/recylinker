'use client'
import { portalCreateAccount } from '@/api/portal-user/requests/auth'
import InputField from '@/components/elements/InputField'
import useHandleImageDraft from '@/hooks/useHandleImageDraft'
import { Avatar, Button, Tab, Tabs } from '@nextui-org/react'
import Cookies from 'js-cookie'
import Link from 'next/link'
import imageCompression from 'browser-image-compression'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight, MapPin, User, Camera } from 'react-feather'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import useImageCompressor from '@/hooks/useImageCompressor'

const CreateAccountForm = () => {
  const [keepLoading, setKeepLoading] = useState(false)
  const [selectedTab, setSelectedTab] = useState('personal-details')
  const [showSubmitButton, setShowSubmitButton] = useState(false)
  const [formFields, setFormFields] = useState({})
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState('')
  const [locationPhotosUrls, setAgencyLocationPhotoPreviewUrls] = useState([])

  const compressImage = useImageCompressor()

  const handleLocationPhotosUpload = (imageUrl: string, index: number) => {
    const arr = [...locationPhotosUrls] as any
    arr[index] = imageUrl
    setAgencyLocationPhotoPreviewUrls(arr)
  }

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
      avatar: undefined,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
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

  useEffect(() => {
    const subscribe = watch((values) => setFormFields(values))
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

  useEffect(() => {
    reset(formFields)
    selectedTab == 'address'
      ? setTimeout(() => {
          setShowSubmitButton(true)
        }, 0)
      : setShowSubmitButton(false)
  }, [selectedTab])

  const submitData = async (formFields: any) => {
    try {
      console.log(formFields)
      formFields.avatar = await compressImage(formFields.avatar)
      formFields.locationPhotos1 = await compressImage(
        formFields.locationPhotos1
      )
      formFields.locationPhotos2 = await compressImage(
        formFields.locationPhotos2
      )
      formFields.locationPhotos3 = await compressImage(
        formFields.locationPhotos3
      )
      console.log(formFields)
      const { data } = await portalCreateAccount(formFields)
      const { tokens } = data
      console.log(data)
      Cookies.set('portalUserAccessToken', tokens.access.token, { expires: 30 })
      Cookies.set('portalUserRefreshToken', tokens.refresh.token, {
        expires: 30,
      })
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
  const handleSelectedTabChange = async (key: any) => {
    const isPersonalDetailsValid = await trigger([
      'avatar',
      'firstName',
      'lastName',
      'email',
      'phoneNumber',
      'password',
      'confirmPassword',
    ])
    if (key == 'address' && isPersonalDetailsValid) setSelectedTab(key)
    else setSelectedTab('personal-details')
  }
  return (
    <>
      <form
        action='#'
        className='mx-auto mb-0 mt-8 max-w-md space-y-6'
        noValidate
        onSubmit={handleSubmit(submitData)}
        // onSubmit={submitData}
      >
        <Tabs
          aria-label='Options'
          color='primary'
          selectedKey={selectedTab}
          onSelectionChange={handleSelectedTabChange}
        >
          <Tab
            key='personal-details'
            title={
              <div className='flex gap-1 items-center'>
                <User size={15} />
                Personal Details
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
                    {...register('avatar', {
                      validate: (value: any) =>
                        value?.[0] || 'Profile Avatar is required',
                      onChange: (e) =>
                        handleImageDraft(e.target.files, setAvatarPreviewUrl),
                    })}
                  />
                  <Avatar size='lg' src={avatarPreviewUrl} />
                </label>
                <p className='text-sm'>
                  Profile Avatar<span className='text-danger'>*</span>
                </p>
                <p className='text-xs text-danger'>{errors?.avatar?.message}</p>
              </div>
              <InputField
                type='text'
                label='First Name'
                isRequired
                placeholder='Joshua'
                value={getValues('firstName')}
                register={register('firstName', {
                  required: 'First name is required',
                })}
                isInvalid={!!errors.firstName}
                errorMessage={errors.firstName?.message as string}
              />

              <InputField
                type='text'
                label='Last Name'
                isRequired
                placeholder='Ajorgbor'
                value={getValues('lastName')}
                register={register('lastName', {
                  required: 'Last name is required',
                })}
                isInvalid={!!errors.lastName}
                errorMessage={errors.lastName?.message as string}
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
                    User Location Photos <span className='text-danger'>*</span>
                  </p>
                  <small className='text-sm text-foreground-300'>
                    Photos of the of your physical location.{' '}
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
                        locationPhotosUrls[1] || 'https://dummyImage.com/100x80'
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
                        locationPhotosUrls[2] || 'https://dummyImage.com/100x80'
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
                        locationPhotosUrls[3] || 'https://dummyImage.com/100x80'
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

        <div className='flex items-center justify-between'>
          <p className='text-sm text-gray-500'>
            Already have an account?
            <Link
              className='ml-2 text-primary'
              href={`/resident?callback=${searchParams.get('callback') ?? ''}`}
            >
              Login
            </Link>
          </p>
        </div>
        <div className='flex justify-between'>
          <Button
            color='default'
            disabled={selectedTab == 'personal-details'}
            type='button'
            startContent={<ArrowLeft size={15} />}
            onClick={() => setSelectedTab('personal-details')}
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
      </form>
    </>
  )
}
export default CreateAccountForm
