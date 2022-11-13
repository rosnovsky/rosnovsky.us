import Head from 'next/head';

const ogTypes = ['website', 'book', 'author', 'genre', 'article'] as const;
type OgType = typeof ogTypes[number];

type MetaProps = {
  title: string;
  description: string;
  slug: { current: string };
  summary?: string;
  type: OgType;
  date?: string;
  readTime?: string;
}

const ogUrl = (type: MetaProps['type'], slug: MetaProps['slug']) => {
  switch (type) {
    case 'website':
      return 'https://rosnovsky.us';
    case 'article':
      return `https://rosnovsky.us/blog/${slug.current}`;
    case 'book':
      return `https://rosnovsky.us/library/books/${slug.current}`;
    case 'author':
      return `https://rosnovsky.us/library/authors/${slug.current}`;
    case 'genre':
      return `https://rosnovsky.us/library/genres/${slug.current}`;
    default:
      return 'https://rosnovsky.us';
  }
}


export function Meta({ title, description, summary, date, readTime, type, slug }: MetaProps) {
  const url = ogUrl(type, slug);
  const ogImage = `https://rosnovsky.us/api/og?title=${title}&date=${date || "est. 2019"}&readTime=${readTime || "a few weeks"}&summary=${summary || "I'm a software engineer and writer."}`
  return (
    <Head>
      <title>
        {title}
      </title>
      <meta
        name="description"
        content={description || summary}
      />
      <meta
        property="og:image"
        content={``}
      />
      <meta property="og:url" content="https://rosnovsky.us" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={summary} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="rosnovsky.us" />
      <meta property="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || summary} />
      <meta name="twitter:image" content={ogImage} />
    </Head>)
}
