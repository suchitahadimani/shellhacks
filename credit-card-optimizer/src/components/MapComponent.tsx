// File: components/MapComponent.tsx
'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader } from '@googlemaps/js-api-loader'

interface Merchant {
  name: string
  location: google.maps.LatLngLiteral
  type: string
}

export default function MapComponent() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [merchants, setMerchants] = useState<Merchant[]>([])

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
        version: 'weekly',
        libraries: ['places']
      })

      const google = await loader.load()
      const { Map } = google.maps

      if (mapRef.current) {
        const newMap = new Map(mapRef.current, {
          center: { lat: 0, lng: 0 },
          zoom: 15,
        })
        setMap(newMap)

        // Get user's current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              }
              newMap.setCenter(pos)
              searchNearbyPlaces(newMap, pos)
            },
            () => {
              console.error('Error: The Geolocation service failed.')
            }
          )
        }
      }
    }

    initMap()
  }, [])

  const searchNearbyPlaces = (map: google.maps.Map, center: google.maps.LatLngLiteral) => {
    const service = new google.maps.places.PlacesService(map)
    service.nearbySearch(
      {
        location: center,
        radius: 500,
        type: 'store' // Changed from array to single string
      },
      (
        results: google.maps.places.PlaceResult[] | null,
        status: google.maps.places.PlacesServiceStatus
      ) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const newMerchants = results.map(place => ({
            name: place.name || 'Unknown Place',
            location: place.geometry?.location?.toJSON() || center,
            type: place.types?.[0] || 'unknown'
          }))
          setMerchants(newMerchants)
          newMerchants.forEach(merchant => addMarker(map, merchant))
        }
      }
    )
  }

  const addMarker = (map: google.maps.Map, merchant: Merchant) => {
    const marker = new google.maps.Marker({
      position: merchant.location,
      map: map,
      title: merchant.name
    })

    marker.addListener('click', () => {
      optimizeCard(merchant)
    })
  }

  const optimizeCard = async (merchant: Merchant) => {
    const response = await fetch('/api/optimize-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: `${merchant.location.lat},${merchant.location.lng}`,
        merchantType: merchant.type
      }),
    })
    const data = await response.json()
    alert(`Recommended card for ${merchant.name}: ${data.recommendation}`)
  }

  return <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
}