import * as Fathom from 'fathom-client';
import Image from 'next/image';
import { shimmer, toBase64 } from '@components/Utils/MDXComponents';
import slugify from 'slugify';

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
      <div className="w-full lg:w-1/2 mr-7 md:w-full object-contain">
        <Image
          src={
            cover
              ? cover
              : `https://res.cloudinary.com/rosnovsky/image/upload/v1639272559/social-images/${slugify(
                  title
                )}.jpg`
          }
          alt={title}
          className="rounded-lg xl:rounded-none"
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(
            shimmer(300, 125)
          )}}`}
          layout="responsive"
          width="230"
          height="125"
        />
      </div>
      <div className="w-full">
        <div className="mb-8 w-full">
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
          <p className="text-gray-600 dark:text-gray-400">{summary}</p>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
