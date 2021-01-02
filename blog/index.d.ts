declare module 'react-player/file'
declare module 'react-player/youtube'
declare module 'react-tiny-link'

type Post = {
  title: string
  slug: {
    current: string
  }
  publishedAt: string
  mainImage?: Record<any, any>[]
  categories: { title: string, slug: string}[]
  excerpt?: Record<any, any>[]
  ogImage?: {
    url: string
  }
  body?: Record<any, any>[]
  preview?: boolean
}

type Page = {
  title: string
  slug: {
    current: string
  }
}
