import dynamic from 'next/dynamic';
import sanityClient from 'lib/sanityClient';
import { SWRConfig } from 'swr';
const Stats = dynamic(() => import('@components/Stats'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
import Container from '@components/Container';
import { Hero } from '@components/Hero';
import Blog from '@components/Blog/blog';
import type { BlogPost } from 'index';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
  commentCount: number;
  fallback: any;
  status: 'up' | 'down';
};

const Home = ({
  posts,
  categories,
  postCount,
  fallback,
  status,
  commentCount,
}: Props) => {
  return (
    <Container
      title={`Rosnovsky Park – Art Rosnovsky`}
      description={"Hey, I'm Art, and we need to talk. Seriously."}
      type="website"
      status={status}
    >
      <Hero />
      <Blog posts={posts} categories={categories} postCount={postCount} />
      <NewsletterForm />
      <SWRConfig value={{ fallback }}>
        <Stats commentCount={commentCount} />
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
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 ),
      "summaryRaw": pt::text(summary)
    }
  `
  );

  const postCount: number = await sanityClient.fetch(
    `
    count(*[_type == "post"])
  `
  );
  const commentCount: number = await sanityClient.fetch(
    `
    count(*[_type == "comment"])
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

  const githubStats = await fetch('https://rosnovsky.us/api/stats/github').then(
    (res) => res.json()
  );

  const subscribersStats = await fetch(
    'https://rosnovsky.us/api/stats/subscribers'
  ).then((res) => res.json());

  const visitorsStats = await fetch(
    'https://rosnovsky.us/api/stats/uniquesThisMonth'
  ).then((res) => res.json());

  const sysytemStatus = await fetch('https://rosnovsky.us/api/status').then(
    (res) => res.json()
  );

  return {
    props: {
      posts,
      categories,
      postCount,
      commentCount,
      status: sysytemStatus,
      fallback: {
        '/api/github': githubStats,
        '/api/subscribers': subscribersStats,
        '/api/fathom/uniquesThisMonth': visitorsStats,
      },
    },
    revalidate: 120,
  };
}

export default Home;
