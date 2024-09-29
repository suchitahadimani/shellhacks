'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function CardOptimizer() {
  const [location, setLocation] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const { user, error, isLoading } = useUser()

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(`${position.coords.latitude},${position.coords.longitude}`)
      })
    }
  }, [])

  const optimizeCard = async () => {
    if (!user) return

    const response = await fetch('/api/optimize-card', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location }),
    })
    const data = await response.json()
    setRecommendation(data.recommendation)
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>{error.message}</div>

  return (
    <div>
      <button onClick={optimizeCard} className="bg-[#03BF62] text-white px-4 py-2 rounded">
        Optimize Card
      </button>
      {recommendation && (
        <div className="mt-4">
          <h3 className="text-xl font-bold">Recommendation:</h3>
          <p>{recommendation}</p>
        </div>
      )}
    </div>
  )
}