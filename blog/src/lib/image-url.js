import imageUrlBuilder from '@sanity/image-url'
import sanityConfig from '../../client-config'

const builder = imageUrlBuilder(sanityConfig.sanity)

export function imageUrlFor(source) {
  return builder.image(source)
}
