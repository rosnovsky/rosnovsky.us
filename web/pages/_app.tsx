import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { SWRConfig } from 'swr';
import fetcher from '@lib/fetcher';
import '../styles/global.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';

function RosnovskyPark({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // Initialize Fathom when the app loads
  useEffect(() => {
    Fathom.load('IMKYNEVQ', {
      includedDomains: ['rosnovsky.us', '*.vercel.app', 'localhost:3000'],
      honorDNT: true,
      url: 'https://llama.rosnovsky.us/script.js',
    });
    function onRouteChangeComplete() {
      Fathom.trackPageview();
    }
    // Record a pageview when route changes
    router.events.on('routeChangeComplete', onRouteChangeComplete);

    // Unassign event listener
    return () => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
    };
  }, []);

  return (
    <UserProvider>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </UserProvider>
  );
}

export default RosnovskyPark;
