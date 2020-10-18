import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder({
  projectId: 'n3o7a5dl',
  dataset: 'production'
})

export function imageUrlFor(source) {
  console.info(process.env)
  return builder.image(source)
}
