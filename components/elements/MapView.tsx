'use client'
import { Map } from '@vis.gl/react-google-maps'
import React from 'react'

const center = {
  lat: 7.4481664,
  lng: 9.060352,
}

function MapView() {
  return (
    <>
      <div className='w-full h-full'>
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: 7.4277, lng: 9.2914 }}
          defaultZoom={50}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
      </div>
    </>
  )
}

export default React.memo(MapView)
