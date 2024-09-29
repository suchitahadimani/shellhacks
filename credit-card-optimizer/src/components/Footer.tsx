'use client'

export default function Footer() {
    return (
      <footer className="bg-[#03BF62] text-white p-4 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 XPense. All rights reserved.</p>
          <div className="mt-2">
            <a href="/privacy" className="hover:underline mr-4">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </footer>
    )
  }