// File: components/ProfileComponent.tsx
'use client'

import { useState } from 'react'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface ProfileComponentProps {
  user: UserProfile
}

interface CardDetails {
  id?: string
  holderName: string
  company: string
  name: string
  type: string
  benefits: string[]
}

export default function ProfileComponent({ user }: ProfileComponentProps) {
  const [cardDetails, setCardDetails] = useState<CardDetails>({
    holderName: '',
    company: '',
    name: '',
    type: '',
    benefits: [],
  })
  const [savedCards, setSavedCards] = useState<CardDetails[]>([])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value })
  }

  const handleBenefitsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const benefits = Array.from(e.target.selectedOptions, option => option.value)
    setCardDetails({ ...cardDetails, benefits })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('cards')
      .insert([{ ...cardDetails, user_id: user.sub }])
    
    if (error) {
      console.error('Error saving card:', error)
    } else {
      console.log('Card saved successfully:', data)
      // Refresh the list of saved cards
      fetchSavedCards()
    }
  }

  const fetchSavedCards = async () => {
    const { data, error } = await supabase
      .from('cards')
      .select('*')
      .eq('user_id', user.sub)
    
    if (error) {
      console.error('Error fetching cards:', error)
    } else {
      setSavedCards(data || [])
    }
  }

  // Rest of the component remains the same...

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <p>Email: {user.email}</p>
      
      {/* Form and savedCards rendering remain the same... */}
    </div>
  )
}