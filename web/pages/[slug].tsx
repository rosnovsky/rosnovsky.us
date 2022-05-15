import { PortableText } from '@portabletext/react';
import sanityClient from '@lib/sanityClient';
import { PortableTextComponents } from '@lib/helpers';
import type { Page } from 'index';
import dynamic from 'next/dynamic';
const Error = dynamic(() => import('next/error'));
const Containter = dynamic(() => import('@components/Container'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
import Image from 'next/image';
import slugify from 'slugify';

type Props = {
  page: Page;
};

const Page = ({ page }: Props) => {
  if (!page)
    return (
      <div>
        <Error statusCode={404} />
      </div>
    );
  const { title, coverImage, body, bodyRaw } = page;

  return (
    <Containter
      title={`${title} – Art Rosnovsky`}
      description={bodyRaw.slice(0, 200) + '...'}
      image={`https://res.cloudinary.com/rosnovsky/image/upload/v1639272559/social-images/${slugify(
        title
      )}.jpg`}
      type="article"
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
            <h2 className="mb-4 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 prose font-bold tracking-tighter">
              {title}
            </h2>
          </div>
          <div className="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
            <Image
              src={coverImage.asset.url}
              placeholder="blur"
              blurDataURL={coverImage.asset.metadata.lqip}
              width={coverImage.asset.metadata.dimensions.width}
              height={coverImage.asset.metadata.dimensions.height}
              objectFit="cover"
              priority
              alt=""
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

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "page" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const page: Page = await sanityClient.fetch(
    `
    *[_type == "page" && slug.current == $slug][0] {
      ...,
      coverImage {
        ...,
        asset->
      },
      body[]{
        asset->{...},
        ...
      },
      "bodyRaw": pt::text(body),
    }
  `,
    { slug }
  );

  const baseUrl = 'https://rosnovsky-api.vercel.app';

  try {
    const generateSocialImage = await fetch(
      `${baseUrl}/api/opengraph/generate?title=${page.title}&&coverImage=${
        page.coverImage.asset.url || null
      }`
    );
    console.info(
      `♻️ Generating Social Image for ${page.title}. Here its status code: `,
      generateSocialImage.status
    );
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      page,
    },
  };
}

export default Page;
