import { NavBar } from '@components/NavBar';
import Image from 'next/image';
import NewsletterForm from '@components/NewsletterForm';
import Footer from '@components/Footer';
import sanityClient from 'lib/sanityClient';
import type { Page } from 'index';
import { PortableText } from '@portabletext/react';
import { PortableTextComponents, urlFor } from '@lib/helpers';
import Containter from '@components/Container';
import Head from 'next/head';

type Props = {
  page: Page;
};

const Land = ({ page }: Props) => {
  const { title, coverImage, body } = page;
  return (
    <Containter>
      <Head>
        <title>{title} - Rosnovsky Park&trade; Blog</title>
        <meta name="description" content={title} />
        <meta
          name="keywords"
          content="Art Rosnovsky, Rosnovsky Park, Rosnovsky Park&trade;, Rosnovsky Park's Blog"
        />
        <meta name="author" content="Art Rosnovsky" />
        <meta name="robots" content="index, follow" />
        <meta name="referrer" content="origin" />
        <meta
          name="og:title"
          property="og:title"
          content="Rosnovsky Park&trade; - Art Rosnovsky's Blog"
        />
        <meta
          name="og:description"
          property="og:description"
          content="Art Rosnovsky's Blog"
        />
        <meta
          name="og:image"
          property="og:image"
          content="https://rosnovsky.us/static/logo.png"
        />
        <meta
          name="og:url"
          property="og:url"
          content="https://rosnovsky.us/blog"
        />
        <meta name="og:type" property="og:type" content="website" />
        <meta
          name="twitter:card"
          property="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:site"
          property="twitter:site"
          content="@rosnovsky"
        />
        <meta
          name="twitter:creator"
          property="twitter:creator"
          content="@rosnovsky"
        />
        <meta
          name="twitter:title"
          property="twitter:title"
          content="Rosnovsky Park&trade; - Art Rosnovsky's Blog"
        />
        <meta
          name="twitter:description"
          property="twitter:description"
          content="Art Rosnovsky's Blog"
        />
        <meta
          name="twitter:image"
          property="twitter:image"
          content="https://rosnovsky.us/static/logo.png"
        />
        <meta
          name="twitter:url"
          property="twitter:url"
          content="https://rosnovsky.us/blog"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://rosnovsky.us/static/logo.png"
        />
      </Head>
      <section
        className="py-16 md:py-24 bg-white"
        style={{
          backgroundImage: `url('/flex-ui-assets/elements/pattern-white.svg')`,
          backgroundPosition: 'center top',
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="md:max-w-2xl mx-auto mb-12 text-center">
            <h2 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              {title}
            </h2>
          </div>
          <div className="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
            <Image
              src={urlFor(coverImage).url()}
              placeholder="blur"
              blurDataURL={coverImage.asset.metadata.lqip}
              width={coverImage.asset.metadata.dimensions.width}
              height={coverImage.asset.metadata.dimensions.height}
              objectFit="cover"
            />
          </div>

          <div className="prose prose-xl md:max-w-3xl mx-auto">
            <PortableText value={body} components={PortableTextComponents} />
          </div>
        </div>
      </section>
      <NewsletterForm />
    </Containter>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"
  const page: Page[] = await sanityClient.fetch(
    `
    *[_type == "page" && slug.current == "land"][0] {
      body,
      title,
      coverImage {
        ...,
        asset->
      },
      slug
    }
  `
  );

  return {
    props: {
      page,
    },
  };
}

export default Land;
