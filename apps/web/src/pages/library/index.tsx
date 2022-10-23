import Image from 'next/future/image'
import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { Book } from 'index'
import sanityClient from '@/lib/sanityClient'

const bookStatus = (status: Book["status"]) => {
  switch (status) {
    case 'read':
      return 'Finished'
    case 'reading':
      return 'Reading now'
    case 'to read':
      return 'Want to Read'
    case 'abandoned':
      return 'Started but Abandoned'
    default:
      return 'Not Read'
  }
}

export default function Library({ library }: { library: Book[] }) {
  return (
    <>
      <Head>
        <title>Library - Art Rosnovsky</title>
        <meta
          name="description"
          content="All my books."
        />
      </Head>
      <SimpleLayout
        title="Welcome to my library."
        intro="I love reading books. And I've read a lot of them. Here's a list of all the books I've read."
      >
        <ul
          role="list"
          className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3"
        >
          {library.map((book) => (
            <Card className="" as="li" key={book.title}>
              <div className="">
                <Image
                  src={book.cover.url}
                  alt=""
                  className="object-contain max-h-36 items-center justify-center rounded-md bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
                  width={100}
                  height={140}
                  placeholder="blur"
                  blurDataURL={book.cover.metadata.lqip}
                />
              </div>
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
    *[ _type == "book" ] | order(publishedDate desc)
    {..., "cover": cover.asset->, author->{name}, publisher->{name}}
    `)
  return {
    props: {
      library,
    },
  }
}

