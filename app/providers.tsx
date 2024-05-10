'use client'
import { Toaster } from 'sonner'
import * as React from 'react'
import { NextUIProvider } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import { store } from '@/features/store'
import { Provider } from 'react-redux'
import { APIProvider as GoogleMapsApiProvider } from '@vis.gl/react-google-maps'

export default function Providers({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  return (
    <>
      <Toaster richColors closeButton position='top-center' />
      <Provider store={store}>
        <GoogleMapsApiProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        >
          <NextUIProvider navigate={router.push}>{children}</NextUIProvider>
        </GoogleMapsApiProvider>
      </Provider>
    </>
  )
}
