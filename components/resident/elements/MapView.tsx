'use client'
import { Map } from '@vis.gl/react-google-maps'
import React from 'react'

const center = {
  lat: 9.2907,
  lng: 7.4164,
}

function MapView() {
  return (
    <>
      <div className='w-full h-full'>
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={{ lat: 9.2907, lng: 7.4164 }}
          defaultZoom={50}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
        />
      </div>
    </>
  )
}

export default React.memo(MapView)
