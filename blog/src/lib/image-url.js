import imageUrlBuilder from '@sanity/image-url'

const clientConfig = require('.../../../client-config')

const builder = imageUrlBuilder(clientConfig.sanity)

export function imageUrlFor(source) {
  console.info(process.env)
  return builder.image(source)
}
