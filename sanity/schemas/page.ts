import {RiPagesLine} from 'react-icons/ri';

export default {
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: RiPagesLine,
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
      },
      fields: [
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          options: { isHighlighted: true },
        },
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          options: { isHighlighted: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
};
