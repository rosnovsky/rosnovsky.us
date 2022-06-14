import Books from '@components/Library/Books';
import BooksMeta from '@components/Library/Books/Meta';
import sanityClient from '@lib/sanityClient';
import type { Book as BookType } from 'index';
import dynamic from 'next/dynamic';
const Containter = dynamic(() => import('@components/Container'));

type Props = {
  books: BookType[];
};

const Publisher = ({ books }: Props) => {
  const { publisher } = books[0];
  return (
    <Containter
      title={`${publisher}`}
      description={`All books by ${publisher}`}
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
            <BooksMeta books={books} />
            <Books books={books} />
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
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const books: BookType = await sanityClient.fetch(
    `
    *[_type == "book" && publisher == $slug] | order(publishedDate desc) {
        cover {
          asset->{
            url,
            metadata {
              dimensions {
                width,
                height
            }, 
            lqip
          }
        }
      },
      title,
      author,
      publisher,
      publishedDate,
      pages,
      socialCardImage {
        asset->},
      read,
      rating,
      isbn,
      "estimatedReadingTime": round(pages * 2 / 60)
    }
  `,
    { slug }
  );

  return {
    props: {
      books,
    },
    revalidate: 120,
  };
}

export default Publisher;
