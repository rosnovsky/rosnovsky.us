import Book from '@components/Library/Book';

const Books = ({ books }) => {
  return (
    <div className="flex flex-wrap min-w-full justify-around">
      {books && books.map((book) => <Book book={book} key={book.isbn} />)}
    </div>
  );
};

export default Books;
