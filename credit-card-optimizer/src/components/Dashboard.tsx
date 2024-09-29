// File: components/Dashboard.tsx
'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface CardUsage {
  cardId: string
  cardName: string
  usageCount: number
}

interface OptimizationSuggestion {
  merchantType: string
  recommendedCard: string
  potentialSavings: number
}

interface OptimizationHistoryRecord {
  recommended_card: string
  cards: {
    name: string
  }[]
}

export default function Dashboard() {
  const { user } = useUser()
  const [cardUsage, setCardUsage] = useState<CardUsage[]>([])
  const [suggestions, setSuggestions] = useState<OptimizationSuggestion[]>([])

  useEffect(() => {
    if (user) {
      fetchCardUsage()
      fetchOptimizationSuggestions()
    }
  }, [user])

  const fetchCardUsage = async () => {
    const { data, error } = await supabase
      .from('optimization_history')
      .select('recommended_card, cards(name)')
      .eq('user_id', user!.sub)

    if (error) {
      console.error('Error fetching card usage:', error)
    } else if (data) {
      const usage = (data as OptimizationHistoryRecord[]).reduce((acc: CardUsage[], record) => {
        const cardName = record.cards[0]?.name || 'Unknown Card'
        const existing = acc.find(u => u.cardId === record.recommended_card)
        if (existing) {
          existing.usageCount++
        } else {
          acc.push({
            cardId: record.recommended_card,
            cardName: cardName,
            usageCount: 1
          })
        }
        return acc
      }, [])
      setCardUsage(usage)
    }
  }

  const fetchOptimizationSuggestions = async () => {
    // This would typically involve complex logic, possibly calling an AI service
    // For demonstration, we'll use mock data
    setSuggestions([
      { merchantType: 'Grocery', recommendedCard: 'Cash Rewards Card', potentialSavings: 50 },
      { merchantType: 'Travel', recommendedCard: 'Miles Card', potentialSavings: 100 },
      { merchantType: 'Dining', recommendedCard: 'Dining Rewards Card', potentialSavings: 75 }
    ])
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Card Usage</h2>
        {cardUsage.map(usage => (
          <div key={usage.cardId} className="mb-2">
            <p>{usage.cardName}: Used {usage.usageCount} times</p>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Optimization Suggestions</h2>
        {suggestions.map((suggestion, index) => (
          <div key={index} className="mb-2">
            <p>For {suggestion.merchantType}: Use {suggestion.recommendedCard}</p>
            <p>Potential monthly savings: ${suggestion.potentialSavings}</p>
          </div>
        ))}
      </div>
    </div>
  )
}