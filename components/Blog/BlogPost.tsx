import * as Fathom from 'fathom-client';
import Link from 'next/link';

const trackGoal = () => {
  Fathom.trackGoal('WSO7SGLK', 1);
};

const BlogPost = ({
  title,
  summary,
  slug,
  cover,
}: {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
  cover?: string;
}) => {
  return (
    <div className="flex lg:flex-row justify-center my-10 flex-col overflow-hidden">
      <img
        src={cover}
        alt={title}
        className="w-1/1 lg:w-1/2 mr-7 rounded-l-2xl object-cover"
      />
      <span className="w-full cursor-pointer">
        <div className="mb-8 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <h3 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100 hover:underline">
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
          <p className="text-gray-600 dark:text-gray-400">{summary}</p>
        </div>
      </span>
    </div>
  );
};

export default BlogPost;
