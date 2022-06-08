import sanityClient from '@lib/sanityClient';
import { localDate, ratingToText } from '@lib/helpers';
import type { Book as BookType } from 'index';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
const Link = dynamic(() => import('next/link'), { ssr: true });
const Containter = dynamic(() => import('@components/Container'));

type Props = {
  book: BookType;
  status: 'up' | 'down';
};

const Book = ({ book, status = 'up' }: Props) => {
  const {
    title,
    author,
    cover,
    estimatedReadingTime,
    socialCardImage,
    own,
    read,
    publisher,
    publishedDate,
    rating,
    review,
  } = book;

  return (
    <Containter
      title={`${title} by ${author} in Rosnovsky Park™ Library`}
      description={`${title} by ${author}`}
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
          <div className="flex flex-col md:flex-row items-center md:items-start md:max-w-xl mx-auto mb-12">
            <div className="mb-10 overflow-hidden rounded-xl mr-5">
              <Image
                src={cover.asset.url}
                layout="intrinsic"
                placeholder="blur"
                blurDataURL={cover.asset.metadata.lqip}
                width={cover.asset.metadata.dimensions.width}
                height={cover.asset.metadata.dimensions.height}
                objectFit="cover"
                priority
                alt=""
              />
            </div>
            <div className="prose">
              <div>
                <h2 className="prose-xl mb-1 mt-2 text-2xl md:text-3xl leading-tight font-bold tracking-tighter">
                  {title}
                </h2>
                <h4 className="mb-4 mt-1 text-md md:text-xl leading-loose text-darkCoolGray-900  tracking-loose">
                  by {author}
                </h4>
              </div>
              This book was published in{' '}
              <span className="inline-block text-blue-600 font-medium">
                {localDate(publishedDate, 'year')}
              </span>{' '}
              by{' '}
              <span className="inline-block font-medium">
                <Link
                  href={`/library/publisher/${encodeURIComponent(publisher)}`}
                >
                  <span className="cursor-pointer underline text-blue-600">
                    {publisher.split('/')[0]}
                  </span>
                </Link>
              </span>
              . It takes roughly{' '}
              <span className="inline-block text-blue-600 font-medium">
                {estimatedReadingTime} hours
              </span>{' '}
              to read it.{' '}
              {own && (
                <span>
                  I{' '}
                  <span className="inline-block text-blue-600 font-medium">
                    own
                  </span>{' '}
                  this book.{' '}
                </span>
              )}{' '}
              {!read && (
                <span className="font-bold">I haven&apos;t read it yet.</span>
              )}
              {read && (
                <span>
                  I finished it in{' '}
                  <span className="inline-block text-blue-600 font-medium">
                    {localDate(read, 'month')}
                  </span>{' '}
                  and{' '}
                  <span className="inline-block text-blue-600 font-medium">
                    {ratingToText(rating)}
                  </span>
                  .
                </span>
              )}
            </div>
          </div>
        </div>
        {review && (
          <div className="prose prose-xl md:max-w-3xl mx-auto">
            <h3>Review</h3>
            <PortableText value={review} />
          </div>
        )}
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
      review,
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
    revalidate: 120,
  };
}

export default Book;
