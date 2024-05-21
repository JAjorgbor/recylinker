'use client'
import { Map, Marker } from '@vis.gl/react-google-maps'
import React from 'react'

const center = {
  lat: 9.2915,
  lng: 7.4276,
}

function MapView() {
  return (
    <>
      <div className='w-full h-full'>
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultCenter={center}
          defaultZoom={50}
          gestureHandling={'greedy'}
          // disableDefaultUI={true}
        >
          <Marker position={center} />
        </Map>
      </div>
    </>
  )
}

export default React.memo(MapView)
