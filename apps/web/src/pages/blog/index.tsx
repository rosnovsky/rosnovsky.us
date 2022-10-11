import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/formatDate'
import type { BlogPost } from 'index'
import sanityClient from '@/lib/sanityClient'
import { indexPagePostsQuery, totalPostsCountQuery } from '@/lib/queries'
import { InferGetStaticPropsType } from 'next/types'

function BlogPost({ post }: { post: BlogPost }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/blog/${post.slug.current}`}>
          {post.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={post.publishedAt}
          className="md:hidden"
          decorate
        >
          {formatDate(post.publishedAt)} ⏲️ {post.estimatedReadingTime} min read
        </Card.Eyebrow>
        <Card.Description>{post.summaryRaw}</Card.Description>
        <Card.Cta>Read post</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={post.publish}
        className="mt-1 hidden md:block"
      >
        {formatDate(post.publishedAt)}<p>{post.estimatedReadingTime} min read</p>
      </Card.Eyebrow>
    </article>
  )
}

export default function BlogIndex(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { posts, totalPostsCount } = props
  return (
    <>
      <Head>
        <title>Rosnovsky Park Blog - Art Rosnovsky</title>
        <meta
          name="description"
          content="All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order."
        />
      </Head>
      <SimpleLayout
        title="All things web development, hiking, camping, books, and more."
        intro={`My first blog on Livejournal was established in 2003. I've started this one in 2019, posting ${totalPostsCount || "a bunch of"} blog posts so far.`}
      >
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {posts?.map((post) => (
              <BlogPost key={post.slug.current} post={post} />
            ))}
          </div>
        </div>
      </SimpleLayout>
    </>
  )
}

export async function getStaticProps() {
  const posts: BlogPost[] = await sanityClient.fetch(indexPagePostsQuery, { pagePostsLimit: 20 })
  const totalPostsCount: number = await sanityClient.fetch(totalPostsCountQuery)

  return {
    props: {
      posts,
      totalPostsCount,
    },
    revalidate: 120,
  }
}
