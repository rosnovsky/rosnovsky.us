import * as Fathom from 'fathom-client';

const trackGoal = (title) => {
  const goalCodes = {
    [title]: 'WSO7SGLK',
  };

  Fathom.trackGoal(goalCodes[title], 0);
};

const BlogPost = ({
  title,
  summary,
  slug,
}: {
  title: string;
  summary: string;
  slug: string;
  publishedAt: string;
}) => {
  return (
    <a
      href={`/blog/${slug}`}
      aria-label={title}
      onClick={() => trackGoal(title)}
      tabIndex={-1}
    >
      <span className="w-full cursor-pointer ">
        <div className="mb-8 w-full">
          <div className="flex flex-col md:flex-row justify-between">
            <h4 className="text-lg md:text-xl font-medium mb-2 w-full text-gray-900 dark:text-gray-100 hover:underline">
              {title}
            </h4>
          </div>
          <p className="text-gray-600 dark:text-gray-400">{summary}</p>
        </div>
      </span>
    </a>
  );
};

export default BlogPost;
