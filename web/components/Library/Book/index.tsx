import Image from 'next/image';
import Link from 'next/link';

const Book = ({ book }) => {
  return (
    <div
      key={book.isbn}
      className={`mb-4 mx-2 cursor-pointer  ${
        book.read
          ? ''
          : 'opacity-50 hover:opacity-100 transition-opacity duration-200'
      }`}
    >
      <Link href="/library/book/[slug]" as={`/library/book/${book.isbn}`}>
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
          className="rounded-lg"
        />
      </Link>
    </div>
  );
};

export default Book;
