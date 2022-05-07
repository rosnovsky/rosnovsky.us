import dynamic from 'next/dynamic';
const Image = dynamic(() => import('next/image'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
import Footer from '@components/Footer';
import sanityClient from 'lib/sanityClient';
import type { Page } from 'index';
import { PortableText } from '@portabletext/react';
import { PortableTextComponents, urlFor } from '@lib/helpers';
import Containter from '@components/Container';

type Props = {
  page: Page;
};

const Privacy = ({ page }: Props) => {
  const { title, coverImage, body } = page;
  return (
    <Containter
      title={`${title} - Rosnovsky Park`}
      image={urlFor(coverImage).url()}
      description="I take your privacy very seriously. Here's what data about you this website collects."
    >
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
    *[_type == "page" && slug.current == "privacy"][0] {
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

export default Privacy;
