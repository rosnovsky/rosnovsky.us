import Head from 'next/head'
import {
  InferGetStaticPropsType,
} from 'next';

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  GitHubIcon,
  LinkedInIcon,
} from '@/components/Icons'
import { Resume } from '../components/Resume'
import { Newsletter } from '../components/Newsletter'
import { SocialLink } from '../components/SocialLink'
import { Photos } from '../components/Photos'
import { BlogPostCard } from '@/components/Cards/BlogPostCard'
import { indexPagePostsQuery } from '@/lib/queries';
import sanityClient from '@/lib/sanityClient';
import { BlogPost } from 'index';


export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {

  const { posts } = props;
  return (
    <>
      <Head>
        <title>
          Rosnovsky Park by Art Rosnovsky
        </title>
        <meta
          name="description"
          content="I’m Spencer, a software designer and entrepreneur based in New York City. I’m the founder and CEO of Planetaria, where we develop technologies that empower regular people to explore space on their own terms."
        />
      </Head>
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
              href="https://twitter.com/rosnovsky"
              aria-label="Follow on Twitter"
              icon={TwitterIcon}
            />
            <SocialLink
              href="https://github.com/rosnovsky"
              aria-label="Follow on GitHub"
              icon={GitHubIcon}
            />
            <SocialLink
              href="https://linkedin.com/in/rosnovsky"
              aria-label="Follow on LinkedIn"
              icon={LinkedInIcon}
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
            <Newsletter />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const posts: BlogPost[] = await sanityClient.fetch(indexPagePostsQuery, {
    pagePostsLimit: 10
  })

  return {
    props: {
      posts
    },
    revalidate: 120,
  };
}
