'use client'
import {
  APIProvider as GoogleMapsApiProvider,
  Map,
  useMapsLibrary,
  useMap,
  Marker,
} from '@vis.gl/react-google-maps'
import React, { useEffect, useState } from 'react'

const center = {
  lat: 9.2915,
  lng: 7.4276,
}

function MapView({ lng, lat }: { lng: number; lat: number }) {
  return (
    <>
      <div className='w-full h-full'>
        <GoogleMapsApiProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
        >
          <Map
            style={{ width: '100%', height: '100%' }}
            // defaultCenter={center}
            defaultZoom={50}
            gestureHandling={'greedy'}
            fullscreenControl={false}
            // disableDefaultUI={true}
          >
            <Directions lat={lat} lng={lng} />
            <Marker position={center} />
          </Map>
        </GoogleMapsApiProvider>
      </div>
    </>
  )
}

export default React.memo(MapView)

function Directions({
  lat = 9.2243,
  lng = 7.4165,
}: {
  lng: number
  lat: number
}) {
  const map = useMap()
  const routesLibrary = useMapsLibrary('routes')
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>()
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService>()
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>()

  useEffect(() => {
    if (!routesLibrary || !map) return
    setDirectionsService(new routesLibrary.DirectionsService())
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }))
  }, [routesLibrary, map])

  useEffect(() => {
    if (!directionsService || !directionsRenderer) return
    directionsService
      .route({
        origin: new google.maps.LatLng(9.2243, 7.4165),
        destination: new google.maps.LatLng(lat, lng),
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((res) => {
        directionsRenderer.setDirections(res)
        setRoutes(res.routes)
      })
  }, [directionsService, directionsRenderer, lat, lng])
  return null
}
