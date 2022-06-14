import sanityClient from '@lib/sanityClient';

import type { Book as BookType } from 'index';
import dynamic from 'next/dynamic';

import BooksMeta from '@components/Library/Books/Meta';
import Books from '@components/Library/Books';
import { authorBooksQuery, authorPagePathsQuery } from '@lib/queries';

const Containter = dynamic(() => import('@components/Container'));

type Props = {
  books: BookType[];
};

const Author = ({ books }: Props) => {
  return (
    <Containter
      title={`All books by ${books[0].author}`}
      description={`All books by ${books[0].author}`}
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
  const paths = await sanityClient.fetch(authorPagePathsQuery);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const books: BookType[] = await sanityClient.fetch(authorBooksQuery, {
    slug,
  });

  return {
    props: {
      books,
    },
    revalidate: 1,
  };
}

export default Author;
