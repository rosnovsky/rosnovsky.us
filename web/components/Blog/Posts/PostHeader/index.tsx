import { localDate } from '@lib/helpers';
import { PortableText } from '@portabletext/react';
import { BlogPost } from 'index';
import Link from 'next/link';

export const PostHeader = ({ post }: { post: BlogPost }) => {
  const { title, publishedAt, estimatedReadingTime, summary, categories } =
    post;
  return (
    <div className="md:max-w-2xl mx-auto mb-12 text-center">
      <div className="flex items-center justify-center">
        <p className="inline-block text-blue-600 font-medium">
          {localDate(publishedAt)}
        </p>
        <span className="mx-1 text-blue-500">•</span>
        <p className="inline-block text-blue-400 font-medium">
          {estimatedReadingTime} minute read
        </p>
      </div>
      <h2 className="mb-4 mt-3 text-3xl md:text-5xl leading-tight text-darkCoolGray-900 font-bold tracking-tighter">
        {title}
      </h2>
      <div className="mb-6 text-lg md:text-xl font-medium text-coolGray-500">
        <PortableText value={summary} />
      </div>
      {categories &&
        categories.map((category) => (
          <div
            key={category.title}
            className="inline-block py-1 px-3 mr-2 text-xs leading-5 text-blue-700 font-medium uppercase bg-blue-100 rounded-full shadow-sm"
          >
            <Link href={`/category/${category.slug.current}`}>
              {category.title}
            </Link>
          </div>
        ))}
    </div>
  );
};
