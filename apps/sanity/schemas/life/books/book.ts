import { FaBook } from 'react-icons/fa';
import { Button } from '../../../components/fetchBook';
export default {
  name: 'book',
  title: 'Book',
  type: 'document',
  description: 'A book I have in my library',
  icon: FaBook,
  fields: [
    {
      name: 'isbn',
      title: 'ISBN',
      type: 'string',
      description: 'The ISBN of the book',
      validation: (Rule) =>
        Rule.required().error(
          'You must provide an ISBN and then feche the book using the button below'
        ),
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
    },
    {
      name: 'slug',
      title:  'slug',
      type: 'slug',
      options: {
	source: 'title'
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'cover',
      title: 'Cover',
      type: 'image',
      description:
        "If book doesn't have a cover image in ISBNDB, you can add one here",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'pages',
      title: 'Pages',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publisher',
      title: 'Publisher',
      type: 'reference',
      to: [{ type: 'publisher' }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'string',
      validation: (Rule) => Rule.required(),
      // readOnly: () => true,
    },
    {
      name: 'genre',
      title: 'Genre',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'genre' }] }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'own',
      title: 'Own?',
      type: 'boolean',
      options: {
        layout: 'checkbox',
        default: true,
      },
    },
    {
      name: 'status',
      title: 'Kowalski, staus',
      type: 'string',
      options: {
        list: [
          { title: 'To Read', value: 'to read' },
          { title: 'Reading', value: 'reading' },
          { title: 'Read', value: 'read' },
          { title: 'Abandoned', value: 'abandoned' },
        ],
      },
    },
    {
      name: 'read',
      title: 'When did you finish it?',
      type: 'date',
      hidden: ({ parent, value }) => !value && parent?.status !== 'Read',
    },
    {
      name: 'review',
      title: 'Book review',
      type: 'array',
      of: [
        {
          type: 'block',
        },
      ],
    },
    {
      title: 'Rating',
      name: 'rating',
      type: 'rating',
      description: 'Apply a rating out of 5 stars',
      options: {
        stars: 5,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'author.name',
      media: 'cover',
    },
  },
};
