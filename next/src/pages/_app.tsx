import { withTRPC } from '@trpc/next';
import { AppType } from 'next/dist/shared/lib/utils';
import superjson from 'superjson';
import type { AppRouter } from '../server/router';
import { UserProvider } from '@auth0/nextjs-auth0';
import '../styles/globals.css';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import * as Fathom from 'fathom-client';

const MyApp: AppType = ({ Component, pageProps }) => {
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
  return <UserProvider><Component {...pageProps} /></UserProvider>;
};

export default withTRPC<AppRouter>({
  config({ ctx }) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        transformer: superjson, // optional - adds superjson serialization
        url: '/api/trpc',
      };
    }
    // during SSR below

    // optional: use SSG-caching for each rendered page (see caching section for more details)
    const ONE_DAY_SECONDS = 60 * 60 * 24;
    ctx?.res?.setHeader(
      'Cache-Control',
      `s-maxage=1, stale-while-revalidate=${ONE_DAY_SECONDS}`,
    );

    // The server needs to know your app's full url
    // On render.com you can use `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}/api/trpc`
    const url = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}/api/trpc`
      : 'http://localhost:3000/api/trpc';

    return {
      transformer: superjson, // optional - adds superjson serialization
      url,
      headers: {
        // optional - inform server that it's an ssr request
        'x-ssr': '1',
      },
    };
  },
  ssr: true,

})(MyApp);
