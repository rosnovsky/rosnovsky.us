import { BlogPost } from '..'

export const postsQuery = `{
  alert: allAlert {
    message
    alertLink
    internal
    active
  }
  menuItems: allPage(where: {menuItem: {eq: true}}){
    title
    slug {
      current
    }
  }
  posts: allPost(limit: 6, sort: [ { publishedAt: DESC } ]){
  _id
  title
  body: bodyRaw
  featured
  slug {
    current
  }
  categories {
    title
    slug {
      current
    }
  }
  publishedAt
  socialCard {
    title
    subtitle
  }
  excerpt: excerptRaw
  featured
  mainImage {
    alt
    caption
    asset {
      metadata{
        dimensions {
          aspectRatio
          width
          height
        }
        lqip
      }
      url
    }
  }
}
}`

export const morePostsQuery = (index: number) => `{
  posts: allPost(limit: 6, offset: ${
    6 * index
  }, sort: [ { publishedAt: DESC } ], where: { featured: { neq: true }}){
    _id
    title
    body: bodyRaw
    slug {
      current
    }
    categories {
      title
      slug {
        current
      }
    }
    publishedAt
    socialCard {
      title
      subtitle
    }
    excerpt: excerptRaw
    featured
    mainImage {
      alt
      caption
      asset {
        metadata{
          dimensions {
            aspectRatio
            width
            height
          }
          lqip
        }
        url
      }
    }
  }
}`

export const postQuery = (slug: string) => `{
  alert: allAlert {
    message
    alertLink
    internal
    active
  }
  menuItems: allPage(where: {menuItem: {eq: true }}){
    title
    slug {
      current
    }
  }
  posts: allPost(where: {slug: {current: {eq: "${slug}"}}}) {
    _id
    title
    body: bodyRaw
    socialCard {
      title
      subtitle
    }
    slug {
      current
    }
    categories {
      title
      slug {
        current
      }
    }
    tags {
      value
    }
    publishedAt
    excerpt: excerptRaw
    featured
    mainImage {
      alt
      caption
      asset {
        metadata{
          dimensions {
            aspectRatio
            width
            height
          }
          lqip
        }
        url
      }
    }
  }
}`
