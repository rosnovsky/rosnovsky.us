import {
  difficultyColor,
  lengthColor,
  localDate,
  PortableTextComponents,
} from '@lib/helpers';
import sanityClient from '@lib/sanityClient';
import { PortableText } from '@portabletext/react';
import type { Hike as HikeType } from 'index';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import slugify from 'slugify';
const Containter = dynamic(() => import('@components/Container'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
const Map = dynamic(() => import('@components/Map'), {
  ssr: false,
});

type Props = {
  hike: HikeType;
};

const Hike = ({ hike }: Props) => {
  const { title, report, difficulty, length, trail, hikeDate, summary } = hike;

  return (
    <Containter
      title={`Hiking Map – Art Rosnovsky`}
      description={'All my hikes in one place'}
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
            <div className="text-2xl flex items-center justify-center">
              <p className="inline-block text-blue-700 font-medium">
                {localDate(hikeDate)}
              </p>
              {length && (
                <>
                  <span className="mx-1 text-blue-500">•</span>
                  <p className={lengthColor(length)}>{length} mi</p>
                </>
              )}
              <span className="mx-1 text-blue-500">•</span>
              <p className={difficultyColor(difficulty)}>{difficulty}</p>
              {trail && (
                <>
                  <span className="mx-1 text-blue-500">•</span>
                  <p className="inline-block text-blue-700 underline font-medium">
                    <Link href={trail}>Trail Info</Link>
                  </p>
                </>
              )}
              {report && (
                <>
                  <span className="mx-1 text-blue-500">•</span>
                  <p className="inline-block underline text-blue-700 font-medium">
                    <Link href={`/blog/${report.slug.current}`}>Report</Link>
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="prose prose-xl md:max-w-3xl mx-auto">
            <Map data={hike} />
            <PortableText value={summary} components={PortableTextComponents} />
          </div>
        </div>
      </section>
      <NewsletterForm />
    </Containter>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "hike" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const hike: HikeType = await sanityClient.fetch(
    `
    *[_type == "hike" && slug.current == $slug][0] {
      title,
      location,
      coverImage {
        asset->
      }, 
      report->,
      summary,
      difficulty,
      length,
      hikeDate,
      trail,
      slug
    }
  `,
    { slug }
  );

  const baseUrl = 'https://rosnovsky-api.vercel.app';

  try {
    const generateSocialImage = await fetch(
      `${baseUrl}/api/opengraph/generate?title=${hike.title}&&coverImage=${
        hike.coverImage?.asset.url || null
      }`
    );
    console.info(
      `♻️ Generating Social Image for ${hike.title}. Here its status code: `,
      generateSocialImage.status
    );
  } catch (e) {
    console.error(e);
  }

  return {
    props: {
      hike,
    },
  };
}

export default Hike;
