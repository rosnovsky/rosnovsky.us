import Link from 'next/link';

const PostHeading = () => {
  return (
    <span className="inline-block mb-4 text-2xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline">
      <Link href="/blog/1">
        A small business is only as good as its tools and it is totally true.
      </Link>
    </span>
  );
};

export default PostHeading;
