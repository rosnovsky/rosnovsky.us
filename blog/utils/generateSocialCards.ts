import { BlogPost } from '..'
import { format } from 'date-fns'

export async function GenerateSocialCards(posts: BlogPost[]) {
  posts.map((post) => {
    const { socialCard, publishedAt, categories, mainImage, title } = post
    const socialTitle = socialCard?.title || title
    const socialSubtitle = socialCard?.subtitle || 'Read More...'
    const fetchUrl = fetch(
      `https://rosnovsky.us/api/generateOgImage?title=${encodeURIComponent(
        socialTitle
      )}&date=${format(Date.parse(publishedAt), 'dd MMM yyyy')}&category=${
        categories[0].title
      }&subtitle=${encodeURIComponent(
        socialSubtitle
      )}&coverImage=${encodeURIComponent(mainImage?.asset.url)}`,
      {
        mode: 'cors',
      }
    )
    const url = fetchUrl
    return url
  })
}
