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
      name: 'author',
      title: 'Author',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description:
        "If book doesn't have a description in ISBNDB, you can add one here",
      validation: (Rule) =>
        Rule.required().error(
          'Description is required since its rendered on the website.'
        ),
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
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'publishedDate',
      title: 'Published Date',
      type: 'string',
      validation: (Rule) => Rule.required(),
      readOnly: () => true,
    },
    {
      name: 'own',
      title: 'Own?',
      type: 'boolean',
    },
    {
      name: 'read',
      title: 'Read?',
      type: 'date',
      description: 'If you read the book, add the date here',
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
      subtitle: 'author',
      media: 'cover',
    },
  },
};
