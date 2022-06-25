import { Tooltip } from '@mantine/core';
import { Book } from 'index';

const BooksMeta = ({ books }: { books: Book[] }) => {
  return (
    <div className="flex flex-wrap items-center justify-center mb-6">
      <p className="inline-block text-blue-600 font-medium">
        {books.length} books
      </p>
      <span className="mx-2 text-blue-500">•</span>
      <p className="inline-block text-blue-600 font-medium">
        {Math.ceil(
          books.reduce((acc, book) => acc + book.pages, 0)
        ).toLocaleString()}{' '}
        pages
      </p>
      <span className="mx-2 text-blue-500">•</span>
      <p className="inline-block text-blue-600 font-medium">
        <Tooltip
          wrapLines
          width={220}
          withArrow
          arrowSize={5}
          transition="fade"
          transitionDuration={200}
          label="Reading every day for 1 hour
        at ~1.2 pages per minute"
        >
          <span className="underline cursor decoration-dotted">
            {Math.ceil(
              books.reduce((acc, book) => acc + book.estimatedReadingTime, 0)
            ).toLocaleString()}{' '}
            days of reading
          </span>
        </Tooltip>
      </p>
      <span className="mx-2 text-blue-500">•</span>
      <p className="inline-block text-blue-600 font-medium">
        {Math.ceil(
          (books.reduce(
            (acc, book) =>
              acc + (book.read || book.status === 'abandoned' ? 1 : 0),
            0
          ) /
            books.length) *
            100
        )}
        % finished
      </p>

      {books.filter((book) => book.rating).length > 0 && (
        <>
          <span className="mx-2 text-blue-500">•</span>
          <p className="inline-block text-blue-600 font-medium">
            {Math.round(
              (books.reduce(
                (acc, book) => acc + (book.rating ? book.rating : 0),
                0
              ) /
                books.reduce((acc, book) => acc + (book.rating ? 1 : 0), 0)) *
                100
            ) / 100}{' '}
            stars average
          </p>
        </>
      )}
    </div>
  );
};

export default BooksMeta;
