import sanityClient from '@lib/sanityClient';
import { localDate } from '@lib/helpers';
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
            <div className="flex items-center justify-center">
              <p className="inline-block text-blue-600 font-medium">
                Total of {books.length} books
              </p>
              <span className="mx-1 text-blue-500">•</span>
              <p className="inline-block text-blue-400 font-medium">
                ~
                {Math.ceil(
                  books.reduce(
                    (acc, book) => acc + book.estimatedReadingTime,
                    0
                  ) / 24
                )}{' '}
                days to read them all
              </p>
            </div>
            <h2 className="mb-4 mt-3 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
              Library
            </h2>
            {books &&
              books.map((book) => (
                <div key={book.isbn} className="mb-4 cursor-pointer">
                  <a href={`/library/book/${book.isbn}`}>
                    <>
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

                      <div className="ml-4">
                        <h3 className="text-lg leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
                          {book.title}
                        </h3>
                        <p className="text-sm leading-tight text-darkCoolGray-600">
                          {localDate(book.publishedDate)}
                        </p>
                      </div>
                      <div className="inline-block py-1 px-3 mr-2 text-xs leading-5 text-blue-700 font-medium uppercase bg-blue-100 rounded-full shadow-sm">
                        <Link href={`/library/publisher/${book.publisher}`}>
                          {book.publisher}
                        </Link>
                      </div>
                      {book.own && (
                        <div className="inline-block py-1 px-3 mr-2 text-xs leading-5 text-green-700 font-medium uppercase bg-green-100 rounded-full shadow-sm">
                          <span className="mx-1 text-green-800">Own</span>
                        </div>
                      )}
                      {book.read && (
                        <div className="inline-block py-1 px-3 mr-2 text-xs leading-5 text-red-800 font-medium uppercase bg-red-100 rounded-full shadow-sm">
                          <span className="mx-1 text-red-800">✅ Read</span>
                        </div>
                      )}
                      {book.read && book.rating && (
                        <div className="inline-block py-1 px-3 mr-2 text-xs leading-5 text-yellow-700 font-medium uppercase bg-yellow-100 rounded-full shadow-sm">
                          <span className="mx-1 text-yellow-900">
                            {book.rating} stars
                          </span>
                        </div>
                      )}
                    </>
                  </a>
                </div>
              ))}
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
    *[_type == "book"] {
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
