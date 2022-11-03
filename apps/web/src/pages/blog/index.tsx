import Head from 'next/head'

import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { formatDate } from '@/lib/helpers'
import type { BlogPost } from 'index'
import sanityClient from '@/lib/sanityClient'
import { blogPostsQuery, totalPostsCountQuery } from '@/lib/queries'
import { InferGetStaticPropsType } from 'next/types'
import Search from '@/components/Search'
import useSWR from 'swr'

import { InView } from 'react-intersection-observer';
import { useEffect, useState } from 'react'
import { fetcher } from '@/lib/libraryHelpers'

const stopwatch = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" stroke="rgb(20 184 166)" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" fill="none" color="rgb(20 184 166)"> <circle cx="12" cy="13" r="8" /> <path d="M12 9L12 13M18 7L20 5M15 2L9 2" /></svg>


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
          {formatDate(post.publishedAt)} {stopwatch} {post.estimatedReadingTime} min read
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
  const [pageNumber, setPageNumber] = useState(1);
  const [posts, setPosts] = useState(props.posts);

  const { data, error } = useSWR(
    { pageNumber, query: blogPostsQuery },
    fetcher
  );

  const { totalPostsCount } = props

  useEffect(() => {
    if (data) {
      setPosts([...posts, ...data]);
    }
  }, [pageNumber, data]);

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
            <Search />
            {posts?.map((post) => (
              <BlogPost key={post.slug.current} post={post} />
            ))}
          </div>
          <InView className="w-full mx-auto text-white" as="div" onChange={(inView) => {
            if (inView) {
              setPageNumber(pageNumber + 1)
            }
          }}>
          </InView>
        </div>
      </SimpleLayout>

    </>
  )
}

export async function getStaticProps() {
  const posts: BlogPost[] = await sanityClient.fetch(blogPostsQuery, { startLimit: 0, endLimit: 20 })
  const totalPostsCount: number = await sanityClient.fetch(totalPostsCountQuery)

  return {
    props: {
      posts,
      totalPostsCount,
    },
    revalidate: 120,
  }
}
