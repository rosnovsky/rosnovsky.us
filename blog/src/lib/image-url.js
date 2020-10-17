import imageUrlBuilder from '@sanity/image-url'
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})
const clientConfig = require('.../../../client-config')

const builder = imageUrlBuilder(clientConfig.sanity)

export function imageUrlFor(source) {
  console.info(process.env)
  return builder.image(source)
}
