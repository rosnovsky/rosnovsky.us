import Author from './author'

type PostType = {
  slug: {
    current: string
  }
  title: string
  publishedAt: string
  mainImage: string
  author: Author
  categories: { title: string, slug: string}[]
  excerpt: Record<any, any>[]
  ogImage: {
    url: string
  }
  body: Record<any, any>[]
  preview: boolean
}

export default PostType
