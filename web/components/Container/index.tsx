import Footer from '@components/Footer';
import { NavBar } from '@components/NavBar';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Containter = (props) => {
  const { children, ...customMeta } = props;
  const router = useRouter();
  const meta = {
    title: 'Art Rosnovsky – Web Developer & human.',
    description: `Hey, I'm Art, and we need to talk. `,
    image: 'https://rosnovsky.us/static/images/banner.jpg',
    ...customMeta,
  };

  return (
    <>
      <Head>
        <title>{meta.title}</title>
        <meta name="robots" content="follow, index" />
        <meta content={'meta.description'} name="description" />
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
        <meta
          property="og:site_name"
          content="Rosnovsky Park - Art Rosnovsky"
        />
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
      <div className="">
        <section className="relative bg-coolGray-50 overflow-hidden">
          <NavBar />
          <div className="bg-transparent">{children}</div>
          <Footer />
        </section>
      </div>
    </>
  );
};

export default Containter;
