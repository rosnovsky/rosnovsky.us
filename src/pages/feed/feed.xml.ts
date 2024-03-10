import rss from '@astrojs/rss'
import { getSortedPosts } from '@utils/posts'
import { SITE } from '@config'

export async function GET() {
  const posts = await getSortedPosts()

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: SITE.website,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.publishDate,
      description: post.data.description,
      link: `/blog/${post.slug}/`,
    })),
  })
}
