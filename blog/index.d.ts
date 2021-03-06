/// <reference types="next" />
/// <reference types="next/types/global" />
/// <reference types="sanity/types" />

import Sanity from '@sanity/types'
declare module 'react-player/file'
declare module 'react-player/youtube'
declare module 'react-tiny-link'

interface BlogAlert {
  message: string
  alertLink?: string
  internal?: boolean
  active: boolean
}

interface Page {
  title: string
  slug?: {
    current
  }
}

export type PostComment = {
  comment: {
    _id?: string
    authorId: string
    sort?: any
    postId: string
    content: string
    commentTimestamp: number
    sentiment?: number
    status?: string
    likes?: number
    length?: number
  }
  author: {
    id: string
    name?: string
    email?: string
    email_verified?: boolean
    picture?: string
    nickname?: string
    family_name: string
    given_name: string
    name: string
    nickname: string
    picture: string
    stats?: {
      comments: number
      pending: number
    }
  }
}

interface BlogPost extends Page {
  _id?: string
  body?: Sanity.Block[]
  categories: [
    {
      title: string
      slug: {
        current: string
      }
    }
  ]
  publishedAt: string
  socialCard?: {
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

interface BlogPage extends Page {
  content?: Sanity.Block[]
  mainImage?: Sanity.ImageAsset
}

interface BlogPageMeta extends BlogPage {
  siteSettings?: Record<any, any>
  coverImage?: string
  coverAlt?: string
  canonicalUrl?: string
  description?: string
  pageType?: string
}

export type CovidData = {
  title: string
  numbers: number
  change: number
}

export type CovidFetchData = {
  date: string
  positive: number
  positiveIncrease: number
  death: number
  deathIncrease: number
  snoDeaths: number
  snoDeathsIncrease: number
}

interface BlogPageOg {
  title: string
  subtitle: string
  category: string
  date: string
  coverImage: string
}
