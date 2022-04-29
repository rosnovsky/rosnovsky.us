import Categories from '@components/Blog/Categories';
import { BlogPost } from 'index';
import Link from 'next/link';

type Props = {
  metadata: {
    categories: BlogPost['categories'];
    publishedAt: BlogPost['publishedAt'];
  };
};

const PostMetadata = ({ metadata }: Props) => {
  const { categories, publishedAt } = metadata;

  return (
    <>
      <div className="mb-4">
        {categories.map((category) => {
          return (
            <span
              className={`inline-block py-1 px-3 mr-2 text-xs leading-5 text-blue-500 hover:text-blue-600 font-medium uppercase bg-blue-100 hover:bg-blue-200 rounded-full shadow-sm`}
            >
              <Link href={`/category/${category.slug.current}`}>
                {category.title}
              </Link>
            </span>
          );
        })}
      </div>
      <p className="mb-2 text-coolGray-400 font-medium">
        {new Date(publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        })}{' '}
        • 3 min read
      </p>
    </>
  );
};

export default PostMetadata;
