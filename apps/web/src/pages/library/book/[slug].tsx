import { Container } from '@/components/Container';
import { SimpleLayout } from '@/components/SimpleLayout';
import sanityClient from '@/lib/sanityClient';
import { Book } from 'index';
import Image from 'next/image';

export default function BookPage({ book }: { book: Book }) {
  return (<>
    <SimpleLayout title={book.title} intro={`This ${book.pages}-pages book by <a href='/library/author/${book.author.slug.current}'>${book.author.name}</a> was published in ${book.publishedDate} by <a href='/library/publisher/${book.publisher.slug.current}'>${book.publisher.name}</a>. It would take roughly ${book.estimatedReadingTime} hours to read.`} /> 
    <Container>
    <div>
      <Image src={book.cover.url} alt={book.title} width={200} height={300} />
      </div>
    </Container>
  </>
  );
}

export const getStaticPaths = async () => {
  const booksPaths = await sanityClient.fetch(`*[_type == "book"].slug.current`);
  const paths = booksPaths.filter(path => path !== null).map(book => {
    return `/library/book/${book}`;
  });
  return {
    paths,
    fallback: 'blocking',
  };
}

export const getStaticProps = async ({ params }) => {
  const { slug } = params || {};
  const book = await sanityClient.fetch(
    `*[_type == "book" && slug.current == $slug][0] {
      ...,
      "author": author->{name, slug},
      "publisher": publisher->{name, slug},
      "cover": cover.asset->,

      "genres": *[_type == "genre" && references(^._id)]{name},
      "estimatedReadingTime": round(pages / 60 )
    }`,
    { slug }
  );

  return {
    props: {
      book,
    },
    revalidate: 120,
  };
}

