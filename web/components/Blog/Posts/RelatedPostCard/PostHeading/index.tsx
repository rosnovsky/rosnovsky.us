import { BlogPost } from 'index';
import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

type Props = {
  heading: BlogPost['title'];
  slug: BlogPost['slug']['current'];
};

const PostHeading = ({ heading, slug }: Props) => {
  return (
    <h3 className="inline-block overflow mb-4 text-xl leading-tight text-coolGray-800 hover:text-coolGray-900 font-medium hover:underline">
      <Link href={`/blog/${slug}`}>{heading}</Link>
    </h3>
  );
};

export default PostHeading;