import { FaBusinessTime } from 'react-icons/fa';

export default {
  name: 'publisher',
  title: 'Publisher',
  type: 'document',
  description: 'Book publisher',
  icon: FaBusinessTime,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('You must provide a publisher name'),
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
      name: 'website',
      title: 'Website',
      type: 'url',
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'website',
    },
  },
};
