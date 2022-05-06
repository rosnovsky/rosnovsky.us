import Blog from '@components/Blog';
import dynamic from 'next/dynamic';
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
import sanityClient from 'lib/sanityClient';
import type { BlogPost } from 'index';
import Containter from '@components/Container';
import Head from 'next/head';

type Props = {
  posts: BlogPost[];
  categories: BlogPost['categories'];
  postCount: number;
};

const BlogPage = ({ posts, categories, postCount }: Props) => {
  return (
    <Containter>
      <Head>
        <title>Rosnovsky Park&trade; Blog</title>
        <meta name="description" content="Art Rosnovsky's Blog" />
        <meta
          name="keywords"
          content="Art Rosnovsky, Rosnovsky Park, Rosnovsky Park&trade;, Rosnovsky Park's Blog"
        />
        <meta name="author" content="Art Rosnovsky" />
        <meta name="robots" content="index, follow" />
        <meta name="referrer" content="origin" />
        <meta
          name="og:title"
          property="og:title"
          content="Rosnovsky Park&trade; - Art Rosnovsky's Blog"
        />
        <meta
          name="og:description"
          property="og:description"
          content="Art Rosnovsky's Blog"
        />
        <meta
          name="og:image"
          property="og:image"
          content="https://rosnovsky.us/static/logo.png"
        />
        <meta
          name="og:url"
          property="og:url"
          content="https://rosnovsky.us/blog"
        />
        <meta name="og:type" property="og:type" content="website" />
        <meta
          name="twitter:card"
          property="twitter:card"
          content="summary_large_image"
        />
        <meta
          name="twitter:site"
          property="twitter:site"
          content="@rosnovsky"
        />
        <meta
          name="twitter:creator"
          property="twitter:creator"
          content="@rosnovsky"
        />
        <meta
          name="twitter:title"
          property="twitter:title"
          content="Rosnovsky Park&trade; - Art Rosnovsky's Blog"
        />
        <meta
          name="twitter:description"
          property="twitter:description"
          content="Art Rosnovsky's Blog"
        />
        <meta
          name="twitter:image"
          property="twitter:image"
          content="https://rosnovsky.us/static/logo.png"
        />
        <meta
          name="twitter:url"
          property="twitter:url"
          content="https://rosnovsky.us/blog"
        />
        <link
          rel="icon"
          type="image/x-icon"
          href="https://rosnovsky.us/static/logo.png"
        />
      </Head>
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
