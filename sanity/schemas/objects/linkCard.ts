export default {
  title: 'Link Card',
  name: 'linkCard',
  type: 'object',
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true, scheme: ['http','https'] })
    },
    {
      title: 'Internal?',
      name: 'internalCard',
      type: 'boolean'
    }
  ],
  preview: {
    select: {
      url: 'href'
    },
  },
}
