import dynamic from 'next/dynamic'

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
})

export default function Maps() {
  return (
    <div className="h-screen">
      <MapComponent />
    </div>
  )
}