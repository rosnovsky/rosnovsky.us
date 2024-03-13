import type { Site, SocialObjects, StackObjects } from './types'
import typescript from './images/logos/icons/typescript.svg'
import react from './images/logos/icons/react.svg'
import tailwind from './images/logos/icons/tailwindcss.png'

export const SITE: Site = {
  website: 'https://rosnovsky.us', // replace this with your deployed domain
  author: 'Art Rosnovsky',
  description:
    "Blog by Art Rosnovsky, a software engineer, about technology, hiking, books, movies, and other things.",
  title: 'Rosnovsky Park',
  ogImage: 'jane-og.png',
  postsPerPage: 9,
  projectsPerPage: 3,
}

export const SOCIALS: SocialObjects = [
  {
    name: 'mail',
    href: 'mailto:job@rosnovsky.us',
    label: 'Email me',
    ariaLabel: 'Send email',
    showInHero: false,
  },
  {
    name: 'linkedin',
    href: 'https://www.linkedin.com/in/rosnovsky/',
    label: 'LinkedIn',
    ariaLabel: 'Follow on LinkedIn',
    showInHero: true,
  },
  {
    name: 'github',
    href: 'https://github.com/rosnovsky',
    label: 'Github',
    ariaLabel: 'Follow on Github',
    showInHero: true,
  },
  {
    name: 'mastodon',
    href: 'https://lounge.town/@rosnovsky',
    label: 'Mastodon',
    ariaLabel: 'Follow on Mastodon',
    showInHero: true,
  },
  {
    name: "rss",
    href: "/feed/feed.xml",
    label: "RSS",
    ariaLabel: "RSS Feed",
    showInHero: true,
  }
]

export const STACK: StackObjects = [
  {
    name: 'Typescript',
    experience: '6+ years',
    logo: typescript,
  },
  {
    name: 'React',
    experience: '5+ years',
    logo: react,
  },
  {
    name: 'Tailwind',
    experience: '5+ years',
    logo: tailwind,
  },
]
