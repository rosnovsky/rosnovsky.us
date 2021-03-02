import { AppProps } from 'next/app'
import { useEffect } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'
import '../styles/index.css'
import LogRocket from 'logrocket'
LogRocket.init('sajfyt/rosnovsky-park')

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    // Initialize Fathom when the app loads
    Fathom.load('IMKYNEVQ', {
      includedDomains: ['rosnovsky.us'],
    })

    function onRouteChangeComplete() {
      Fathom.trackPageview()
      // Fathom.trackGoal('X9Y2BWVS', 1000)
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete)

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete)
    }
  }, [])
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  )
}
