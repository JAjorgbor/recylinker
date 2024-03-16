'use client'
import { Toaster } from 'sonner'
import * as React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { store } from '@/features/store'
import { Provider } from 'react-redux'

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <>
      <Toaster />
      <Provider store={store}>
        <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
      </Provider>
    </>
  )
}
