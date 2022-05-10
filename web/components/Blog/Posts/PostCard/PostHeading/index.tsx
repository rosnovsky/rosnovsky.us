import { BlogPost } from 'index';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

type Props = {
  heading: BlogPost['title'];
  slug: BlogPost['slug']['current'];
};

const PostHeading = ({ heading, slug }: Props) => {
  return (
    <span className="inline-block mb-4 text-2xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-bold hover:underline">
      <Link href={`/blog/${slug}`}>{heading}</Link>
    </span>
  );
};

export default PostHeading;
