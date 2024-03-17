'use client'
import type { FC, ReactNode } from 'react'
import { useRef } from 'react'
import InputField from '@/components/elements/InputField'
import { Button } from '@nextui-org/react'
import { Send } from 'react-feather'
import { useForm } from 'react-hook-form'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface ChatSectionProps {}

const ChatSection: FC<ChatSectionProps> = ({}) => {
  const textboxRef = useRef<HTMLDivElement>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()
  const submitData = async (data: any) => {
    reset()
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
      )
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      const result = await model.generateContentStream(data.prompt)

      let text = ''
      for await (const chunk of result.stream) {
        const chunkText = chunk.text()
        // console.log(chunkText)
        // text += chunkText
        if (textboxRef.current) textboxRef.current.innerText += chunkText
      }

      //   console.log(data)
    } catch (error: any) {
      console.error(error)
    }
  }
  return (
    <>
      <div className='mx-auto w-3/5 pb-[80px]' ref={textboxRef} />
      <form onSubmit={handleSubmit(submitData)} className='relative'>
        <div className='fixed left-0 md:left-[251px] bottom-0 w-full md:w-4/5 flex justify-center gap-4 items-center py-3 bg-background z-20'>
          <InputField
            type='text'
            className='w-4/5 md:w-2/5 rounded-2xl'
            variant='bordered'
            placeholder='Ask a question...'
            register={register('prompt', { required: 'Please enter a prompt' })}
            errorMessage={errors.prompts?.message as string}
          />
          {/* <Button
            type='submit'
            endContent={<Send size={15} />}
            color='primary'
            size='sm'
            isLoading={isSubmitting}
          >
            Submit
          </Button> */}
        </div>
      </form>
    </>
  )
}
export default ChatSection
