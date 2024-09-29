import NFCScanner from '@/components/NFCScanner'

export default function NFC() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">NFC Scanner</h1>
      <NFCScanner />
    </div>
  )
}