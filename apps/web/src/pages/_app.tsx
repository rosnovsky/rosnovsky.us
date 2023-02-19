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

import { Atkinson_Hyperlegible as Hyperledgible } from "@next/font/google";

const hyperledgible = Hyperledgible({
  preload: true,
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "700"],
});

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

  const previousPathname = usePrevious(router.pathname)
  return (
    <div className={`${hyperledgible.className}`}>
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
    </div>
  );
};

export default trpc.withTRPC(RosnovskyPark);
