import sanityClient from '@lib/sanityClient';
import { localDate } from '@lib/helpers';
import type { Book as BookType } from 'index';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const Link = dynamic(() => import('next/link'), { ssr: true });
const Containter = dynamic(() => import('@components/Container'));

type Props = {
  book: BookType;
  status: 'up' | 'down';
};

const ReadBooks = ({ book, status = 'up' }: Props) => {
  const {
    title,
    summary,
    cover,
    estimatedReadingTime,
    socialCardImage,
    own,
    read,
    publisher,
    publishedDate,
    rating,
  } = book;

  return (
    <Containter
      title={`${title}`}
      description={summary}
      image={
        socialCardImage
          ? socialCardImage.asset.url
          : 'https://rosnovsky.us/static/images/banner.jpg'
      }
      status={status}
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
            <div className="flex items-center justify-center">
              <p className="inline-block text-blue-600 font-medium">
                {localDate(publishedDate)}
              </p>
              <span className="mx-1 text-blue-500">•</span>
              <p className="inline-block text-blue-400 font-medium">
                {estimatedReadingTime} hours read
              </p>
            </div>
            <h2 className="mb-4 mt-3 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              {title}
            </h2>
            <div className="inline-block py-1 px-3 mr-2 text-xs leading-5 text-blue-700 font-medium uppercase bg-blue-100 rounded-full shadow-sm">
              <Link href={`/publisher/${publisher.toLowerCase()}`}>
                {publisher}
              </Link>
              {own && <span className="mx-1 text-blue-500">Own</span>}
              {read && <span className="mx-1 text-blue-500">Read</span>}
              {rating && (
                <span className="mx-1 text-blue-500">{rating} rated</span>
              )}
            </div>
          </div>
          <div className="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
            <Image
              src={cover.asset.url}
              placeholder="blur"
              blurDataURL={cover.asset.metadata.lqip}
              width={cover.asset.metadata.dimensions.width}
              height={cover.asset.metadata.dimensions.height}
              objectFit="cover"
              priority
              alt=""
            />
          </div>
          <div className="prose prose-xl md:max-w-3xl mx-auto">{summary}</div>
        </div>
      </section>
    </Containter>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "book" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const book: BookType = await sanityClient.fetch(
    `
    *[_type == "book" && isbn == $slug][0] {
      ...,
      _id,
      cover {
        ...,
        asset->
      },
      title,
      author,
      publisher,
      publishedDate,
      summary,
      pages,
      socialCardImage {
        asset->},
      own,
      read,
      "estimatedReadingTime": round(pages * 2 / 60)
    }
  `,
    { slug }
  );

  const sysytemStatus = await fetch('https://rosnovsky.us/api/status').then(
    (res) => res.json()
  );

  return {
    props: {
      book,
      status: sysytemStatus,
    },
    revalidate: 1,
  };
}

export default ReadBooks;
