import Head from 'next/head'

const Meta = ({
  title,
  coverImage,
  coverAlt,
  canonicalUrl,
  description,
  pageType,
}: {
  title: string
  siteSettings?: Record<any, any>
  coverImage: string
  coverAlt: string
  canonicalUrl: string
  description: string
  pageType: string
}) => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/favicon/safari-pinned-tab.svg"
        color="#000000"
      />
      <link rel="shortcut icon" href="/favicon.ico" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      <meta name="theme-color" content="#000" />
      <meta
        name="description"
        content={`Rosnovsky Park. From Pacific Northwest to the World.`}
      />
      <meta name="author" content="Art Rosnovsky" />
      <meta
        name="keywords"
        content="Web development, typescript, javascript, react, hiking, next.js, sanity.io"
      />

      {/* OPEN GRAPH */}
      <meta property="og:type" content="article" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:image:height" content="420" />
      <meta property="og:image:width" content="780" />
      <meta property="og:site_name" content="Rosnovsky Park" />
      <meta property="og:title" content={title || 'Rosnovsky Park'} />
      <meta
        property="og:description"
        content={
          description || 'Rosnovsky Park. From Pacific Northwest to the World.'
        }
      />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={coverImage} />
      <meta property="og:image:alt" content={coverAlt} />

      {/* TWITTER */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="https://rosnovsky.us" />
      <meta name="twitter:creator" content="@rosnovsky" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:image" content={coverImage} />
      <meta name="twitter:image:alt" content={title} />
    </Head>
  )
}

export default Meta
