import { PortableText } from '@portabletext/react';

import type { BlogPost } from 'index'
import sanityClient from '@/lib/sanityClient'
import { pagePathsQuery, postQuery } from '@/lib/queries'
import { ArticleLayout } from '@/components/ArticleLayout'
import { PortableTextComponents } from '@/lib/portableText';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next/types';
import Head from 'next/head';
import { Card } from '@/components/Card';
import { formatDate } from '@/lib/helpers';

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
          content={`https://rosnovsky.us/api/og?title=${encodeURIComponent(meta.title)}&summary=${encodeURIComponent(meta.description).slice(0, 200)}&date=${encodeURIComponent(new Date(meta.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }))}&readTime=${encodeURIComponent(meta.estimatedReadingTime + ' min read')}`}
        />
        <meta property="og:url" content="https://rosnovsky.us" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${meta.title} by Art Rosnovsky`} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:image" content={`https://rosnovsky.us/api/og?title=${encodeURIComponent(meta.title)}&summary=${encodeURIComponent(meta.description).slice(0, 200)}&date=${encodeURIComponent(new Date(meta.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }))}&readTime=${encodeURIComponent(meta.estimatedReadingTime + ' min read')}`} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="rosnovsky.us" />
        <meta property="twitter:url" content="https://rosnovsky.us" />
        <meta name="twitter:title" content={`${meta.title} by Art Rosnovsky`} />
        <meta name="twitter:description" content={`${meta.description}`} />
        <meta name="twitter:image" content={`https://rosnovsky.us/api/og?title=${encodeURIComponent(meta.title)}&summary=${encodeURIComponent(meta.description).slice(0, 200)}&date=${encodeURIComponent(new Date(meta.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }))}&readTime=${encodeURIComponent(meta.estimatedReadingTime + ' min read')}`} />
      </Head>
    <ArticleLayout meta={meta} {...props}>
      <PortableText value={post.body} components={PortableTextComponents} />
      {post.references && post.references.length > 0 && (
        <div className="mt-0">
          <h2 className="text-xl font-bold mb-4">Related Posts</h2>
          <div
          role="list"
          className="grid grid-cols-2 md:gap-x-12 gap-x-4 gap-y-16 sm:grid-cols-2 mt-10"
        >
            {post.references.map((reference) => (
              <Card className="flex flex-row bg-gray-50 dark:bg-gray-800/50 p-5 rounded-xl">  
                    <Card.Link href={`/blog/${reference.slug.current}`}> {reference.title}</Card.Link>
                <Card.Description>
                  <div className="text-gray-500 dark:text-gray-400 text-sm font-mono">{formatDate(reference.publishedAt)} &middot; {reference.estimatedReadingTime} min read</div>
                  <div className='text-sm'><PortableText value={reference.summary} /></div></Card.Description>
                </Card>
            ))}
          </div>
        </div>
      )}
      </ArticleLayout>
    </>
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
