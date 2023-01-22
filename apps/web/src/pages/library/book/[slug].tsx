import { Container } from '@/components/Container';
import { Meta } from '@/components/Meta';
import { SimpleLayout } from '@/components/SimpleLayout';
import { bookQuery } from '@/lib/queries';
import sanityClient from '@/lib/sanityClient';
import { Book } from 'index';
import Image from "next/legacy/image";

export default function BookPage({ book }: { book: Book }) {
  const { title, author, estimatedReadingTime, pages, publisher, slug, cover, publishedDate } = book
  return (<>
    <Meta
      title={`${title} by ${author.name} | Library`}
      description={`${title} by ${author.name}`}
      type="article"
      slug={{ current: `library/${slug.current}` }}
      readTime={`${estimatedReadingTime} hours`} date={publishedDate} />

    <SimpleLayout
      title={title}
      intro={`This ${pages}-pages book by <a href='/library/author/${author.slug.current}'>${author.name}</a> was published in ${publishedDate} by <a href='/library/publisher/${publisher.slug.current}'>${publisher.name}</a>. It would take roughly ${estimatedReadingTime} hours to read.`} />
    <Container>
      <div>
        <Image src={cover.url} alt={title} width={200} height={300} placeholder="blur" blurDataURL={cover.metadata.lqip} />
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
    bookQuery,
    { slug }
  );

  return {
    props: {
      book,
    },
    revalidate: 120,
  };
}

