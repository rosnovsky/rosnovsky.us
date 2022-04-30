import { NavBar } from '@components/NavBar';
import Blog from '@components/Blog';
import NewsletterForm from '@components/NewsletterForm';
import Stats from '@components/Stats';
import Footer from '@components/Footer';
import sanityClient from 'lib/sanityClient';
import type { BlogPost } from 'index';
import Containter from '@components/Container';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
};

const Category = ({ posts, categories, postCount }: Props) => {
  return (
    <Containter>
      <Blog posts={posts} categories={categories} postCount={postCount} />
      <NewsletterForm />
      <Stats />
      <Footer />
    </Containter>
  );
};

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    `*[_type == "post" && categories[]->slug.current == slug.current][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export async function getStaticProps(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const posts = await sanityClient.fetch(
    `
    *[_type == "post" && $slug in categories[]->slug.current][0...6] {
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
  `,
    { slug: context.params.slug }
  );

  const postCount: number = await sanityClient.fetch(
    `
    *[count(_type == "post")]
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

  return {
    props: {
      posts,
      categories,
      postCount,
    },
    revalidate: 30,
  };
}

export default Category;
