import Head from 'next/head';
import { useRouter } from 'node_modules/next/router';
import Navigation from '@components/Navigation';

import Footer from './Footer';

export default function Container(props) {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Art Rosnovsky – Web Developer, podcaster, human.',
    description: `Software Engineer, web developer, podcaster, human. He/him.`,
    image: 'https://rosnovsky.us/static/images/banner.jpg',
    type: 'website',
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={meta.description} name="description" />
        <meta
          property="og:url"
          content={
            process.env.NODE_ENV !== 'test'
              ? `https://rosnovsky.us${router.asPath}`
              : 'https://rosnovsky.us/'
          }
        />
        <link
          rel="canonical"
          href={
            process.env.NODE_ENV !== 'test'
              ? `https://rosnovsky.us${router.asPath}`
              : 'https://rosnovsky.us/'
          }
        />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content="Art Rosnovsky" />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@rosnovsky" />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
      </Head>
      <div className="bg-white dark:bg-black">
        <Navigation />
        <main
          id="skip"
          className="mt-16 flex flex-col justify-center bg-white dark:bg-black px-8"
        >
          {children}
          <Footer />
        </main>
      </div>
    </>
  );
}
