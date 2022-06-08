import sanityClient from '@lib/sanityClient';

import type { Book as BookType } from 'index';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const Link = dynamic(() => import('next/link'), { ssr: true });
const Containter = dynamic(() => import('@components/Container'));

type Props = {
  books: BookType[];
  status: 'up' | 'down';
};

const Library = ({ books, status = 'up' }: Props) => {
  return (
    <Containter
      title={`All ${books.length} books`}
      description={`All books my books`}
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
            <h2 className="mb-4 mt-3 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              Library
            </h2>
            <div className="flex flex-wrap items-center justify-center mb-6">
              <p className="inline-block text-blue-600 font-medium">
                {books.length} books
              </p>
              <span className="mx-2 text-blue-500">•</span>
              <p className="inline-block text-blue-600 font-medium">
                {Math.ceil(
                  books.reduce(
                    (acc, book) => acc + book.estimatedReadingTime,
                    0
                  ) / 24
                )}{' '}
                days of reading
              </p>
              <span className="mx-2 text-blue-500">•</span>
              <p className="inline-block text-blue-600 font-medium">
                {Math.ceil(
                  (books.reduce((acc, book) => acc + (book.read ? 1 : 0), 0) /
                    books.length) *
                    100
                )}
                % finished
              </p>
              <span className="mx-2 text-blue-500">•</span>
              <p className="inline-block text-blue-600 font-medium">
                {Math.round(
                  books.reduce(
                    (acc, book) => acc + (book.rating ? book.rating : 0),
                    0
                  ) /
                    books.reduce((acc, book) => acc + (book.rating ? 1 : 0), 0)
                )}{' '}
                stars average
              </p>
            </div>
            <div className="flex flex-wrap min-w-full justify-between">
              {books &&
                books.map((book) => (
                  <div
                    key={book.isbn}
                    className={`mb-4 mx-2 cursor-pointer  ${
                      book.read
                        ? ''
                        : 'opacity-50 hover:opacity-100 transition-opacity duration-200'
                    }`}
                  >
                    <Link
                      href="/library/book/[slug]"
                      as={`/library/book/${book.isbn}`}
                    >
                      <Image
                        src={book.cover.asset.url}
                        alt={book.title}
                        width={100}
                        height={150}
                        layout="intrinsic"
                        objectFit="cover"
                        quality={80}
                        loading="lazy"
                        className="rounded-lg"
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </Containter>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"
  const books: BookType = await sanityClient.fetch(
    `
    *[_type == "book"] | order(publishedDate desc) {
      cover {
        ...,
        asset->
      },
      isbn,
      title,
      author,
      publisher,
      publishedDate,
      pages,
      socialCardImage {
        asset->},
      own,
      read,
      rating,
      "estimatedReadingTime": round(pages * 2 / 60)
    }
  `
  );

  const sysytemStatus = await fetch('https://rosnovsky.us/api/status').then(
    (res) => res.json()
  );

  return {
    props: {
      books,
      status: sysytemStatus,
    },
    revalidate: 1,
  };
}

export default Library;
