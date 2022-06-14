import dynamic from 'next/dynamic';
import sanityClient from '@lib/sanityClient';
const Containter = dynamic(() => import('@components/Container'));
const Blog = dynamic(() => import('@components/Blog/blog'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
import type { BlogPost } from 'index';
import {
  categoriesQuery,
  indexPagePostsQuery,
  totalPostsCountQuery,
} from '@lib/queries';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
};

const BlogPage = ({ posts, categories, postCount }: Props) => {
  return (
    <Containter
      title={`All ${postCount} blog posts - Rosnovsky Park`}
      description="Check out all the posts I've written so far."
    >
      <Blog posts={posts} categories={categories} postCount={postCount} />
      <NewsletterForm />
    </Containter>
  );
};

export async function getStaticProps() {
  // It's important to default the slug so that it doesn't return "undefined"
  const posts: BlogPost[] = await sanityClient.fetch(indexPagePostsQuery, {
    pagePostsLimit: 8,
  });

  const postCount: number = await sanityClient.fetch(totalPostsCountQuery);

  const categories: BlogPost['categories'] = await sanityClient.fetch(
    categoriesQuery
  );

  return {
    props: {
      posts,
      categories,
      postCount,
    },
    revalidate: 120,
  };
}

export default BlogPage;
