import { FaPersonBooth } from 'react-icons/fa';

export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  description: 'Book author',
  icon: FaPersonBooth,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().error('You must provide an author name'),
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
