import { PortableText } from '@portabletext/react';

import type { BlogPost } from 'index'
import sanityClient from '@/lib/sanityClient'
import { pagePathsQuery, postQuery } from '@/lib/queries'
import { ArticleLayout } from '@/components/ArticleLayout'
import { PortableTextComponents } from '@/lib/portableText';
import { GetStaticPropsContext, InferGetStaticPropsType } from 'next/types';

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
    <ArticleLayout meta={meta} {...props}>
      <PortableText value={post?.body} components={PortableTextComponents} />
    </ArticleLayout>
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
