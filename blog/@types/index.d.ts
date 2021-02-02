// <reference types="next" />
// <reference types="next/types/global" />
// <reference types="sanity/types" />

import Sanity from '@sanity/types'
declare module 'react-player/file'
declare module 'react-player/youtube'
declare module 'react-tiny-link'

export type PostComment = {
  author: {
    id: string
    profile: {
      name?: string
      email: string
    }
    stats: {
      comments: number
      pending: number
    }
  }
  postId: string
  content: string
  commentTimestamp: Date
  sentiment: number
  status: string
  likes: number
  savedTimestamp: Date
}

export type Post = {
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
  categories: { title: string; slug: string }[]
  excerpt?: Sanity.Block[]
  ogImage?: {
    url: string
  }
  body?: Sanity.Block[]
  preview?: boolean
}

export type Page = {
  title: string
  slug: {
    current: string
  }
}
