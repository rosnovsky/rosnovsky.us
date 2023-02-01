import Image from "next/image";
import { Card } from '../Card';

const bookIcon = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="bookOpenedIconTitle" stroke="rgb(20 184 166)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none" color="rgb(20 184 166)"> <title id="bookOpenedIconTitle">Book</title> <path d="M12 6s-2-2-4-2-5 2-5 2v14s3-2 5-2 4 2 4 2c1.333-1.333 2.667-2 4-2 1.333 0 3 .667 5 2V6c-2-1.333-3.667-2-5-2-1.333 0-2.667.667-4 2z" /> <path strokeLinecap="round" d="M12 6v14" /> </svg>

export const CurrentBook = ({ currentBook }) => {
  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {bookIcon}
        <span className="ml-3">Reading Now</span>
      </h2>
      <div className="mx-auto pt-6">
        <Card className="flex flex-row space-y-4" key={currentBook.title}>
          <div className="h-full flex flex-row space-x-4  content-between justify-between">
            <Image
              src={currentBook.cover.url}
              alt={`${currentBook.title} cover`}
              className="z-10 object-cover h-36 w-24 items-center justify-center rounded-md shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0"
              width={100}
              height={140}
              priority
              unoptimized
            />
            <div>
              <h2 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                <Card.Link href={`/library/book/${currentBook.slug.current}`}>{currentBook.title}</Card.Link>
              </h2>
              <Card.Description>by {currentBook.author?.name} <br /><span className="text-xs">{currentBook.publisher?.name}, {currentBook.publishedDate}</span></Card.Description>
            </div>

          </div>
        </Card>
      </div>
    </div>
  );
}
