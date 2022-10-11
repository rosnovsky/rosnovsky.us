export default {
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  __experimental_actions: [/* "create", "delete", */ 'update', 'publish'],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('Every post must have a title'),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
    {
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'tags',
    },
    {
      name: 'socialImage',
      title: 'Social image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['exif', 'location', 'lqip', 'blurhash', 'palette'],
      },
    },
    {
      name: 'socialStamp',
      title: 'Social stamp',
      type: 'image',
    },
    {
      name: 'about',
      title: 'About Me',
      type: 'blockContent',
    },
  ],
};
