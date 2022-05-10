import dynamic from 'next/dynamic';
import { Hero } from '@components/Hero';
import Blog from '@components/Blog';
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
const Stats = dynamic(() => import('@components/Stats'));
import sanityClient from 'lib/sanityClient';
import type { BlogPost } from 'index';
import Container from '@components/Container';
import { SWRConfig } from 'swr';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
  fallback: any;
};

const Home = ({ posts, categories, postCount, fallback }: Props) => {
  return (
    <Container
      title={`Rosnovsky Park – Art Rosnovsky`}
      description={"Hey, I'm Art, and we need to talk. Seriously."}
      image={`https://rosnovsky.us/static/images/banner.jpg`}
      type="website"
    >
      <Hero />
      <Blog posts={posts} categories={categories} postCount={postCount} />
      <NewsletterForm />
      <SWRConfig value={{ fallback }}>
        <Stats />
      </SWRConfig>
    </Container>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"
  const posts: BlogPost[] = await sanityClient.fetch(
    `
    *[_type == "post"] | order(publishedAt desc)[0...6] {
      title,
      coverImage {
        ...,
        asset->
      },
      categories[]->{
        title,
        description,
        slug
      },
      publishedAt,
      summary,
      slug,
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `
  );

  const postCount: number = await sanityClient.fetch(
    `
    count(*[_type == "post"])
  `
  );

  const categories: BlogPost['categories'] = await sanityClient.fetch(
    `
    *[_type == "category"] {
      title,
      description,
      slug
    }
  `
  );

  const githubStats = await fetch(
    'https://rosnovskyus-git-back-to-sanity-rosnovsky.vercel.app/api/github'
  ).then((res) => res.json());

  const commentsStats = await fetch(
    'https://rosnovskyus-git-back-to-sanity-rosnovsky.vercel.app/api/comments/getCommentsCount'
  ).then((res) => res.json());

  const subscribersStats = await fetch(
    'https://rosnovskyus-git-back-to-sanity-rosnovsky.vercel.app/api/subscribers'
  ).then((res) => res.json());

  const visitorsStats = await fetch(
    'https://rosnovskyus-git-back-to-sanity-rosnovsky.vercel.app/api/fathom/uniquesThisMonth'
  ).then((res) => res.json());

  return {
    props: {
      posts,
      categories,
      postCount,
      fallback: {
        '/api/github': githubStats,
        '/api/comments/getCommentsCount': commentsStats,
        '/api/subscribers': subscribersStats,
        '/api/fathom/uniquesThisMonth': visitorsStats,
      },
    },
  };
}

export default Home;
