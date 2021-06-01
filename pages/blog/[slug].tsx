import { MDXRemote } from 'next-mdx-remote';
import remark from 'remark'
import html from 'remark-html'

import { getFiles, getFileBySlug } from '../../lib/mdx';
import { getTweets } from '../../lib/twitter';
import BlogLayout from '../../layouts/blog';
import Tweet from '../../components/Tweet';
import MDXComponents from '../../components/Utils/MDXComponents';

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export default function Blog({ mdxSource, tweets, frontMatter }) {
  const StaticTweet = ({ id }) => {
    const tweet = tweets.find((tweet) => tweet.id === id);
    return <Tweet {...tweet} />;
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
    body: indexContent.filter(item => item !== '').map(item => ({"paragraph": item})),
    summary: post.frontMatter.summary,
    publishedAt: post.frontMatter.publishedAt,
    cover: post.frontMatter.cover ? post.frontMatter.cover : "https://rosnovsky.us/static/favicons/favicon.ico" }

  fetch(process.env.NODE_ENV === "development" ? "http://localhost:3000/api/algoliasearch" : "https://rosnovsky.us/api/algoliasearch", {
    method: 'POST',
    body: JSON.stringify(index)
  })

  return { props: { ...post, tweets } };
}
