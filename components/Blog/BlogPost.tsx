import * as Fathom from 'fathom-client';
import Image from 'next/image';
import { shimmer, toBase64 } from '@components/Utils/MDXComponents';
import avatar from '../../public/avatar.jpg';

const trackGoal = () => {
  Fathom.trackGoal('WSO7SGLK', 1);
};

const test = process.env.NODE_ENV === 'test';

const BlogPost = ({
  title,
  summary,
  slug,
  cover,
  publishedAt,
  frontMatter,
}: {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
  cover?: string;
  frontMatter: { readingTime: Record<string, string> };
}) => {
  return (
    <div className="container w-100 mx-auto flex flex-col md:flex-row overflow-hidden bg-white rounded-lg shadow-xl  mt-4 w-100">
      <div className="lg:h-64 w-auto md:w-1/2">
        <Image
          src={cover ? cover : test ? '/public/static/avatar.jpg' : avatar}
          alt={title}
          className="inset-0 h-full w-full object-cover object-center"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(700, 800)
          )}}`}
          layout="intrinsic"
          width="700"
          height="800"
        />
      </div>
      <div className="w-full">
        <div className="py-4 px-6 h-full text-gray-800 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between">
            <h3 className="lg:mt-0 mt-5 text-2xl lg:text-xl font-heading font-bold mb-2 w-full text-gray-900 dark:text-gray-100  hover:underline">
              <a
                href={`/blog/${slug}`}
                aria-label={title}
                onClick={() => trackGoal()}
                tabIndex={-1}
              >
                {title}
              </a>
            </h3>
          </div>
          <div>
            <p className="text-gray-800 h-30 overflow-hidden  dark:text-gray-400">
              {summary}
            </p>
          </div>
          <div className="text-gray-500 mt-3 text-sm flex flex-row justify-between">
            <span>
              {new Date(publishedAt).toLocaleString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            <span>{frontMatter.readingTime.text}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
