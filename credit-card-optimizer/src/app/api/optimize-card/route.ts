// File: app/api/optimize-card/route.ts
import { NextResponse } from 'next/server'
import { getSession } from '@auth0/nextjs-auth0'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(req: Request) {
  const session = await getSession()
  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { location, merchantType } = await req.json()

  // Fetch user's cards from Supabase
  const { data: cards, error } = await supabase
    .from('cards')
    .select('*')
    .eq('user_id', session.user.sub)

  if (error) {
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 })
  }

  // Prepare prompt for Perplexity AI
  const prompt = `Given the user's location: ${location}, merchant type: ${merchantType}, and their cards: ${JSON.stringify(cards)}, which card should they use for the best rewards? Provide a brief explanation for the recommendation.`

  // Call Perplexity AI API
  const perplexityResponse = await fetch('https://api.perplexity.ai/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.PERPLEXITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'mixtral-8x7b-instruct',
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const perplexityData = await perplexityResponse.json()

  // Extract recommendation from Perplexity AI response
  const recommendation = perplexityData.choices[0].message.content

  return NextResponse.json({ recommendation })
}