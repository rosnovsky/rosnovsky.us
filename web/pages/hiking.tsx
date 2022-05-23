import sanityClient from '@lib/sanityClient';
import type { Page as PageType } from 'index';
import dynamic from 'next/dynamic';
const Containter = dynamic(() => import('@components/Container'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
const Map = dynamic(() => import('@components/Hiking/Map'), {
  ssr: false,
});

type Props = {
  hikingPage: PageType[];
};

const Page = ({ hikingPage }: Props) => {
  const postsWithLocation = hikingPage.filter((post) => post.location !== null);

  return (
    <Containter
      title={`Hiking Map – Art Rosnovsky`}
      description={'All my hikes in one place'}
      image={`https://res.cloudinary.com/rosnovsky/image/upload/v1639272559/social-images/hiking-map.jpg`}
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
              Hiking Map
            </h2>
          </div>
          <div className="prose prose-xl md:max-w-3xl mx-auto">
            <div className="w-full h-auto">
              <Map posts={postsWithLocation} />
            </div>
            {/* <PortableText value={body} components={PortableTextComponents} /> */}
          </div>
        </div>
      </section>
      <NewsletterForm />
    </Containter>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"
  const hikingPage: PageType = await sanityClient.fetch(
    `
    *[_type == "post"] {
      title,
      slug,
      location,
      coverImage {
        asset->
      }
    }
  `
  );

  const baseUrl = 'https://rosnovsky-api.vercel.app';

  try {
    const generateSocialImage = await fetch(
      `${baseUrl}/api/opengraph/generate?title=${
        hikingPage.title
      }&&coverImage=${hikingPage.coverImage.asset.url || null}`
    );
    console.info(
      `♻️ Generating Social Image for ${hikingPage.title}. Here its status code: `,
      generateSocialImage.status
    );
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      hikingPage,
    },
  };
}

export default Page;
