import { Suspense } from 'react';
import { InferGetStaticPropsType } from 'next';

import { GitHubIcon, MastodonIcon } from '@/components/Icons'
import { RssIcon } from '@heroicons/react/20/solid';
import { Container, SocialLink, Newsletter, Photos, Meta, Resume } from '@/components'
import { BlogPostCard, CurrentBook } from '@/components/Cards'
import { SanityClient, blogPostsQuery, currentBookQuery } from '@/lib/Sanity';
import { generateRss, generateSitemap } from '@/scripts';
import { BlogPost, Book } from 'index';

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {

  const { posts, currentBook } = props;
  return (
    <>
      <Meta title="Art Rosnovsky" description="I'm Art, software engineer living in the Pacific Norhtwest. I love coding, hiking, and reading." slug={{ "current": '/' }} type="website" />
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
            Software engineer, hiker, and avid reader.
          </h1>
          <p className="mt-6 text-base text-zinc-600 dark:text-zinc-400">
            I&apos; m Art, and we need to talk. Or maybe we don&apos;t. In any case, I write about web development, hiking, and random hobbies I pick up every now and then.
          </p>
          <div className="mt-6 flex gap-6">
            <SocialLink
              href="https://rosnovsky.us/feed/feed.xml"
              aria-label="Subscribe to RSS"
              icon={RssIcon}
            />
            <SocialLink
              href="https://github.com/rosnovsky"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://lounge.town/@rosnovsky"
              rel="me"
              aria-label="Follow on Mastodon"
              icon={MastodonIcon}
            />
          </div>
        </div>
      </Container>
      <Photos />
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {posts?.map((post) => (
              <BlogPostCard key={post.slug.current} post={post} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Suspense fallback={<div>Loading...</div>}>
              <Newsletter />
            </Suspense>
            <Resume />
            {currentBook ? <CurrentBook currentBook={currentBook} /> : null}
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  if (process.env.NODE_ENV === 'production') {
    await generateRss();
    await generateSitemap();
  }

  const posts: BlogPost[] = await SanityClient.fetch(blogPostsQuery, {
    startLimit: 0, endLimit: 10
  })

  const currentBook: Book = await SanityClient.fetch(currentBookQuery);

  return {
    props: {
      posts,
      currentBook
    },
    revalidate: 120,
  };
}
