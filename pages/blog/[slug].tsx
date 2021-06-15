import { MDXRemote } from 'next-mdx-remote';
import remark from 'remark'
import html from 'remark-html'

import { getFiles, getFileBySlug } from '../../lib/mdx';
import { getTweets } from '../../lib/twitter';
import BlogLayout from '../../layouts/blogLayout';
import Tweet from '../../components/Tweet';
import MDXComponents from '../../components/Utils/MDXComponents';
import  Comment from '../../components/Cards/Comment';

import { useUser } from '@auth0/nextjs-auth0';

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown)
  return result.toString()
}

export default function Blog({ mdxSource, tweets, frontMatter }) {
  const { user } = useUser();
//   const tempUser = {
//     "https://example.com/geoip": {
//         "country_code": "US",
//         "country_code3": "USA",
//         "country_name": "United States",
//         "city_name": "Beaverton",
//         "latitude": 45.5221,
//         "longitude": -122.8585,
//         "time_zone": "America/Los_Angeles",
//         "continent_code": "NA"
//     },
//     "given_name": "Art",
//     "family_name": "Rosnovsky",
//     "nickname": "artem",
//     "name": "Art Rosnovsky",
//     "picture": "https://media-exp1.licdn.com/dms/image/C5603AQH1tB3_hXTWdA/profile-displayphoto-shrink_800_800/0/1587975295410?e=1617840000&v=beta&t=WwoBr_spS88QSwyAO33fHKPyCGh0eJ_PPmISCxnnoJE",
//     "updated_at": "2021-06-10T20:17:33.951Z",
//     "email": "artem@rosnovsky.us",
//     "email_verified": true,
//     "sub": "linkedin|p3Jdh3f0W5"
// }
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
      {user ? <span id="comments" className="font-bold">Comments comming soon. But thanks for logging in, {user.name} ;)</span> : <span className="text-black"><a href="/api/auth/login"><span className="text-green-700 dark:text-green-400  underline hover:cursor-pointer font-semibold hover:text-green-900 dark:hover:text-green-200">Signup or Login</span></a> to comment</span>}
      {/* <Comment {...{author: {user: tempUser,
    verified: true,
    regular: false,
    comments: 10}, status: { approved: true,
  published: 'draft',
  flagged: 'other'}, content: "!!!", postedAt: {date: "string",
    dateUTC: "string",
    postedAt: new Date()}}}/> */}
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

  fetch(process.env.NODE_ENV !== "production" ? "http://localhost:3000/api/algoliasearch" : "https://rosnovsky.us/api/algoliasearch", {
    method: 'POST',
    body: JSON.stringify(index),
  })

  return { props: { ...post, tweets } };
}
