export default {
  name: 'company',
  title: 'Company',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: { type: 'city' },
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'name',
      location: 'location.name',
    },
  },
};