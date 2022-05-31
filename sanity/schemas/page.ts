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
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },
    {
      name: 'socialCard',
      title: 'Generate Social Card',
      description: 'When ready, click the button below to generate a social card for this post.',
      type: 'socialCard',
      validation: (Rule) => Rule.required().error("Please generate a social card"),
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
};
