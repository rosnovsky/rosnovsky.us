import { SITE } from '../config'

export function getShareUrl(
  slug: string,
) {
  const baseUrl = SITE.website
  const url = `${baseUrl}/blog/${slug}`
  const text = `Check out this post on ${SITE.title}!`

  const shareUrl = `${text} ${url}`

  return shareUrl
}
