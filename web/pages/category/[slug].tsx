import Blog from '@components/Blog/blog';
import dynamic from 'next/dynamic';
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
const Stats = dynamic(() => import('@components/Stats'));
import sanityClient from '@lib/sanityClient';
import type { BlogPost } from 'index';
import Containter from '@components/Container';
import Custom404 from '@pages/404';
import {
  categoriesQuery,
  categoryPagePathsQuery,
  categoryPageQuery,
  categoryPostCountQuery,
  commentCountQuery,
} from '@lib/queries';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
  commentCount: number;
  isCategory: BlogPost['categories'][0]['slug']['current'];
};

const Category = ({
  posts,
  categories,
  postCount,
  isCategory,
  commentCount,
}: Props) => {
  if (!postCount) {
    return <Custom404 />;
  }
  return (
    <Containter>
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
  const paths = await sanityClient.fetch(categoryPagePathsQuery);
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: 'blocking',
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const posts = await sanityClient.fetch(categoryPageQuery, {
    slug: context.params.slug,
  });

  const postCount: number = await sanityClient.fetch(categoryPostCountQuery, {
    slug: context.params.slug,
  });

  const commentCount: number = await sanityClient.fetch(commentCountQuery);

  const categories = await sanityClient.fetch(categoriesQuery);
  return {
    props: {
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
