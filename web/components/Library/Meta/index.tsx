import { Book } from 'index';
import Link from 'next/link';

const BooksMeta = ({ books }: { books: Book[] }) => {
  const authors = books.map((book) => book.author);
  const uniqueAuthors = books
    .map((book) => book.author)
    .filter((author, index) => authors.indexOf(author) === index);

  const sortedAuthorsByBookCount = uniqueAuthors.sort(
    (a, b) =>
      authors.filter((author) => author === b).length -
      authors.filter((author) => author === a).length
  );

  const popularAuthor = (position: number) => {
    return sortedAuthorsByBookCount[position];
  };

  const popularAuthorBooksCount = (position: number) => {
    return authors.filter((author) => author === popularAuthor(position))
      .length;
  };

  const uniquePublishers = books
    .map((book) => book.publisher)
    .filter(
      (publisher, index) =>
        books.map((book) => book.publisher).indexOf(publisher) === index
    );

  const sortedPublishersByBookCount = uniquePublishers.sort(
    (a, b) =>
      books.filter((book) => book.publisher === b).length -
      books.filter((book) => book.publisher === a).length
  );

  const popularPublisher = (position: number) => {
    return sortedPublishersByBookCount[position];
  };

  const popularPublisherBooksCount = (position: number) => {
    return books.filter((book) => book.publisher === popularPublisher(position))
      .length;
  };

  return (
    <>
      <div className="mb-6 prose prose-xl text-coolGray-900 text-left">
        This is my bookshelf. Currently, it contains{' '}
        <span className="text-blue-600 font-medium">{books.length} books</span>{' '}
        by{' '}
        <span className="text-blue-600 font-medium">
          {uniqueAuthors.length} authors
        </span>
        . I&apos;ve read{' '}
        <span className="text-blue-600 font-medium">
          {books.filter((book) => book.read).length}
        </span>{' '}
        of these books which is roughly{' '}
        <span className="text-blue-600 font-medium">
          {Math.ceil(
            (books.filter((book) => book.read).length / books.length) * 100
          )}
          %
        </span>
        . If you were to read for an hour every day, you would have read these
        books in{' '}
        <span className="text-blue-600 font-medium">
          ~
          {Math.ceil(
            books.reduce((acc, book) => acc + book.estimatedReadingTime, 0) /
            365
          ).toLocaleString('en-US')}{' '}
          years
        </span>
        : it&apos;s roughly{' '}
        <span className="text-blue-600 font-medium">
          {Math.ceil(
            books.reduce((acc, book) => acc + book.pages, 0) / 1000
          ).toLocaleString()}{' '}
          thousand pages
        </span>{' '}
        after all.
      </div>
      <div className="mb-6 prose prose-xl text-coolGray-900 text-left">
        I&apos;ve got the most books by{' '}
        <Link href={`/library/author/${popularAuthor(0)}`}>
          {popularAuthor(0)}
        </Link>{' '}
        ({popularAuthorBooksCount(0)} books), followed by{' '}
        <Link href={`/library/author/${popularAuthor(1)}`}>
          {popularAuthor(1)}
        </Link>{' '}
        with {popularAuthorBooksCount(1)} books and{' '}
        <Link href={`/library/author/${popularAuthor(2)}`}>
          {popularAuthor(2)}
        </Link>{' '}
        with {popularAuthorBooksCount(2)} books.
      </div>

      <div className="mb-6 prose prose-xl text-coolGray-900 text-left">
        Most books I have were published by{' '}
        <Link href={`/library/publisher/${popularPublisher(0)}`}>
          {popularPublisher(0)}
        </Link>{' '}
        ({popularPublisherBooksCount(0)} books). They are really good!
      </div>

      <div className="mb-10 prose prose-xl text-coolGray-900 text-left">
        {/* TODO: Make sure it doesn't break when I'm not reading any books. */}
        Right now I&apos;m reading{' '}
        {books
          .filter((book) => book.status === 'reading')
          .map((book) => (
            <span key={book.isbn}>
              <Link href={`/library/book/${book.isbn}`}>{book.title}</Link> by{' '}
              {book.author}{' '}
            </span>
          ))}
        .
      </div>
    </>
  );
};

export default BooksMeta;
