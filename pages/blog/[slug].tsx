import { MDXRemote } from 'next-mdx-remote';
import fetch from 'isomorphic-fetch';

import { getFiles, getFileBySlug } from '../../lib/mdx';
import BlogLayout from '../../layouts/blogLayout';
import MDXComponents from '../../components/Utils/MDXComponents';
import Comments from '../../components/Cards/Comments';
import { CommentForm } from '@components/Utils/CommentForm';

import { useUser } from '@auth0/nextjs-auth0';
import { FrontMatter, PostComment } from '../..';
import Link from 'next/link';
import { VercelResponse } from '@vercel/node';

export default function Blog({
  mdxSource,
  frontMatter,
  comments,
}: {
  mdxSource: any;
  frontMatter: FrontMatter;
  comments: PostComment[];
}) {
  const { user } = useUser();

  return (
    <BlogLayout frontMatter={frontMatter}>
      <MDXRemote
        {...mdxSource}
        components={{
          ...MDXComponents,
        }}
      />

      {user ? (
        <CommentForm postId={frontMatter.slug} postTitle={frontMatter.title} />
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
        postId={frontMatter.slug}
        postTitle={frontMatter.title}
      />
    </BlogLayout>
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('blog');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, ''),
      },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const baseUrl =
    process.env.NODE_ENV === 'development'
      ? 'http://localhost:3000'
      : 'https://rosnovsky.us';
  const post = await getFileBySlug('blog', params.slug);

  try {
    const generateSocialImage: VercelResponse = await fetch(
      `${baseUrl}/api/opengraph/generate?title=${
        post.frontMatter.title
      }&meta=${new Date(post.frontMatter.publishedAt).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }
      )} | ${post.frontMatter.readingTime.text}&coverImage=${
        post.frontMatter?.cover || null
      }`
    );
    console.info(
      `♻️ Generating Social Image for ${
        post.frontMatter.title
      }: ${baseUrl}/api/opengraph/generate?title=${
        post.frontMatter.title
      }&meta=${new Date(post.frontMatter.publishedAt).toLocaleDateString(
        'en-US',
        {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }
      )} | ${post.frontMatter.readingTime.text}&coverImage=${
        post.frontMatter?.cover || null
      }). Here its status code: `,
      generateSocialImage.status
    );
  } catch (e) {
    console.error(e);
  }

  const comments: PostComment[] = await fetch(
    `https://rosnovsky.us/api/comments/getComments?id=${params.slug}`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());

  return { props: { ...post, comments } };
}
