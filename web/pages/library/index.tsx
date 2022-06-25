import Books from '@components/Library/Books';
import LibraryMeta from '@components/Library/Meta';
import NotFound from '@pages/404';
import { booksQuery } from '@lib/queries';
import sanityClient from '@lib/sanityClient';

import type { Book as BookType } from 'index';
import dynamic from 'next/dynamic';

const Containter = dynamic(() => import('@components/Container'));

type Props = {
  books: BookType[];
};

const Library = ({ books }: Props) => {
  if (books.length === 0) {
    return <NotFound />;
  }
  return (
    <Containter
      title={`All ${books.length} books`}
      description={`All books my books`}
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
            <LibraryMeta books={books} />
            <Books books={books} />
          </div>
        </div>
      </section>
    </Containter>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"
  const books: BookType = await sanityClient.fetch(booksQuery);

  return {
    props: {
      books,
    },
    revalidate: 1,
  };
}

export default Library;
