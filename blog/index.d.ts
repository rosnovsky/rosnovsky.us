import Sanity from '@sanity/types'
declare module 'react-player/file'
declare module 'react-player/youtube'
declare module 'react-tiny-link'

type Post = {
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  socialCard: {
    title: string
    subtitle: string
  }
  mainImage?: Record<any, any>
  categories: { title: string, slug: string}[]
  excerpt?: Sanity.Block[]
  ogImage?: {
    url: string
  }
  body?: Sanity.Block[]
  preview?: boolean
}

type Page = {
  title: string
  slug: {
    current: string
  }
}
