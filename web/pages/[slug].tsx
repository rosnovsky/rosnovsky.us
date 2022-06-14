import dynamic from 'next/dynamic';
import sanityClient from '@lib/sanityClient';
import { PostContent, PostImage } from '@components/Blog/Posts';
const Containter = dynamic(() => import('@components/Container'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
import type { Page as PageType } from 'index';

type Props = {
  page: PageType;
};

const Page = ({ page }: Props) => {
  const { title, coverImage, body, bodyRaw, socialCardImage } = page;

  return (
    <Containter
      title={`${title} – Art Rosnovsky`}
      description={bodyRaw.slice(0, 200) + '...'}
      image={
        socialCardImage
          ? socialCardImage.asset.url
          : 'https://rosnovsky.us/static/images/banner.jpg'
      }
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
          <PostImage coverImage={coverImage} />
          <PostContent body={body} />
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
  const page: PageType = await sanityClient.fetch(
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
      socialCardImage {
        asset->
      }
    }
  `,
    { slug }
  );

  return {
    props: {
      page,
    },
  };
}

export default Page;
