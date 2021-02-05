// <reference types="next" />
// <reference types="next/types/global" />
// <reference types="sanity/types" />

import Sanity from '@sanity/types'
declare module 'react-player/file'
declare module 'react-player/youtube'
declare module 'react-tiny-link'

export type BlogAlert = {
  message: string
  alertLink: string
  internal: boolean
  active: boolean
}

export type MenuItem = {
  title: string
  slug: {
    current
  }
}

export type BlogProps = {
  posts: Post[]
  alert: BlogAlert[]
  preview: boolean
  menuItems: MenuItem[]
  comments: PostComment[]
}

export type PostComment = {
  _id: string
  author: {
    id: string
    name?: string
    email: string
    picture: string
    nickname: string
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
  length: number
}

export type BlogPost = {
  _id?: string
  title: string
  body?: Sanity.Block[]
  slug: {
    current: string
  }
  categories: [
    {
      title: string
      slug: {
        current: string
      }
    }
  ]
  publishedAt: string
  socialCard: {
    title: string
    subtitle: string
  }
  excerpt: Sanity.Block[]
  featured?: boolean
  mainImage?: {
    alt: string
    caption: string
    asset: {
      metadata: Sanity.ImageMetadata
      url: string
    }
  }
  socialCard: {
    title: string
    subtitle: string
  }
  ogImage?: {
    url: string
  }
  preview?: boolean
  comments?: PostComment
}

export type BlogPage = {
  title: string
  slug: {
    current: string
  }
}
