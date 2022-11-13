import { SimpleLayout } from '@/components/SimpleLayout'
import { Book, BooksPages } from 'index'
import sanityClient from '@/lib/sanityClient'
import { fetcher, LibraryStats } from '@/lib/libraryHelpers'
import LibraryStatsComponent from '@/components/Stats/LibraryStats'
import { TopTen } from '@/components/Stats/TopTen'
import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { InView } from 'react-intersection-observer'
import { Meta } from '@/components/Meta'
import { libraryPaginatedQuery, libraryQuery, allLibraryQuery, allAuthorsQuery, allPublishersQuery, allGenresQuery } from '@/lib/queries'
import { BookCard } from '@/components/Cards/BookCard'

export default function Library({ library, allLibrary, allAuthors, allPublishers, allGenres }: BooksPages.LibraryProps) {
  const stats = new LibraryStats(allLibrary)
  const [pageNumber, setPageNumber] = useState(1);
  const [books, setBooks] = useState(library);

  const { data } = useSWR(
    { pageNumber, query: libraryPaginatedQuery },
    fetcher
  );

  useEffect(() => {
    if (data && data.length > 0) {
      const massagedData = data.filter((book: Book) => book.author !== null)
      setBooks([...books, ...massagedData]);
    }
  }, [pageNumber, data]);

  return (
    <>
      <Meta title="Library" description={`I've got ${stats.totalBooks} books in my library, check it out`} readTime={stats.totalPagesFormatted} slug={{ "current": '/library' }} type="website" />
      <SimpleLayout
        title="Welcome to my library."
        intro={`I love reading books. And I've read a lot of them. Check out my collection!`}>
        <LibraryStatsComponent stats={stats} />
        <TopTen allAuthors={allAuthors} allPublishers={allPublishers} allGenres={allGenres} />

        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-100">All Books</h3>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 mt-10"
        >
          {books.map((book) => (
            <BookCard book={book} key={book.title} />
          ))}
          <InView className="w-full mx-auto text-white" as="div" onChange={(inView) => {
            if (inView) {
              setPageNumber(pageNumber + 1)
            }
          }}>
          </InView>
        </ul>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const library = await sanityClient.fetch(libraryQuery, { page: 10 })
  const allLibrary = await sanityClient.fetch(allLibraryQuery)
  const allAuthors = await sanityClient.fetch(allAuthorsQuery)
  const allPublishers = await sanityClient.fetch(allPublishersQuery)

  const allGenres = await sanityClient.fetch(allGenresQuery)
  return {
    props: {
      library,
      allLibrary,
      allAuthors,
      allPublishers,
      allGenres
    },
    revalidate: 120
  }
}


