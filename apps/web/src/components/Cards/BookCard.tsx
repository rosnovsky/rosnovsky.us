import { Card } from '../Card';
import Image from "next/legacy/image";
import { readIcon } from '../Icons/Icons';
import { bookStatus } from '@/lib/libraryHelpers';

export function BookCard({ book }) {
  const { title, cover, slug, author, publisher, publishedDate } = book;
  return (
    <Card className="flex flex-row space-y-4" key={title}>
      <div className="h-full flex flex-row space-x-4  content-between justify-between">
        {cover && <Image
          src={cover.url}
          alt={`${title} cover`}
          className="z-10 object-cover max-h-36 items-center justify-center rounded-md shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
          width={100}
          height={140}
          placeholder="blur"
          blurDataURL={cover?.metadata.lqip}
        />}
        <div>
          <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
            <Card.Link href={`/library/book/${slug?.current}`}> {title}{bookStatus(book.status) === 'Finished' ? readIcon : ''}</Card.Link>
          </h2>
          <Card.Description>by {author?.name} <br /><span className="text-xs">{publisher?.name}, {publishedDate}</span></Card.Description>
        </div>
      </div>
    </Card>
  )
}
