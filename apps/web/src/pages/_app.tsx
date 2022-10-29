import { useEffect, useRef } from 'react'
import * as Fathom from 'fathom-client';

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

import '@/styles/tailwind.css'
import 'focus-visible'
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import ErrorBoundary from '@/components/ErrorBoundary'
import Error from '@/pages/_error'

import { Analytics } from '@vercel/analytics/react';

function usePrevious(value: any) {
  const ref = useRef<any>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const RosnovskyPark: AppType = ({
  Component,
  pageProps: { ...pageProps },
  router
}) => {
  useEffect(() => {
    // Initialize Fathom when the app loads
    // Example: yourdomain.com
    //  - Do not include https://
    //  - This must be an exact match of your domain.
    //  - If you're using www. for your domain, make sure you include that here.
    Fathom.load(process.env.NEXT_PUBLIC_FATHOM_SITE_ID, {
      includedDomains: ['rosnovsky.us'],
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

  const previousPathname = usePrevious(router.pathname)
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <Header />
        <main>
          {/* @ts-expect-error ??? */}
          <ErrorBoundary FallbackComponent={Error}>
            <Component previousPathname={previousPathname} {...pageProps} />
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
      <Analytics />
    </>
  );
};

export default trpc.withTRPC(RosnovskyPark);
