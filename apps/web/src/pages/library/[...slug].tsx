import { SimpleLayout } from '@/components/SimpleLayout';
import { pluralize } from '@/lib/helpers';
import sanityClient from '@/lib/sanityClient';
import { BooksPages } from 'index';
import { GetStaticProps } from 'next';
import Error from '@/pages/_error'
import { Container } from '@/components/Container';
import { Meta } from '@/components/Meta';
import { authorBooksQUery, genreBooksQuery, publisherBooksQuery } from '@/lib/queries';
import { BookCard } from '@/components/Cards/BookCard';

export default function LibraryPage({ books }: BooksPages.LibraryPageProps) {
  if (!books) return <Container className="mt-16 sm:mt-32"><Error statusCode="404" /></Container>

  const { name, slug, totalBooks, books: bookList } = books


  const booksRead = books.books.reduce((acc, book) => acc + ((book.status === "read" || book.status === "abandoned") ? 1 : 0), 0)

  return (
    <>
      <Meta
        title={`Library | ${name}`}
        description={`Here's all I've got from ${name}. I've read ${pluralize(booksRead, "book")}.`}
        type="article"
        slug={{ current: `library/${slug.current}` }} />

      <SimpleLayout
        title={`All ${pluralize(totalBooks, "book")} by ${name}`}
        intro={`Here's all I've got from ${name}. ${booksRead > 0 ? `I've read ${pluralize(booksRead, "book")}.` : "I haven't read any."}`}>

        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-100">{name}</h3>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 mt-10"
        >
          {bookList.map((book) => (
            <BookCard key={book.title} book={book} />
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
    const books = await sanityClient.fetch(authorBooksQUery, { slug: slug[1] })
    return {
      props: {
        books
      },
      revalidate: 120
    }
  } else if (slug[0] === 'publisher') {
    const books = await sanityClient.fetch(publisherBooksQuery, { slug: slug[1] })

    return {
      props: {
        books
      },
      revalidate: 120

    }
  } else if (slug[0] === 'genre') {
    const books = await sanityClient.fetch(genreBooksQuery, { slug: slug[1] })

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

