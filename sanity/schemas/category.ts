export default {
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
    {
      name: 'socialCard',
      title: 'Generate Social Card',
      description: 'When ready, click the button below to generate a social card for this post.',
      type: 'socialCard',
      validation: (Rule) => Rule.required().error("Please generate a social card"),
    },
  ],
}
