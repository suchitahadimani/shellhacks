import { getSession } from '@auth0/nextjs-auth0'
import ProfileComponent from '@/components/ProfileComponent'

export default async function Profile() {
  const session = await getSession()
  if (!session) {
    return <div>Please log in to view your profile.</div>
  }
  return <ProfileComponent user={session.user} />
}