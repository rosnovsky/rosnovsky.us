import fetch from 'isomorphic-fetch';

import BlogLayout from 'layouts/blogLayout';
import Comments from '@components/Cards/Comments';
import { CommentForm } from '@components/Utils/CommentForm';

import { useUser } from '@auth0/nextjs-auth0';
import { BlogPost as BlogPostType, PostComment } from '../..';
import Link from 'next/link';
import client, { PortableText } from '@lib/sanity';
import BlogPost from '@components/Blog/BlogPost';

export default function Blog({
  post,
  comments,
}: {
  post: BlogPostType;
  comments: PostComment[];
}) {
  const { user } = useUser();
  console.log('Building', post?.title ? post.title : 'NO TITLE');

  return (
    <BlogLayout post={post}>
      <PortableText value={post?.body ? post.body : null} />
      {user ? (
        <CommentForm
          postId={post.slug.current}
          postTitle={post?.title ? post.title : null}
        />
      ) : (
        <span className="text-black dark:text-white">
          <Link href="/api/auth/login" passHref>
            <span className="text-green-700 dark:text-green-400  underline hover:cursor-pointer font-semibold hover:text-green-900 dark:hover:text-green-200">
              Signup or Login
            </span>
          </Link>{' '}
          to comment
        </span>
      )}
      <Comments
        comments={comments}
        postId={post.slug.current}
        postTitle={post?.title ? post.title : null}
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type == "post" && defined(slug.current)][].slug.current`
  );
  console.log(paths);

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const baseUrl = 'https://rosnovsky-api.vercel.app';

  const { slug = '' } = params;
  const post = await client.fetch(
    `
    *[_type == "post" && slug.current == $slug][0] {
        ...,
      coverImage {..., asset-> }}
  `,
    { slug }
  );

  // const post = await getFileBySlug('blog', params.slug);

  // try {
  //   const generateSocialImage: VercelResponse = await fetch(
  //     `${baseUrl}/api/opengraph/generate?title=${
  //       post.frontMatter.title
  //     }&meta=${new Date(post.frontMatter.publishedAt).toLocaleDateString(
  //       'en-US',
  //       {
  //         day: 'numeric',
  //         month: 'long',
  //         year: 'numeric',
  //       }
  //     )} | ${post.frontMatter.readingTime.text}&coverImage=${
  //       post.frontMatter?.cover || null
  //     }`
  //   );
  //   console.info(
  //     `♻️ Generating Social Image for ${post.frontMatter.title}. Here its status code: `,
  //     generateSocialImage.status
  //   );
  // } catch (e) {
  //   console.error(e);
  // }

  console.log('SSR', params);

  const comments: PostComment[] = await fetch(
    `https://rosnovsky.us/api/comments/getComments?id=${params.slug}`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());

  return { props: { post, comments } };
}
