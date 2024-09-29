'use client'

import { useState } from 'react'

export default function NFCScanner() {
  const [message, setMessage] = useState('')

  const handleNFCScan = async () => {
    if ('NDEFReader' in window) {
      try {
        const ndef = new (window as any).NDEFReader()
        await ndef.scan()
        setMessage('NFC scan started. Tap an NFC tag to your device.')

        ndef.addEventListener('reading', ({ message, serialNumber }: any) => {
          setMessage(`NFC tag read! Serial Number: ${serialNumber}`)
          for (const record of message.records) {
            setMessage(prev => `${prev}\nRecord type: ${record.recordType}`)
            setMessage(prev => `${prev}\nRecord data: ${new TextDecoder().decode(record.data)}`)
          }
        })
      } catch (error) {
        console.error(error)
        setMessage('Error: Unable to start NFC scan. Make sure NFC is enabled on your device.')
      }
    } else {
      setMessage('NFC is not supported on this device or browser.')
    }
  }

  return (
    <div>
      <button onClick={handleNFCScan} className="bg-[#03BF62] text-white px-4 py-2 rounded">
        Start NFC Scan
      </button>
      {message && (
        <div className="mt-4 p-4 bg-gray-800 rounded">
          <pre>{message}</pre>
        </div>
      )}
    </div>
  )
}