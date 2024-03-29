'use client'
import type { FC, ReactNode } from 'react'
import { toast } from 'sonner'
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
  Textarea,
  Divider,
} from '@nextui-org/react'
import { Send, Image as ImageIcon, Camera, X } from 'react-feather'
import { useForm } from 'react-hook-form'
import ReactMarkdown from 'react-markdown'
import { GoogleGenerativeAI } from '@google/generative-ai'

interface ChatSectionProps {}

const ChatSection: FC<ChatSectionProps> = ({}) => {
  const textboxRef = useRef<HTMLDivElement>(null)
  const [chatResponse, setChatResponse] = useState('')
  const [responseLoading, setResponseLoading] = useState(false)
  const [chatHistory, setChatHistory] = useState<any[]>([])
  const [selectedImage, setSelectedImage] = useState<null | string>(null)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm()

  const handleImageSelection = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 5000000) {
        setSelectedImage(null)
        toast.warning('Product image size can not exceed 1mb')
        console.log('Product image size can not exceed 1mb')
      } else {
        const imageUrl = URL.createObjectURL(file)
        if (inputType == 'image') {
          setValue('cameraInput', null)
        } else setValue('imageInput', null)
        setSelectedImage(imageUrl)
      }
    }
  }

  const userPromptRegex = /\*\*.*?\*\*/g // this regex is used to pick out the user prompt from the config prompt

  // Converts a File object to a GoogleGenerativeAI.Part object.
  async function fileToGenerativePart(file: File) {
    const base64EncodedDataPromise = new Promise((resolve) => {
      const reader: any = new FileReader()
      reader.onloadend = () => resolve(reader?.result?.split(',')[1])
      reader.readAsDataURL(file)
    })
    return {
      inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
    }
  }

  const formSubmitPrompt = async (data: any) => {
    setSelectedImage(null)
    reset({ prompt: '' })
    let history = [...chatHistory]
    // console.log(data)
    const promptConfig = `You are an assistive ai that specializes in giving detailed advice and instructions on how to recycle products at home creatively, the feedback you give is highly detailed and focuses on creative ideas on how to recycle items that can be readily recycled, you are to give at least 3 options of ways of recycling the given material in question with comprehensive feedback included. Any prompt provided below that does not fall in line with the directive of recycling should be replied with an appropriate response indicating that you are not designed to handle those kind of questions, if the recycling prompt that would be given below is not something that could be recycled at home then respond with a suggestion to the user to take the item or items to a drop off location or suggest that they could place a pickup order for the item for proper waste disposal and recycling with the appropriate authority needed to recycle the item in question, the prompt in question is this (ignore the ** **): **${data.prompt}**`
    const imagePrompt = data?.imageInput || data?.cameraInput

    const generationConfig = {
      temperature: 1,
    }
    // console.log(data.imageInput)
    setResponseLoading(true)
    try {
      const genAI = new GoogleGenerativeAI(
        process.env.NEXT_PUBLIC_GEMINI_API_KEY as string
      )
      let model
      let imageParts: any
      let result
      if (!imagePrompt || imagePrompt.length == 0) {
        // console.log('gemini-pro')

        model = genAI.getGenerativeModel({
          model: 'gemini-pro',
          generationConfig,
        })
        result = await model.generateContent(promptConfig)
      } else {
        // console.log('gemini-pro-vision')
        model = genAI.getGenerativeModel({
          model: 'gemini-pro-vision',
          generationConfig,
        })
        imageParts = await Promise.all(
          [...imagePrompt].map(fileToGenerativePart)
        )
        result = await model.generateContent([promptConfig, ...imageParts])
      }

      //   const result = await chat.sendMessage(promptConfig)

      const userMessage = { role: 'user', parts: [{ text: promptConfig }] }
      history.push(userMessage)

      //   console.log(history)
      //   setChatHistory(history)
      const response = await result.response
      const text = response.text()
      //   console.log(text)
      //   array = [...chatHistory]
      history.push({ role: 'model', parts: [{ text }] })
      setChatHistory(history)
      //   console.log(history)
      //   console.log(chatHistory)
    } catch (error: any) {
      console.error(error)
    } finally {
      reset()
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
                      <CardBody className='md-container'>
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
                      <CardBody className='md-container'>
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
              <div className='flex flex-col sm:grid sm:grid-cols-2 gap-3 mx-auto lg:w-3/5 sm:grid-rows-4'>
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
        <form onSubmit={handleSubmit(formSubmitPrompt)}>
          <div
            className='fixed left-0 lg:left-[251px] bottom-0 w-full lg:[width:calc(100%_-_251px)] 
           flex flex-col justify-center items-center gap-4 py-3 bg-background z-20'
          >
            <div className='flex gap-3'>
              {selectedImage && (
                <div className='relative h-[80px] w-[80px]'>
                  <button
                    className='rounded-full bg-default text-foreground absolute top-0 -right-1 z-20 p-0.5 flex'
                    type='button'
                    onClick={() => {
                      reset({ imageInput: null, cameraInput: null })
                      setSelectedImage(null)
                    }}
                  >
                    <X size={13} />
                  </button>
                  <Image
                    src={selectedImage ?? ''}
                    alt='preview'
                    fill
                    className='rounded-lg'
                  />
                </div>
              )}
            </div>
            <InputField
              type='textarea'
              disabled={responseLoading}
              //   disabled
              className='w-4/5 md:w-3/6 rounded-2xl'
              variant='bordered'
              placeholder='Ask a question...'
              register={register('prompt', {
                required: 'Please enter a prompt',
              })}
              errorMessage={errors.prompts?.message as string}
              minRows={1}
              endContent={
                <div className='flex gap-3 items-center'>
                  <label htmlFor='image-input'>
                    <input
                      type='file'
                      id='image-input'
                      accept='.jpg, .jpeg, .png'
                      className='hidden'
                      {...register('imageInput', {
                        onChange: (e) => handleImageSelection(e, 'image'),
                      })}
                    />
                    <button
                      type='button'
                      className='hover:text-primary flex items-center'
                      onClick={() => {
                        const imageInput = document.querySelector(
                          '#image-input'
                        ) as HTMLInputElement
                        imageInput.click()
                      }}
                    >
                      <ImageIcon size={20} />
                    </button>
                  </label>
                  <label htmlFor='camera-input'>
                    <input
                      capture='environment'
                      //   accept='.jpg, .jpeg, .png'
                      id='camera-input'
                      className='hidden'
                      type='file'
                      {...register('cameraInput', {
                        onChange: (e) => handleImageSelection(e, 'camera'),
                      })}
                    />
                    <button
                      className='hover:text-primary  flex items-center'
                      type='button'
                      onClick={() => {
                        const imageInput = document.querySelector(
                          '#camera-input'
                        ) as HTMLInputElement
                        imageInput.click()
                      }}
                    >
                      <Camera size={20} />
                    </button>
                  </label>
                  <button className='hover:text-primary' type='submit'>
                    <Send size={20} />
                  </button>
                </div>
              }
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
