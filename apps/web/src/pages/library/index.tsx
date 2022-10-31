import Image from 'next/future/image'
import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Author, Book, Genre, Publisher } from 'index'
import sanityClient from '@/lib/sanityClient'
import { bookStatus, LibraryStats } from '@/lib/libraryHelpers'
import LibraryStatsComponent from '@/components/Stats/LibraryStats'
import { TopTen } from '@/components/Stats/TopTen'

const readIcon = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="okIconTitle" stroke="rgb(20 184 166)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" color="rgb(20 184 166)"> <title id="okIconTitle">Finished</title>  <polyline points="4 13 9 18 20 7" /></svg>

export default function Library({ library, allLibrary, allAuthors, allPublishers, allGenres }: { library: Book[], allLibrary: Book[], allAuthors: Author[], allPublishers: Publisher[], allGenres: Genre[] }) {
  const stats = new LibraryStats(allLibrary)
  return (
    <>
      <Head>
        <title>Library - Art Rosnovsky</title>
        <meta
          name="description"
          content={`I've got ${stats.totalBooks} books in my library, check it out`}
        />
        <meta
          property="og:image"
          content={`https://rosnovsky.us/api/og?title=Library&date=est. 2019&readTime=${stats.totalReadingTimeInYears} years`}
        />
        <meta property="og:url" content={`https://rosnovsky.us/library`} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content="Art Rosnovsky: Library" />
        <meta property="og:description" content={`I've got ${stats.totalBooks} books in my library, check it out`} />
        <meta property="og:image" content={`https://rosnovsky.us/api/og?title=Library&date=est. 2019&readTime=${stats.totalReadingTimeInYears} years`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="rosnovsky.us" />
        <meta property="twitter:url" content="https://rosnovsky.us/library" />
        <meta name="twitter:title" content="Art Rosnovsky: Uses" />
        <meta name="twitter:description" content={`I've got ${stats.totalBooks} books in my library, check it out`} />
        <meta name="twitter:image" content={`https://rosnovsky.us/api/og?title=Library&date=est. 2019&readTime=${stats.totalReadingTimeInYears} years`} />
      </Head>
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
          {library.map((book) => (

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
                  <Card.Description>by {book.author?.name} <br /><span className="text-xs">{book.publisher?.name}, {book.publishedDate}</span></Card.Description>
                </div>
              </div>
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
    `, { page: 11 })
  const allLibrary = await sanityClient.fetch(`*
  [_type == "book"]
  {
    status, 
    pages, 
    "estimatedReadingTime": pages / 1.5,
}`)
  const allAuthors = await sanityClient.fetch(`*[_type=="author"]{
  ...,
  "books": *[_type=='book' && references(^._id)]{ title },
  "totalBooks": count(*[_type=='book' && references(^._id)])
}`)
  const allPublishers = await sanityClient.fetch(`*[_type == "publisher"]{
    ...,
    "books": * [_type == 'book' && references(^._id)]{ title },
    "totalBooks": count(* [_type == 'book' && references(^._id)])
}`)

  const allGenres = await sanityClient.fetch(`*[_type == "genre"]{
    ...,
    "books": * [_type == 'book' && references(^._id)]{ title },
    "totalBooks": count(* [_type == 'book' && references(^._id)])
}`)
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


