export default {
  title: 'Link Card',
  name: 'linkCard',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true, scheme: ['https'] })
    },
    {
      title: 'Title',
      name: 'blank',
      type: 'string'
    }
  ]
}
