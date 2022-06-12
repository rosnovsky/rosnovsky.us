import { PortableText } from '@portabletext/react';
import sanityClient from '@lib/sanityClient';
import { postQuery, postPathsQuery } from '@lib/queries';
import { localDate, PortableTextComponents } from '@lib/helpers';
import type { BlogPost } from 'index';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const Link = dynamic(() => import('next/link'), { ssr: true });
const Containter = dynamic(() => import('@components/Container'));
const Comments = dynamic(() => import('@components/Comments/Comments'));
import { RelatedPosts } from '@components/Blog/Posts';
import CommentEditor from '@components/Comments/Editor';
import { useUser } from '@auth0/nextjs-auth0';

type Props = {
  post: BlogPost;
  status: 'up' | 'down';
};

const Post = ({ post, status = 'up' }: Props) => {
  const { user } = useUser();
  const {
    publishedAt,
    title,
    summary,
    summaryRaw,
    coverImage,
    categories,
    body,
    estimatedReadingTime,
    references,
    socialCardImage,
  } = post;

  return (
    <Containter
      title={`${title}`}
      description={summaryRaw}
      image={
        socialCardImage
          ? socialCardImage.asset.url
          : 'https://rosnovsky.us/static/images/banner.jpg'
      }
      status={status}
      date={new Date(publishedAt).toISOString()}
      type="article"
    >
      <section
        className="py-16 md:py-24 bg-white"
        style={{
          backgroundImage: `url('/flex-ui-assets/elements/pattern-white.svg')`,
          backgroundPosition: 'center top',
        }}
      >
        <div className="container px-4 mx-auto">
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
          <div className="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
            <Image
              src={coverImage.asset.url}
              placeholder="blur"
              blurDataURL={coverImage.asset.metadata.lqip}
              width={coverImage.asset.metadata.dimensions.width}
              height={coverImage.asset.metadata.dimensions.height}
              objectFit="cover"
              priority
              alt=""
            />
          </div>
          <div className="prose prose-xl md:max-w-3xl mx-auto">
            <PortableText value={body} components={PortableTextComponents} />
          </div>
          {references && (
            <div className="mb-10 mx-auto md:max-w-3xl overflow-hidden rounded-lg">
              <h2 className="text-2xl text-center my-10 mx-auto overflow-hidden rounded-lg">
                Related Posts
              </h2>

              <div className="w-full md:max-w-5xl mx-auto mb-8 md:mb-16 text-center">
                <RelatedPosts posts={references} />
              </div>
            </div>
          )}
          <div className="w-full text-center mt-4 mx-auto">
            <h2 className="text-2xl">Comments</h2>
            <div className="max-w-3xl min-w-3xl mx-auto py-3">
              {user ? (
                <CommentEditor postId={post._id} postTitle={post.title} />
              ) : (
                <Link href="/api/auth/login">Login to comment</Link>
              )}
              <Comments slug={post.slug.current} />
            </div>
          </div>
        </div>
      </section>
    </Containter>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(postPathsQuery);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.params;
  const post: BlogPost = await sanityClient.fetch(postQuery, { slug });

  const sysytemStatus = await fetch('https://rosnovsky.us/api/status').then(
    (res) => res.json()
  );

  return {
    props: {
      post,
      status: sysytemStatus,
    },
    revalidate: 1,
  };
}

export default Post;
