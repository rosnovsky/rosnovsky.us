import Link from 'next/link';

const PostHeading = ({ heading, slug }) => {
  return (
    <span className="inline-block mb-4 text-2xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline">
      <Link href={`/blog/${slug}`}>{heading}</Link>
    </span>
  );
};

export default PostHeading;
