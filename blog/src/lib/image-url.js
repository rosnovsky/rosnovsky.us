import imageUrlBuilder from '@sanity/image-url'
import sanityConfig from '../../client-config'

const builder = imageUrlBuilder(sanityConfig.sanity)

export function imageUrlFor(source) {
  console.info(process.env)
  return builder.image(source)
}
