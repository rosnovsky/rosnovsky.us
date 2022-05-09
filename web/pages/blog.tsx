import Blog from '@components/Blog';
import dynamic from 'next/dynamic';
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
import sanityClient from '@lib/sanityClient';
import type { BlogPost } from 'index';
import Containter from '@components/Container';

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
  const posts: BlogPost[] = await sanityClient.fetch(
    `
    *[_type == "post"] | order(publishedAt desc)[0...8] {
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
    *[_type == "category"][0..8] {
      title,
      description,
      slug
    }
  `
  );

  return {
    props: {
      posts,
      categories,
      postCount,
    },
    revalidate: 30,
  };
}

export default BlogPage;
