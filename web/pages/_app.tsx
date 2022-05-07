import type { AppProps } from 'next/app';
import { UserProvider } from '@auth0/nextjs-auth0';
import { SWRConfig } from 'swr';
import fetcher from '@lib/fetcher';
import '../styles/global.css';

function RosnovskyPark({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <SWRConfig value={{ fetcher }}>
        <Component {...pageProps} />
      </SWRConfig>
    </UserProvider>
  );
}

export default RosnovskyPark;
