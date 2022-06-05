import { RiPagesLine } from 'react-icons/ri';
import { Button } from '../components/socialCard';

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
      name: 'socialCardImage',
      title: 'Social Card Image',
      type: 'image',
      readOnly: () => true,
    },
    {
      name: 'socialCardButton',
      title: 'Social Card Button',
      type: 'boolean',
      inputComponent: Button,
    },
  ],

  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
    },
  },
};
