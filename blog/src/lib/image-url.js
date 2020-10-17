const clientConfig = require('../../client-config')
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(clientConfig.sanity)

export function imageUrlFor(source) {
  console.info(builder.image(source))
  return builder.image(source)
}
