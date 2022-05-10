import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            dns-prefetch
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=optional"
            rel="stylesheet"
          />
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
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

export default MyDocument;
