import '../styles/global.css';

import { ThemeProvider } from 'next-themes';
import { useAnalytics } from '@lib/analytics';
import { UserProvider } from '@auth0/nextjs-auth0';

export default function App({ Component, pageProps }) {
  useAnalytics();

  return (
    <UserProvider>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </UserProvider>
  );
}
