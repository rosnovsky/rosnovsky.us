import Image from 'next/future/image'
import Head from 'next/head'
import Link from 'next/link'
import clsx from 'clsx'

import { Container } from '@/components/Container'
import {
  TwitterIcon,
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
} from '@/components/Icons'
import portraitImage from '@/images/portrait.jpg'
import { Page } from 'index'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/lib/portableText'
import { Prose } from '@/components/Prose'
import sanityClient from '@/lib/sanityClient'
import { InferGetStaticPropsType } from 'next'
import { MastodonIcon } from '@/components/Icons/SocialIcons'
import { Meta } from '@/components/Meta'

function SocialLink({ className, href, children, icon: Icon }) {
  return (
    <li className={clsx(className, 'flex')}>
      <Link
        href={href}
        className="group flex text-sm font-medium text-zinc-800 transition hover:text-teal-500 dark:text-zinc-200 dark:hover:text-teal-500"
      >
        <Icon className="h-6 w-6 flex-none fill-zinc-500 transition group-hover:fill-teal-500" />
        <span className="ml-4">{children}</span>
      </Link>
    </li>
  )
}

export default function About(props: InferGetStaticPropsType<typeof getStaticProps>) {
  const { page } = props
  return (
    <>
      <Meta title={page.title} description={page.description} slug={{ "current": '/about' }} type="website" />
      <Container className="mt-16 sm:mt-32">
        <div className="grid grid-cols-1 gap-y-16 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-y-12">
          <div className="lg:pl-20">
            <div className="max-w-xs px-2.5 lg:max-w-none">
              <Image
                src={portraitImage}
                width="400"
                height={300}
                alt=""
                sizes="(min-width: 1024px) 32rem, 20rem"
                className="aspect-square rotate-3 rounded-2xl bg-zinc-100 object-cover dark:bg-zinc-800"
              />
            </div>
          </div>
          <div className="lg:order-first lg:row-span-2">
            <h1 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
              Hey, my name is Art.
            </h1>
            <div className="mt-6 space-y-7 text-base text-zinc-700 dark:text-zinc-400">
              <Prose className=""><PortableText value={page?.body} components={PortableTextComponents} /></Prose>
            </div>
          </div>
          <div className="lg:pl-20">
            <ul role="list">
              <SocialLink className="" href="https://rosnovsky.us/feed/feed.xml" icon={TwitterIcon}>
                Subscribe to RSS
              </SocialLink>
              <SocialLink href="https://lounge.town/rosnovsky" icon={MastodonIcon} className="mt-4">
                Follow on Mastodon
              </SocialLink>
              <SocialLink href="https://github.com/rosnovsky" icon={GitHubIcon} className="mt-4">
                Follow on GitHub
              </SocialLink>
              <SocialLink href="https://linkedin.com/in/rosnovsky" icon={LinkedInIcon} className="mt-4">
                Follow on LinkedIn
              </SocialLink>
              <SocialLink
                href="mailto:artem@rosnovsky.us"
                icon={MailIcon}
                className="mt-8 border-t border-zinc-100 pt-8 dark:border-zinc-700/40"
              >
                artem@rosnovsky.us
              </SocialLink>
            </ul>
          </div>
        </div>
      </Container>
    </>
  )
}

export async function getStaticProps() {
  const page: Page = await sanityClient.fetch(`*[_type == "page" && slug.current == "about"][0]{...}`)

  return {
    props: {
      page
    },
    revalidate: 120,
  };
}
