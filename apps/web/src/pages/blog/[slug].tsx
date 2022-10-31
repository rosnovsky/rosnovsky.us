import { PortableText } from '@portabletext/react';

import type { BlogPost } from 'index'
import sanityClient from '@/lib/sanityClient'
import { pagePathsQuery, postQuery } from '@/lib/queries'
import { ArticleLayout } from '@/components/ArticleLayout'
import { PortableTextComponents } from '@/lib/portableText';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next/types';
import Head from 'next/head';

export default function BlogPost(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { post } = props
  const meta = {
    title: post?.title,
    description: post?.summaryRaw,
    image: post?.mainImage,
    date: post?.publishedAt,
    estimatedReadingTime: post?.estimatedReadingTime,
  }

  return (
    <>
      <Head>
        <title>
          {meta.title} by Art Rosnovsky
        </title>
        <meta
          name="description"
          content={meta.description}
        />
        <meta
          property="og:image"
          content={`https://rosnovsky.us/api/og?title=${encodeURIComponent(meta.title)}&date=${encodeURIComponent(new Date(meta.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }))}&readTime=${encodeURIComponent(meta.estimatedReadingTime + ' min read')}`}
        />
        <meta property="og:url" content="https://rosnovsky.us" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${meta.title} by Art Rosnovsky`} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`https://rosnovsky.us/api/og?title=${encodeURIComponent(meta.title)}&date=${encodeURIComponent(new Date(meta.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }))}&readTime=${encodeURIComponent(meta.estimatedReadingTime + ' min read')}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="rosnovsky.us" />
        <meta property="twitter:url" content="https://rosnovsky.us" />
        <meta name="twitter:title" content={`${meta.title} by Art Rosnovsky`} />
        <meta name="twitter:description" content={`${meta.description}`} />
        <meta name="twitter:image" content={`https://rosnovsky.us/api/og?title=${encodeURIComponent(meta.title)}&date=${encodeURIComponent(new Date(meta.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }))}&readTime=${encodeURIComponent(meta.estimatedReadingTime + ' min read')}`} />
      </Head>
    <ArticleLayout meta={meta} {...props}>
      <PortableText value={post?.body} components={PortableTextComponents} />
      </ArticleLayout></>
  )
}

export async function getStaticPaths() {
  const slugs: string[] = await sanityClient.fetch(pagePathsQuery, { type: 'post' });
  const paths = slugs.map((slug) => ({ params: { slug } }));
  return {
    paths,
    fallback: 'blocking',
  };
}

export async function getStaticProps(context: GetStaticPropsContext<{ slug: string }>) {


  const post: BlogPost = await sanityClient.fetch(postQuery, { slug: context.params?.slug || '' });

  return {
    props: {
      post,
    },
    revalidate: 120
  };
}
