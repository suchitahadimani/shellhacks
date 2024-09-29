// File: app/page.tsx
import { BackgroundGradient } from '@/components/ui/background-gradient'
import {  BoxesCore } from '@/components/ui/background-boxes'
import { SparklesCore } from '@/components/ui/sparkles'
import CardOptimizer from '@/components/CardOptimizer'

export default function Home() {
  return (
    <div className="relative h-screen overflow-hidden">
      <BackgroundGradient className="absolute inset-0 z-0" />
      <BoxesCore className="absolute inset-0 z-10" />
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold mb-4">Welcome to XPen$e</h1>
        <p className="text-xl mb-8">Optimize your credit card usage and rewards with AI-powered recommendations</p>
        <div className="w-[40rem] h-40 relative">
          <SparklesCore
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#FFFFFF"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <CardOptimizer />
          </div>
        </div>
      </div>
    </div>
  )
}