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

const Publisher = ({ books, status = 'up' }: Props) => {
  const { publisher } = books[0];
  return (
    <Containter
      title={`${publisher}`}
      description={`All books by ${publisher}`}
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
              {publisher}
            </h2>
            <div className="flex items-center justify-center mb-6">
              <p className="inline-block text-blue-600 font-medium">
                Total of {books.length} books
              </p>
              <span className="mx-2 text-blue-500">•</span>
              <p className="inline-block text-blue-600 font-medium">
                ~
                {Math.ceil(
                  books.reduce(
                    (acc, book) => acc + book.estimatedReadingTime,
                    0
                  ) / 24
                )}{' '}
                days of reading
              </p>
            </div>
            <div className="flex flex-wrap min-w-full justify-between">
              {books &&
                books.map((book) => (
                  <div key={book.isbn} className="cursor-pointer mb-4">
                    <Link
                      href="/library/book/[slug]"
                      as={`/library/book/${book.isbn}`}
                    >
                      <Image
                        src={book.cover.asset.url}
                        alt={book.title}
                        width={200}
                        height={300}
                        layout="intrinsic"
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

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "book" && defined(publisher)][].publisher`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const books: BookType = await sanityClient.fetch(
    `
    *[_type == "book" && publisher == $slug] | order(publishedDate desc) {
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
      books,
      status: sysytemStatus,
    },
    revalidate: 120,
  };
}

export default Publisher;
