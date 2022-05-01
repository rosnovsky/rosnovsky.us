import Document, { Html, Head, Main, NextScript } from 'next/document';
import { CssBaseline } from '@nextui-org/react';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {CssBaseline.flush()}
          <meta name="google" content="nositelinkssearchbox" key="sitelinks" />
          <meta name="google" content="notranslate" key="notranslate" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
