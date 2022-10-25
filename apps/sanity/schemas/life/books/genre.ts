import { FaBusinessTime } from 'react-icons/fa';

export default {
  name: 'genre',
  title: 'Genre',
  type: 'document',
  description: 'Book Genre',
  icon: FaBusinessTime,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('You must provide a genre name'),
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
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'slug.current',
    },
  },
};
