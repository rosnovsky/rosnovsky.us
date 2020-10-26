import React from 'react'
import Layout from '../components/Layout/layout'
import { useAuth0 } from '../utils/auth'
import { ProtectedRoute } from '../components/Account/protected-route'
import Header from '../components/Header/header'

const Account = () => {
  const { loading, user, isAuthenticated } = useAuth0()
  if (loading || !user) {
    return <p>Loading...</p>
  }

  return (
    <Layout>
      <ProtectedRoute>
        <p>Check out the user data supplied by Auth0, below:</p>
        <pre>{isAuthenticated && JSON.stringify(user, null, 2)}</pre>
      </ProtectedRoute>
    </Layout>
  )
}

export default Account
