import { useEffect, useRef } from 'react'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'

import '@/styles/tailwind.css'
import 'focus-visible'
import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import type { AppType } from "next/app";
import { trpc } from "../utils/trpc";
import ErrorBoundary from '@/components/ErrorBoundary'
import Error from '@/pages/_error'

function usePrevious(value: any) {
  let ref = useRef<any>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

const RosnovskyPark: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
  router
}) => {
  let previousPathname = usePrevious(router.pathname)
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative">
        <SessionProvider session={session}>
          <Header />
          <main>
            {/* @ts-expect-error ??? */}
            <ErrorBoundary FallbackComponent={Error}>
              <Component previousPathname={previousPathname} {...pageProps} />
            </ErrorBoundary>
          </main>
        </SessionProvider>
        <Footer />
      </div>
    </>
    // </Suspense>
  );
};

export default trpc.withTRPC(RosnovskyPark);
