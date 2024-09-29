'use client'

import Link from 'next/link'
import { useUser } from '@auth0/nextjs-auth0/client'

export default function Navbar() {
  const { user, error, isLoading } = useUser()

  return (
    <nav className="bg-[#03BF62] p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">XPen$e</Link>
        <div className="space-x-4">
          <Link href="/maps">Maps</Link>
          <Link href="/nfc">NFC</Link>
          {!isLoading && (
            <>
              {user ? (
                <>
                  <Link href="/profile">Profile</Link>
                  <Link href="/api/auth/logout">Logout</Link>
                </>
              ) : (
                <Link href="/api/auth/login">Login</Link>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}