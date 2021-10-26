import '../styles/global.css';

import { ThemeProvider } from 'next-themes';
import { MDXProvider } from '@mdx-js/react';
import { useAnalytics } from '../lib/analytics';
import MDXComponents from '../components/Utils/MDXComponents';
import { UserProvider } from '@auth0/nextjs-auth0';
// import { SRLWrapper } from 'simple-react-lightbox'

export default function App({ Component, pageProps }) {
  useAnalytics();

  return (
    <UserProvider>
      <ThemeProvider attribute="class">
        {/* <SRLWrapper> */}
          <MDXProvider components={MDXComponents}>
            <Component {...pageProps} />
          </MDXProvider>
        {/* </SRLWrapper> */}
      </ThemeProvider>
    </UserProvider>
  );
}
