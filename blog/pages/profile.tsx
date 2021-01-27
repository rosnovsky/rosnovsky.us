import { useFetchUser } from '../utils/user'
import Router from 'next/router'

export default function Profile() {
  const { user, loading } = useFetchUser()

  if (loading) {
    return <p>Loading...</p>
  }
  if (!user && !loading) {
    Router.replace('/')
  }

  return (
    <>
      <h1>🤸</h1>
      <p>Welcome to the Profile Page! Here is your profile information:</p>
      <pre>{JSON.stringify(user)}</pre>
    </>
  )
}
