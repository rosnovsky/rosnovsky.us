import { Card } from '@/components/Card';
import { SimpleLayout } from '@/components/SimpleLayout';
import { pluralize } from '@/lib/helpers';
import { bookStatus, LibraryStats } from '@/lib/libraryHelpers';
import sanityClient from '@/lib/sanityClient';
import { Book } from 'index';
import { GetStaticProps } from 'next';
import Image from 'next/future/image'
import Error from '@/pages/_error'
import { Container } from '@/components/Container';
import Head from 'next/head';

const readIcon = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="okIconTitle" stroke="rgb(20 184 166)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" color="rgb(20 184 166)"> <title id="okIconTitle">Finished</title>  <polyline points="4 13 9 18 20 7" /> </svg>

export default function LibraryPage({ books }: { books: { slug: { current: string }, name: string, totalBooks: number, books: Book[] } }) {
  if (!books) return <Container className="mt-16 sm:mt-32"><Error statusCode="404" /></Container>
  const booksRead = books.books.reduce((acc, book) => acc + ((book.status === "read" || book.status === "abandoned") ? 1 : 0), 0)
  return (
    <><Head>
      <title>Library - Art Rosnovsky</title>
      <meta
        name="description"
        content={`Here's all I've got from ${books.name}. I've read ${pluralize(booksRead, "book")}.`}
      />
      <meta
        property="og:image"
        content={`https://rosnovsky.us/api/og?title=${books.name}&date=${pluralize(books.totalBooks, "book")}&readTime=${new LibraryStats(books.books).totalPages} pages`}
      />
      <meta property="og:url" content={`https://rosnovsky.us/library/${books.slug.current}`} />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="Art Rosnovsky: Library" />
      <meta property="og:description" content={`Here's all I've got from ${books.name}. I've read ${pluralize(booksRead, "book")}.`} />
      <meta property="og:image" content={`https://rosnovsky.us/api/og?title=${books.name}&date=${pluralize(books.totalBooks, "book")}&readTime=${new LibraryStats(books.books).totalPages} pages`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:domain" content="rosnovsky.us" />
      <meta property="twitter:url" content="https://rosnovsky.us/library" />
      <meta name="twitter:title" content="Art Rosnovsky: Uses" />
      <meta name="twitter:description" content={`Here's all I've got from ${books.name}. I've read ${pluralize(booksRead, "book")}.`} />
      <meta name="twitter:image" content={`https://rosnovsky.us/api/og?title=${books.name}&date=${pluralize(books.totalBooks, "book")}&readTime=${new LibraryStats(books.books).totalPages} pages`} />
    </Head>
      <SimpleLayout
        title={`All ${books.totalBooks} books by ${books.name}`}
        intro={`Here's all I've got from ${books.name}. I've read ${pluralize(booksRead, "book")}.`}>

        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-100">{books.name}</h3>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 mt-10"
        >
          {books.books.map((book) => (
            <Card className="flex flex-row space-y-4" key={book.title}>
              <div className="h-full flex flex-row space-x-4  content-between justify-between">
                <Image
                  src={book.cover.url}
                  alt={`${book.title} cover`}
                  className="z-10 object-cover max-h-36 items-center justify-center rounded-md shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
                  width={100}
                  height={140}
                  placeholder="blur"
                  blurDataURL={book.cover.metadata.lqip}
                />
                <div>
                  <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                    <Card.Link href={`/library/book/${book.slug.current}`}> {book.title}{bookStatus(book.status) === 'Finished' ? readIcon : ''}</Card.Link>
                  </h2>
                  <Card.Description>by {book.author.name} <br /><span className="text-xs">{book.publisher.name}, {book.publishedDate}</span></Card.Description>
                </div>
              </div>
            </Card>
          ))}
        </ul>

      </SimpleLayout>
    </>
  )
}


export const getStaticPaths = async () => {
  const booksPaths = await sanityClient.fetch(`*[_type == "book"].slug.current`);
  const paths = booksPaths.map(book => {
    return `/library/${book}`
  }
  )
  return {
    paths,
    fallback: "blocking"
  };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // @ts-expect-error - this is a string
  const { slug } = params;
  if (slug[0] === 'author') {
    const books = await sanityClient.fetch(`* [_type == "author" && slug.current == $slug][0]{
        ...,
        slug, "books": *[_type=='book' && references(^._id)] | order(publishedDate desc) { ..., "cover": cover.asset->, publisher->{name} },
        "totalBooks": count(*[_type=='book' && references(^._id)])
      }`, { slug: slug[1] })
    return {
      props: {
        books
      },
      revalidate: 120
    }
  } else if (slug[0] === 'publisher') {
    const books = await sanityClient.fetch(`*[_type == "publisher" && slug.current == $slug][0]{
      ...,
      slug,
      "books": * [_type == 'book' && references(^._id)] | order(publishedDate desc) { ..., "cover": cover.asset->, author->{name}, publisher->{name} },
      "totalBooks": count(* [_type == 'book' && references(^._id)])
    }`, { slug: slug[1] })

    return {
      props: {
        books
      },
      revalidate: 120

    }
  } else if (slug[0] === 'genre') {
    const books = await sanityClient.fetch(`*[_type == "genre" && slug.current == $slug][0] {
      ...,
      slug,
      "books": * [_type == 'book' && references(^._id)] | order(publishedDate desc) { ..., "cover": cover.asset->, author->{name}, publisher->{name} },
      "totalBooks": count(* [_type == 'book' && references(^._id)])
  }`, { slug: slug[1] })

    return {
      props: {
        books
      },
      revalidate: 120
    }
  }
  return {
    props: {
      books: null
    },
    revalidate: 120
  }
}

