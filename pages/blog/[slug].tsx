import { MDXRemote } from 'next-mdx-remote';
import remark from 'remark'
import html from 'remark-html'
import { useState } from 'react';
import useSWR from 'swr';
import fetch from 'isomorphic-fetch'


import { getFiles, getFileBySlug } from '../../lib/mdx';
import BlogLayout from '../../layouts/blogLayout';
import MDXComponents from '../../components/Utils/MDXComponents';
import Comments from '../../components/Cards/Comments';

import { useUser } from '@auth0/nextjs-auth0';
import { FrontMatter, PostComment } from '../..';
import Link from 'next/link'
import { FormEvent } from 'react';

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export default function Blog({ mdxSource, frontMatter, comments }: { mdxSource: any, frontMatter: FrontMatter, comments: PostComment[] }) {
  const { user } = useUser();
  const [commentStatus, setCommentStatus] = useState(false)
  const [comment, setComment] = useState('')
  const [updatedComments, setUpdatedComments] = useState(comments)
  const [commentError, setCommentError] = useState('')

  console.log(mdxSource, frontMatter, comments)

  const postCommentRequest = async (e: FormEvent) => {
    e.preventDefault()

    setCommentStatus(true)
    setCommentError('')

    try {
      const result = await fetch('/api/comments/postComment', {
        method: 'POST',
        body: JSON.stringify({ postId: frontMatter.slug, postTitle: frontMatter.title, content: comment })
      }).then(res => res.json())
      if (!result.ok) {
        setCommentError(result.error)
        throw new Error(result.error)
      }
    }
    catch (error) {
      console.error(commentError)
    }
    setCommentStatus(false)
    setComment('')
    return null
  }
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const url = process.env.NODE_ENV === 'test' ? 'https://rosnovsky.us/api/comments/getComments?id=test' : `/api/comments / getComments ? id = ${frontMatter.slug}`
  const { data, error } = useSWR(url, fetcher, { refreshInterval: 1000 })

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

  return (

    <BlogLayout frontMatter={frontMatter} >
      <MDXRemote
        {...mdxSource}
        components={{
          ...MDXComponents
        }}
      />

      {user ? <span id="comments" className="font-bold" >
        <div className="flex mx-auto items-center justify-center shadow-lg mb-4 w-full">
          <form className="w-full max-w-xl bg-white dark:bg-gray-900 rounded-lg px-4 pt-2" onSubmit={e => postCommentRequest(e)} >
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-1 pb-2 text-gray-800 dark:text-gray-200 text-lg">Add a new comment</h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea className="bg-gray-100 dark:bg-gray-700 rounded border dark:border-gray-700 border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 dark:placeholder-gray-200 focus:outline-none focus:bg-white dark:focus:bg-gray-900" name="body" placeholder='Type Your Comment' onChange={e => { setComment(e.target.value); setCommentError('') }} value={comment} required ></textarea>
              </div>
              <div className="w-full flex px-3">
                <div className="w-full mx-auto">
                  <input type='submit' disabled={comment ? commentStatus : true} className="bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium py-1 px-4 mx-auto border dark:border-gray-600 border-gray-400 rounded-lg tracking-wide dark:hover:bg-gray-900 hover:bg-gray-100" value={commentStatus ? 'Posting...' : commentError ? "Comment already exists" : "Post Comment"} />
                </div>
              </div>
            </div>
          </form>
        </div></span>
        : <span className="text-black"><Link href="/api/auth/login" passHref><span className="text-green-700 dark:text-green-400  underline hover:cursor-pointer font-semibold hover:text-green-900 dark:hover:text-green-200">Signup or Login</span></Link> to comment</span>
      }
      <Comments comments={data ? data : comments} postId={frontMatter.slug} postTitle={frontMatter.title} />
    </BlogLayout >
  );
}

export async function getStaticPaths() {
  const posts = await getFiles('blog');

  return {
    paths: posts.map((p) => ({
      params: {
        slug: p.replace(/\.mdx/, '')
      }
    })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const post = await getFileBySlug('blog', params.slug);

  const comments: PostComment[] = await fetch(`https://rosnovsky.us/api/comments/getComments?id=${params.slug}`, {
    method: 'GET',
  }).then(res => res.json())


  return { props: { ...post, comments }, revalidate: 1 };
}
