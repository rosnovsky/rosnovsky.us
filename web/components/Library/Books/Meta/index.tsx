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
          books.reduce((acc, book) => acc + book.estimatedReadingTime, 0) / 24
        )}{' '}
        days of reading
      </p>
      <span className="mx-2 text-blue-500">•</span>
      <p className="inline-block text-blue-600 font-medium">
        {Math.ceil(
          (books.reduce((acc, book) => acc + (book.read ? 1 : 0), 0) /
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
              books.reduce(
                (acc, book) => acc + (book.rating ? book.rating : 0),
                0
              ) / books.reduce((acc, book) => acc + (book.rating ? 1 : 0), 0)
            )}{' '}
            stars average
          </p>
        </>
      )}
    </div>
  );
};

export default BooksMeta;
