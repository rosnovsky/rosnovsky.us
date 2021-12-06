import { MDXRemote } from 'next-mdx-remote';
import useSWR from 'swr';
import fetch from 'isomorphic-fetch';

import { getFiles, getFileBySlug } from '../../lib/mdx';
import BlogLayout from '../../layouts/blogLayout';
import MDXComponents from '../../components/Utils/MDXComponents';
import Comments from '../../components/Cards/Comments';
import { CommentForm } from '@components/Utils/CommentForm';

import { useUser } from '@auth0/nextjs-auth0';
import { FrontMatter, PostComment } from '../..';
import Link from 'next/link';

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

  // const fetcher = (url) => fetch(url).then((res) => res.json());
  // const url =
  //   process.env.NODE_ENV === 'test'
  //     ? 'https://rosnovsky.us/api/comments/getComments?id=test'
  //     : `/api/comments/getComments?id=${frontMatter.slug}`;
  // const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 });

  // if (error) return <div>failed to load</div>;
  // if (!data) return <div>loading...</div>;

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
        <span className="text-black">
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
  const post = await getFileBySlug('blog', params.slug);

  const comments: PostComment[] = await fetch(
    `https://rosnovsky.us/api/comments/getComments?id=${params.slug}`,
    {
      method: 'GET',
    }
  ).then((res) => res.json());

  return { props: { ...post, comments } };
}
