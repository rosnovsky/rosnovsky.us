import Document, { Html, Head, Main, NextScript } from 'next/document';

class RosnovskyPages extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"
          />
          <link href="https://llama.rosnovsky.us/script.js" rel="preconnect" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon-192x192.png"></link>
          <meta name="theme-color" content="#fff" />
          <link
            key="rss-feed"
            rel="alternative"
            type="application/rss+xml"
            title="RSS feed for Rosnovsky.us"
            href="/feed/feed.xml"
          />
          <link
            key="atom-feed"
            rel="alternative"
            type="application/atom+xml"
            title="Atom feed for Rosnovsky.us"
            href="/feed/atom.xml"
          />
          <link
            key="json-feed"
            rel="alternative"
            type="application/feed+json"
            title="JSON feed for Rosnovsky.us"
            href="/feed/feed.json"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default RosnovskyPages;
