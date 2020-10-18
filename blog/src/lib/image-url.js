import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET
})

export function imageUrlFor(source) {
  console.info(process.env)
  return builder.image(source)
}
