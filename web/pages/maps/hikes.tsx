import sanityClient from '@lib/sanityClient';
import type { Hike as HikeType } from 'index';
import dynamic from 'next/dynamic';
import slugify from 'slugify';
const Containter = dynamic(() => import('@components/Container'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
const Map = dynamic(() => import('@components/Map'), {
  ssr: false,
});

type Props = {
  hikes: HikeType[];
  status: 'up' | 'down';
};

const HikesMap = ({ hikes, status }: Props) => {
  return (
    <Containter
      title={`Hiking Map – Art Rosnovsky`}
      description={'All my hikes in one place'}
      image={`https://res.cloudinary.com/rosnovsky/image/upload/v1639272559/social-images/${slugify(
        'Hiking Map'
      )}.jpg`}
      type="article"
      status={status}
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
            <div className="text-2xl flex items-center justify-center">
              <p className="inline-block text-blue-700 font-medium">
                {hikes.length} total hikes{' '}
                <span className="mx-1 text-blue-900">•</span>
                {Math.ceil(hikes.reduce((a, b) => a + b.length, 0))} miles{' '}
                <span className="mx-1 text-blue-900">•</span>
                {Math.ceil(
                  hikes.reduce((a, b) => a + b.elevationGain, 0) / 1000
                ).toLocaleString()}
                K ft of elevation gain
              </p>
            </div>
          </div>
          <div className="prose prose-xl md:max-w-3xl mx-auto">
            <Map data={hikes} />
          </div>
        </div>
      </section>
      <NewsletterForm />
    </Containter>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"
  const hikes: HikeType[] = await sanityClient.fetch(
    `
    *[_type == "hike"] {
      title,
      location,
      coverImage {
        asset->
      }, 
      report->,
      trail,
      length,
      slug,
      elevationGain
    }
  `
  );

  const baseUrl = 'https://rosnovsky-api.vercel.app';

  try {
    const generateSocialImage = await fetch(
      `${baseUrl}/api/opengraph/generate?title=Hiking map&coverImage=${null}&meta=All%20my%20hikes%20in%20one%20place!`
    );
    console.info(
      `♻️ Generating Social Image for Hiking Map. Here its status code: `,
      generateSocialImage.status
    );
  } catch (e) {
    console.error(e);
  }
  const sysytemStatus = await fetch('https://rosnovsky.us/api/status').then(
    (res) => res.json()
  );
  return {
    props: {
      hikes,
      status: sysytemStatus,
    },
    revalidate: 120,
  };
}

export default HikesMap;
