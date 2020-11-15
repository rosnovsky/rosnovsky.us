export default {
  name: 'photoGallery',
  type: 'object',
  fields: [
    { name: 'galleryTitle', type: 'string' },
    { name: 'images', type: 'array', of: [{ type: 'mainImage' }] }
  ]
}
