import sanityClient from '@/lib/sanityClient';
import { Book } from 'index';

export default function BookPage({ book }: { book: Book }) {
  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author.name}</p>
    </div>
  );
}

export const getStaticPaths = async () => {
  const booksPaths = await sanityClient.fetch(`*[_type == "book"].slug.current`);
  const paths = booksPaths.filter(path => path !== null).map(book => {
    return `/library/book/${book}`;
  });
  console.log(paths)
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
      "author": author->{name},
      "publisher": publisher->{name},
      "cover": cover.asset->,
      "genres": *[_type == "genre" && references(^._id)]{name}
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

