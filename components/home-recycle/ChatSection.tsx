'use client'
import type { FC, ReactNode } from 'react'
import { useRef, useState } from 'react'
import InputField from '@/components/elements/InputField'
import Image from 'next/image'
import {
  Skeleton,
  Button,
  CardHeader,
  Avatar,
  Card,
  CardBody,
} from '@nextui-org/react'
import { Send } from 'react-feather'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface ChatSectionProps {}

const ChatSection: FC<ChatSectionProps> = ({}) => {
  const textboxRef = useRef<HTMLDivElement>(null)
  const [chatResponse, setChatResponse] = useState('')
  const [responseLoading, setResponseLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<any[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm()

  const userPromptRegex = /\*\*.*?\*\*/g // this regex is used to pick out the user prompt from the config prompt

  const formSubmitPrompt = async (data: any) => {
    reset()
    // console.log(data)
    let history = [...chatHistory]
    setResponseLoading(true)
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
      )
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })
      const chat = model.startChat({ history: history })
      const promptConfig = `You are an assistive ai that specializes in giving detailed advice and instructions on how to recycle products at home creatively, the feedback you give is highly detailed and focuses on creative ideas on how to recycle items that can be readily recycled, you are to give at least 3 options of ways of recycling the given material in question. Any prompt provided below that does not fall in line with the directive of recycling should be replied with an appropriate response indicating that you are not designed to handle those kind of questions, if the recycling prompt that would be given below is not something that could be recycled at home then respond with a suggestion to the user to take the item or items to a drop off location or suggest that they could place a pickup order for the item for proper waste disposal and recycling with the appropriate authority needed to recycle the item in question, the prompt in question is this (ignore the ** **): **${data.prompt}**`
      const result = await chat.sendMessage(promptConfig)
      const userMessage = { role: 'user', parts: promptConfig }
      //   array.push(userMessage)

      //   console.log(history)
      //   setChatHistory(history)
      const response = await result.response
      const text = response.text()
      //   array = [...chatHistory]
      //   array.push({ role: 'model', parts: text })
      setChatHistory(history)
      //   console.log(history)
      //   console.log(chatHistory)
    } catch (error: any) {
      console.error(error)
    } finally {
      setResponseLoading(false)
    }
  }
  return (
    <>
      <section className='pb-[80px]'>
        {chatHistory.length > 0
          ? chatHistory?.map((each: any, index) => (
              <div
                className='flex flex-col gap-6 mx-auto w md:w-3/5 my-8'
                key={index}
              >
                {each.role == 'user' ? (
                  <div className='space-y-3'>
                    <p className='flex gap-3 items-center justify-end font-bold'>
                      User
                      <Avatar size='sm' />
                    </p>
                    <Card className='border bg-background border-primary'>
                      <CardBody>
                        <ReactMarkdown key={index}>
                          {/* {each?.parts?.[0]?.text?.match(userPromptRegex)?.[1]} */}
                          {each?.parts?.[0]?.text?.match(userPromptRegex)[1]}
                        </ReactMarkdown>
                        {/* {each?.parts?.[0]?.text} */}
                      </CardBody>
                    </Card>
                  </div>
                ) : (
                  <div className='space-y-3'>
                    <p className='flex gap-3 items-center font-bold'>
                      {/* <Image
                        src='/media/logo.png'
                        alt='logo'
                        height={80}
                        width={80}
                        className='w-5 h-5'
                      /> */}
                      <span className='text-[1.3rem]'> 🤖</span>
                      Recylinker Bot
                    </p>
                    <Card className=''>
                      <CardBody>
                        {/* {each.parts.map((each: any, index: number) => ( */}
                        <ReactMarkdown>{each?.parts?.[0]?.text}</ReactMarkdown>
                        {/* <ReactMarkdown key={index}>{each.text}</ReactMarkdown> */}
                        {/* ))} */}
                      </CardBody>
                    </Card>
                  </div>
                )}
              </div>
            ))
          : !responseLoading && (
              <div className='flex flex-col sm:grid sm:grid-cols-2 gap-3 mx-auto md:w-3/5 sm:grid-rows-4'>
                <div className='row-span-2 col-span-2 flex flex-col gap-3 items-center justify-start pb-8'>
                  <Image
                    src='/media/logo.png'
                    alt='logo'
                    height={80}
                    width={80}
                    className='w-12 h-12'
                  />
                  <p>What are we recycling today?</p>
                </div>
                <button
                  type='button'
                  className='hover:text-primary transition transform hover:-translate-y-1'
                  onClick={() => {
                    formSubmitPrompt({
                      prompt: 'How do i recycle a plastic bottle',
                    })
                  }}
                >
                  <Card>
                    <CardBody className='gap-2 text-inherit'>
                      <p>How do i recycle a plastic bucket</p>
                      <p className='text-sm text-foreground-300'>
                        Lorem ipsum dolor sit.
                      </p>
                    </CardBody>
                  </Card>
                </button>
                <button
                  type='button'
                  className='hover:text-primary transition transform hover:-translate-y-1'
                  onClick={() =>
                    formSubmitPrompt({
                      prompt: 'How do i recycle a plastic bottle at home',
                    })
                  }
                >
                  <Card>
                    <CardBody className='gap-2 text-inherit'>
                      <p>How do i recycle a plastic bottle at home</p>
                      <p className='text-sm text-foreground-300'>
                        Lorem ipsum dolor sit.
                      </p>
                    </CardBody>
                  </Card>
                </button>
                <button
                  type='button'
                  className='hover:text-primary transition transform hover:-translate-y-1'
                  onClick={() =>
                    formSubmitPrompt({
                      prompt: 'How do i recycle a news paper at home',
                    })
                  }
                >
                  <Card>
                    <CardBody className='gap-2'>
                      <p>How do i recycle news paper at home</p>
                      <p className='text-sm text-foreground-300 text-inherit'>
                        Lorem ipsum dolor sit.
                      </p>
                    </CardBody>
                  </Card>
                </button>
                <button
                  type='button'
                  className='hover:text-primary transition transform hover:-translate-y-1'
                  onClick={() =>
                    formSubmitPrompt({
                      prompt: 'How do i recycle a glass bottle at home',
                    })
                  }
                >
                  <Card>
                    <CardBody className='gap-2 text-inherit'>
                      <p>How do i recycle a glass bottle at home</p>
                      <p className='text-sm text-foreground-300'>
                        Lorem ipsum dolor sit.
                      </p>
                    </CardBody>
                  </Card>
                </button>
              </div>
            )}
        {responseLoading && (
          <Card className='md:w-3/5 mx-auto'>
            <CardBody className='gap-4'>
              <Skeleton className='w-4/5 h-8 rounded-lg' />
              <Skeleton className='w-3/5 h-8 rounded-lg' />
              <Skeleton className='w-2/5 h-8 rounded-lg' />
            </CardBody>
          </Card>
        )}
        <form onSubmit={handleSubmit(formSubmitPrompt)} className='relative'>
          <div className='fixed left-0 md:left-[251px] bottom-0 w-full md:w-4/5 flex justify-center gap-4 items-center py-3 bg-background z-20'>
            <InputField
              type='text'
              disabled={responseLoading}
              className='w-4/5 md:w-2/5 rounded-2xl'
              variant='bordered'
              placeholder='Ask a question...'
              register={register('prompt', {
                required: 'Please enter a prompt',
              })}
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
      </section>
    </>
  )
}
export default ChatSection
