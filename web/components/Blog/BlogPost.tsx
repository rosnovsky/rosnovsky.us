import * as Fathom from 'fathom-client';
import sanityClient from '@sanity/client';
import Image from 'next/image';
import imageUrlBuilder from '@sanity/image-url';
import { PortableText } from '@lib/sanity';

const trackGoal = () => {
  Fathom.trackGoal('WSO7SGLK', 1);
};

const configuredSanityClient = sanityClient({
  projectId: 'n3o7a5dl',
  dataset: 'prod',
  useCdn: true,
  apiVersion: '2021-08-31',
});
const builder = imageUrlBuilder(configuredSanityClient);

function urlFor(source) {
  return builder.image(source);
}

const BlogPost = ({
  title,
  summary,
  slug,
  coverImage,
  publishedAt,
}: {
  title: string;
  summary: any;
  slug: { current: string };
  publishedAt: string;
  coverImage: any;
}) => {
  return (
    <div className="container w-100 mx-auto flex flex-col md:flex-row overflow-hidden bg-white dark:bg-gray-800 rounded-lg shadow-xl my-5 w-100">
      <div className="w-auto md:w-1/2">
        {/* TODO: turn this into CoverImage component */}
        <Image
          src={urlFor(coverImage).fit('clip').width(500).height(500).url()}
          layout="responsive"
          placeholder="blur"
          blurDataURL={coverImage.asset.metadata.lqip}
          width={500}
          height={500}
        />
      </div>
      <div className="w-full">
        <div className="py-4 px-6 h-full text-gray-800 flex flex-col justify-between">
          <div className="flex flex-col md:flex-row justify-between">
            <h3 className="lg:mt-0 mt-5 text-3xl lg:text-2xl font-heading font-bold mb-2 w-full text-gray-900 dark:text-gray-100  hover:underline">
              <a
                href={`/blog/${slug.current}`}
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
              <PortableText value={summary} />
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
