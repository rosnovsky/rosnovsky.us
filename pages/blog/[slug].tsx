import { MDXRemote } from 'next-mdx-remote';
import remark from 'remark'
import html from 'remark-html'

import { getFiles, getFileBySlug } from '../../lib/mdx';
import { getTweets } from '../../lib/twitter';
import BlogLayout from '../../layouts/blogLayout';
import Tweet from '../../components/Tweet';
import MDXComponents from '../../components/Utils/MDXComponents';
import Comments from '../../components/Cards/Comments';

import { useUser } from '@auth0/nextjs-auth0';
import { PostComment } from '../..';
import Link from 'next/link'

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export default function Blog({ mdxSource, tweets, frontMatter, comments }: { mdxSource: any, tweets: any, frontMatter: any, comments: PostComment[] }) {
  const { user } = useUser();
  const StaticTweet = ({ id }) => {
    const renderTweet = tweets.find((tweet) => tweet.id === id);
    return <Tweet {...renderTweet} />;
  };

  return (
    <BlogLayout frontMatter={frontMatter}>
      <MDXRemote
        {...mdxSource}
        components={{
          ...MDXComponents,
          StaticTweet
        }}
      />
      {user ? <span id="comments" className="font-bold">
        <div className="flex mx-auto items-center justify-center shadow-lg mb-4 w-full">
          <form className="w-full max-w-xl bg-white rounded-lg px-4 pt-2">
            <div className="flex flex-wrap -mx-3 mb-6">
              <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">Add a new comment</h2>
              <div className="w-full md:w-full px-3 mb-2 mt-2">
                <textarea className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" name="body" placeholder='Type Your Comment' required></textarea>
              </div>
              <div className="w-full flex px-3">
                <div className="w-full mx-auto">
                  <input type='submit' disabled className="bg-white text-gray-700 font-medium py-1 px-4 mx-auto border border-gray-400 rounded-lg tracking-wide hover:bg-gray-100" value='Coming Soon!' />
                </div>
              </div>
            </div>
          </form>
        </div></span>
        : <span className="text-black"><Link href="/api/auth/login" passHref><span className="text-green-700 dark:text-green-400  underline hover:cursor-pointer font-semibold hover:text-green-900 dark:hover:text-green-200">Signup or Login</span></Link> to comment</span>}
      <Comments comments={comments} />
    </BlogLayout>
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
  const tweets = await getTweets(post.tweetIDs);

  const htmlContent = await markdownToHtml(post.content || '')
  const records = htmlContent.split('<p>').filter(string => string != '');
  const indexContent = records.map(string => string.replace(/<[^>]*>?/gm, '').replace('\n', ''))

  const index = {
    title: post.frontMatter.title,
    slug: post.frontMatter.slug,
    body: indexContent.filter(item => item !== '').map(item => ({ "paragraph": item })),
    summary: post.frontMatter.summary,
    publishedAt: post.frontMatter.publishedAt,
    cover: post.frontMatter.cover ? post.frontMatter.cover : "https://rosnovsky.us/static/favicons/favicon.ico"
  }

  fetch("https://rosnovsky.us/api/algoliasearch", {
    method: 'POST',
    body: JSON.stringify(index),
  })

  const comments: PostComment[] = await fetch(process.env.NODE_ENV !== "production" ? `http://localhost:3000/api/comments/getComments?id=${params.slug}` : `https://rosnovsky.us/api/comments/getComments?id=${params.slug}`, {
    method: 'GET',
  }).then(res => res.json())

  return { props: { ...post, tweets, comments } };
}
