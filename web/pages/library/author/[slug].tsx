import sanityClient from '@lib/sanityClient';

import type { Book as BookType } from 'index';
import dynamic from 'next/dynamic';

import BooksMeta from '@components/Library/Books/Meta';
import Books from '@components/Library/Books';

const Containter = dynamic(() => import('@components/Container'));

type Props = {
  books: BookType[];
  status: 'up' | 'down';
};

const Author = ({ books, status = 'up' }: Props) => {
  return (
    <Containter
      title={`All books by ${books[0].author}`}
      description={`All books by ${books[0].author}`}
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
              {books[0].author}
            </h2>
            <BooksMeta books={books} />
            <Books books={books} />
          </div>
        </div>
      </section>
    </Containter>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(`*[_type == "book"][].author`);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const books: BookType[] = await sanityClient.fetch(
    `
    *[_type == "book" && author == $slug] {
      cover {
        asset->
      },
      author,
      publishedDate,
      read,
      rating,
      isbn,
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
    revalidate: 1,
  };
}

export default Author;
