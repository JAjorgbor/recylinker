'use client'
import InputField from '@/components/elements/InputField'
import { Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import { recyclableMaterials } from '@/libraries/recyclable-materials-categories'
import { useEffect, useState, type FC } from 'react'
import { useForm } from 'react-hook-form'
import { Camera, Send } from 'react-feather'
import useHandleImageDraft from '@/hooks/useHandleImageDraft'
import { useRouter } from 'next/navigation'

interface OrderPickupFormProps {}

const OrderPickupForm: FC<OrderPickupFormProps> = ({}) => {
  const [trashImagePreview, setTrashImagePreview] = useState()
  const handleImageDraft = useHandleImageDraft()
  const router = useRouter()
  const {
    register,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  useEffect(() => {
    const subscribe = watch((value) => console.log(value))
    return () => subscribe.unsubscribe()
  }, [])

  return (
    <>
      <Card className='md:p-5'>
        <CardHeader className='font-bold text-xl'>
          Order New Trash Pickup
        </CardHeader>
        <CardBody>
          <form action='#'>
            <div className='grid md:grid-cols-2 gap-5'>
              <div className='grid md:grid-cols-2  gap-5 items-center '>
                <InputField
                  type='date'
                  label='Date'
                  isRequired
                  register={register('date')}
                />
                <InputField
                  type='time'
                  label='Time'
                  isRequired
                  register={register('time')}
                />
                <InputField
                  type='multi-select'
                  label='Trash Type'
                  isRequired
                  value={getValues('trashType')}
                  register={register('trashType', {
                    validate: (value) =>
                      value?.length > 0 || 'Select at least one category',
                  })}
                  onChange={(value: any) =>
                    setValue('trashType', Array.from(value) as any)
                  }
                  options={recyclableMaterials}
                  isInvalid={!!errors.trashType}
                  errorMessage={errors.trashType?.message as string}
                />
                <Button
                  endContent={<Send size={20} />}
                  variant='ghost'
                  color='primary'
                  onClick={() => router.push('/resident/pickups')}
                  type='button'
                >
                  Submit{' '}
                </Button>
              </div>
              <label
                className={`h-[250px] border block ${
                  !!errors?.image?.message
                    ? 'border-danger text-danger'
                    : 'border-primary text-primary'
                } rounded-lg grid place-items-center  bg-contain bg-center`}
                style={{
                  backgroundRepeat: 'no-repeat',
                  backgroundImage: `url('${
                    trashImagePreview || 'https://dummyImage.com/500x250'
                  }')`,
                }}
              >
                <input
                  type='file'
                  accept='.jpg, .png, .jpeg'
                  capture='environment'
                  hidden
                  {...register('locationPhotos1', {
                    validate: (value: any) =>
                      value?.[0] || 'Please capture an image',
                    onChange: (e) => {
                      handleImageDraft(e.target.files, setTrashImagePreview, 1)
                    },
                  })}
                />
                <Camera size={30} />
              </label>
            </div>
          </form>
        </CardBody>
      </Card>
    </>
  )
}
export default OrderPickupForm
