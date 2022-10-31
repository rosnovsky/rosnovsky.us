import sanityClient from '@/lib/sanityClient'
import { BlogPost } from 'index'
import {promises as fs} from 'node:fs'
import RSS from 'rss'
import { toHTML } from '@portabletext/to-html'

export async function generateRss() {
  const feed = new RSS({
    title: 'Art Rosnovsky',
    site_url: 'https://rosnovsky.us',
    feed_url: 'https://rosnovsky.us/feed/feed.xml',
    generator: 'Next.js using Feed for Node.js',
    description: 'Art Rosnovsky\'s blog and library.',
    copyright: `© 2003 - ${new Date().getFullYear()} Art Rosnovsky`,
    language: 'en',
    webMaster: 'Art Rosnovsky',
    managingEditor: 'Art Rosnovsky',
    image_url: 'https://rosnovsky.us/images/portrait.jpg',
  })

  console.warn('Fetching posts for RSS feed')

  const posts: BlogPost[] = await sanityClient.fetch(`*[_type == "post"] | order(publishedAt desc) {
      title,
      slug,
      summary,
      "cover": cover.asset->url,
      body[]{
        ...,
        markDefs[]{
          _type == "link" => {
            ...,
          internal->{
            title,
            _type,
            slug
          }
          }
        },
        _type == "video" => {
          title,
          videoFile {
            asset->{
              ...,
              "url": "https://stream.mux.com/" + playbackId
            }
          }
        },
        asset->{...}
      },
      publishedAt,
      "categories": categories[]->title,
      "summaryRaw": pt::text(summary),
      "numberOfCharacters": length(pt::text(body)),
      "estimatedWordCount": round(length(pt::text(body)) / 5),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
    }
  `)

  console.warn('Generating RSS feed')
  await Promise.all(
    posts.map(async (post) => {
      const actualPost = await post

      feed.item({
        title: actualPost.title,
        url:
          'https://rosnovsky.us/blog/' + actualPost.slug.current,
        date: new Date(actualPost.publishedAt),
        description: toHTML(actualPost.body),
        author: 'Art Rosnovsky',
        categories: [...actualPost.categories.map((category) => category.title)],
      })
    })
  )

  console.warn('Writing RSS feed')

  await fs.writeFile('./public/feed/feed.xml', feed.xml({ indent: true })).then((res) => {
    console.warn('RSS feed written', res)
  })
}
