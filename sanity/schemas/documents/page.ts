export default {
  name: 'page',
  type: 'document',
  title: 'Pages',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
      description: 'Titles should be catchy, descriptive, and not too long'
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      description: 'Duh',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'menuItem',
      type: 'boolean',
      title: "Menu Item?",
      description: "Should this item show up in the menu?"
    },
    {
      name: 'mainImage',
      type: 'mainImage',
      title: 'Main image'
    },
    {
      name: 'socialCard',
      type: 'socialCard',
      title: 'Social Card Information'
    },
    {
      name: 'excerpt',
      type: 'excerptPortableText',
      title: 'Excerpt',
      description:
        'This ends up on summary pages, on Google, when people share your post in social media.'
    },
    {
      name: 'body',
      type: 'bodyPortableText',
      title: 'Body'
    },
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug',
      media: 'mainImage'
    },
    prepare({ title = 'No title', media }) {
      return {
        title,
        media,
      }
    }
  }
}
