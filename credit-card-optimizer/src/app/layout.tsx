// File: app/layout.tsx
import { UserProvider } from '@auth0/nextjs-auth0/client'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata = {
  title: 'Credit Card Optimizer',
  description: 'Optimize your credit card usage with AI-powered recommendations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <UserProvider>
        <body className="min-h-screen bg-black text-white">
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </UserProvider>
    </html>
  )
}