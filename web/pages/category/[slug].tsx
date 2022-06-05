import Blog from '@components/Blog';
import dynamic from 'next/dynamic';
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
const Stats = dynamic(() => import('@components/Stats'));
import sanityClient from '@lib/sanityClient';
import type { BlogPost } from 'index';
import Containter from '@components/Container';
import Custom404 from '@pages/404';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
  commentCount: number;
  isCategory: BlogPost['categories'][0]['slug']['current'];
  status: 'up' | 'down';
};

const Category = ({
  posts,
  categories,
  postCount,
  isCategory,
  status,
  commentCount,
}: Props) => {
  if (!postCount) {
    return <Custom404 status={status} />;
  }
  return (
    <Containter status={status}>
      <Blog
        posts={posts}
        categories={categories}
        postCount={postCount}
        isCategory={isCategory}
      />
      <NewsletterForm />
      <Stats commentCount={commentCount} />
    </Containter>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && categories[]->slug.current == slug.current][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const posts = await sanityClient.fetch(
    `
    *[_type == "post" && $slug in categories[]->slug.current] | order(publishedAt desc)[0...15] {
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
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `,
    { slug: context.params.slug }
  );

  const postCount: number = await sanityClient.fetch(
    `
    count(*[_type == "post" && $slug in categories[]->slug.current])
  `,
    { slug: context.params.slug }
  );

  const commentCount: number = await sanityClient.fetch(
    `
    count(*[_type == "comment"])
  `
  );

  const categories = await sanityClient.fetch(
    `
    *[_type == "category"][0...6] {
      title,
      description,
      slug
    }
  `
  );

  const sysytemStatus = await fetch('https://rosnovsky.us/api/status').then(
    (res) => res.json()
  );

  return {
    props: {
      status: sysytemStatus,
      posts,
      categories,
      postCount,
      commentCount,
      isCategory: context.params.slug,
    },
    revalidate: 1,
  };
}

export default Category;
