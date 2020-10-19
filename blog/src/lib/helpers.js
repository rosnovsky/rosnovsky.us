import { format, isFuture } from 'date-fns'
import clientConfig from '../../client-config'
import { getFluidGatsbyImage } from 'gatsby-source-sanity'

export function cn(...args) {
  return args.filter(Boolean).join(' ')
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current
}

export function filterOutDocsPublishedInTheFuture({ publishedAt }) {
  return !isFuture(Date.parse(publishedAt))
}

export function getBlogUrl(publishedAt, slug) {
  return `/blog/${format(
    Date.parse(publishedAt),
    'yyyy/MM/dd'
  )}/${slug.current || slug}/`
}

export function buildImageObj(source = { asset: {} }) {
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id }
  }

  if (source.crop) imageObj.crop = source.crop
  if (source.hotspot) imageObj.hotspot = source.hotspot

  return imageObj
}

export function buildGaleryImageObj(node) {
  const full = getFluidGatsbyImage(
    node.asset._id,
    { maxWidth: 1024 },
    clientConfig.sanity
  )
  const thumb = getFluidGatsbyImage(
    node.asset._id,
    { maxWidth: 360, maxHeight: 360 },
    clientConfig.sanity
  )

  return { thumb, full }
}

export function toPlainText(blocks) {
  if (!blocks) {
    return ''
  }
  return blocks
    .map(block => {
      if (block._type !== 'block' || !block.children) {
        return ''
      }
      return block.children.map(child => child.text).join('')
    })
    .join('\n\n')
}
