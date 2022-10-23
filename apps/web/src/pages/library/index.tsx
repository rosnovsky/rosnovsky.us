import Image from 'next/future/image'
import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Book } from 'index'
import sanityClient from '@/lib/sanityClient'
import { bookStatus, LibraryStats } from '@/lib/libraryHelpers'
import LibraryStatsComponent from '@/components/Stats/LibraryStats'
import bookIcon from '@/images/icons/notebook.svg'
import openBookIcon from '@/images/icons/book-opened.svg'
import calendarIcon from '@/images/icons/calendar-event.svg'

export default function Library({ library, allLibrary }: { library: Book[], allLibrary: Book[] }) {
  const stats = new LibraryStats(allLibrary)
  const statsCard: Record<string, any>[] = [{ id: 1, name: 'Total Books', stat: stats.totalBooks, icon: bookIcon, secondStat: stats.totalRead, }, { id: 2, name: 'Total pages', stat: stats.totalPagesFormatted, icon: openBookIcon, secondStat: stats.totalPagesReadFormatted, }, { id: 3, name: 'Total Reading time', stat: stats.totalReadingTimeInYears, icon: calendarIcon, secondStat: stats.totalReadTimeInYears }]
  return (
    <>
      <Head>
        <title>Library - Art Rosnovsky</title>
        <meta
          name="description"
          content="All my books."
          className="text-teal-500"
        />
      </Head>
      <SimpleLayout
        title="Welcome to my library."
        intro={`I love reading books. And I've read a lot of them. Here's a list of all the books I've read.`}>
        <LibraryStatsComponent statsCard={statsCard} />
        <div className='grid grid-cols-2 mb-20'>
          <div><h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-100">Top 10 authors</h3>
            <ol className=' list-decimal '>
              {stats.topTenAuthors.filter(author => author.name !== "undefined").map((author) => (
                <li key={author.name}>
                  {author.name}: {author.books} books
                </li>
              ))}
            </ol>
          </div>

          <div><h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-100">Top 10 publishers</h3>
            <ol className='  list-decimal '>
              {stats.topTenPublishers.filter(publisher => publisher.name !== "undefined").map((publisher) => (
                <li key={publisher.name}>
                  {publisher.name}: {publisher.books} books
                </li>
              ))}
            </ol>
          </div>
        </div>

        <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-100">All Books</h3>
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 mt-10"
        >
          {library.map((book) => (
            <Card className="" as="li" key={book.title}>
              <Image
                src={book.cover.url}
                alt=""
                className="z-10 object-contain max-h-36 items-center justify-center rounded-md bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
                width={100}
                height={140}
                placeholder="blur"
                blurDataURL={book.cover.metadata.lqip}
              />
              <h2 className="mt-6 text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={`/library/${book.isbn}`}>{book.title}</Card.Link>
              </h2>
              <Card.Description>by {book.author?.name} ({book.publisher?.name}, {book.publishedDate})</Card.Description>
              <p className="relative z-10 mt-6 flex text-sm font-medium text-zinc-400 transition group-hover:text-teal-500 dark:text-zinc-200">
                {/* <LinkIcon className="h-6 w-6 flex-none" /> */}
                <span className="ml-2">{bookStatus(book.status)}</span>
              </p>
            </Card>
          ))}
        </ul>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const library = await sanityClient.fetch(`
    *[ _type == "book" ] | order(publishedDate desc)[0..$page] 
    {..., "cover": cover.asset->, author->{name}, publisher->{name}, "estimatedReadingTime": pages / 1.5}
    `, { page: 10 })
  const allLibrary = await sanityClient.fetch(`*[_type == "book"]{status, pages, author->{name}, publisher->{name}, "estimatedReadingTime": pages / 1.5}`)
  return {
    props: {
      library,
      allLibrary
    },
  }
}


