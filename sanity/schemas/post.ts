import { BiPencil } from 'react-icons/bi'
import metacard from './metacard';

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: BiPencil,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
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
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['exif', 'location', 'lqip', 'blurhash', 'palette'],
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'references',
      title: 'Refernce Posts',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'post' } }],
    },
    {
      name: 'hike',
      title: 'Hike report?',
      description: 'If this post is a hike report, select the hike.',
      type: 'reference',
      to: { type: 'hike' },
    },
        {
      name: 'socialCard',
      title: 'Generate Social Card',
      description: 'When ready, click the button below to generate a social card for this post.',
      type: 'socialCard',
      validation: (Rule) => Rule.required(),

    },
  ],

  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'coverImage',
    },
    prepare(selection) {
      const { publishedAt } = selection;
      return Object.assign({}, selection, {
        subtitle: new Date(publishedAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
      });
    },
  },
};
