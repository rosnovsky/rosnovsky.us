import { FaBook } from 'react-icons/fa';
import { Button } from '../../../components/fetchBook';
export default {
  name: 'book',
  title: 'Book',
  type: 'document',
  icon: FaBook,
  fields: [
    {
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'fetchBook',
      title: 'Fetch Book',
      type: 'boolean',
      inputComponent: Button,
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: () => true,
    },
    {
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: () => true,
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
      readOnly: () => true,
    },
    {
      name: 'cover',
      title: 'Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      readOnly: () => true,
    },
    {
      name: 'pages',
      title: 'Pages',
      type: 'number',
      validation: (Rule) => Rule.required(),
      readOnly: () => true,
    },
    {
      name: 'publisher',
      title: 'Publisher',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: () => true,
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: () => true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author',
      media: 'cover',
    },
  },
};
