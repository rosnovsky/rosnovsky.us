import Image from 'next/image';
import Link from 'next/link';

const Book = ({ book }) => {
  return (
    <div key={book.isbn} className={`mb-12 mx-2 cursor-pointer`}>
      <Link href="/library/book/[slug]" as={`/library/book/${book.isbn}`}>
        <div className="relative h-32 w-32">
          {(book.read || book.status) && (
            <span
              className={`absolute  z-10 ${
                book.read
                  ? 'bg-green-200 text-green-900'
                  : 'bg-red-200 text-red-900'
              } rounded-md px-1 top-28 right-16 origin-bottom inline-block text-center`}
              style={{ transform: 'translateX(50%) rotate(5deg)' }}
            >
              {book.status ? book.status : book.read ? 'finished' : null}
            </span>
          )}
          <Image
            src={book.cover.asset.url}
            alt={book.title}
            width={100}
            height={150}
            placeholder="blur"
            blurDataURL={book.cover.asset.metadata.lqip}
            layout="intrinsic"
            objectFit="cover"
            quality={80}
            className={`${
              book.read ||
              book.status === 'abandoned' ||
              book.status === 'reading'
                ? 'opacity-80'
                : 'opacity-20 hover:opacity-100 transition-opacity duration-400'
            } rounded-lg`}
          />
        </div>
      </Link>
    </div>
  );
};

export default Book;
