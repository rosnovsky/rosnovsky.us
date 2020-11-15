  interface Post {
  id: string
  publishedAt: string
  categories: {
    _id: string
    title: string
    slug: {
      current: string
    }
  }
  mainImage: {
    SanityImage: Record<string, any>
    alt: string
  }
  title: string
  slug: {
    current: string
  }
  featured: boolean
  _rawExcerpt: Record<string, any>[]
  _rawBody: Record<string, any>[]
  authors: {
    _key: string
    author: {
      image: {
        crop: {
          _key: string
          _type: string
          top: number
          bottom: number
          left: number
          right: number
        }
        hotspot: {
          _key: string
          _type: string
          x: number
          y: number
          height: number
          width: number
        }
        asset: {
          _id: string
        }
      }
      name: string
    }
  }
}
