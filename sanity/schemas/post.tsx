import { BiPencil } from 'react-icons/bi'
import { Button } from '../components/socialCard';
import {InputComponent} from './comment'

export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: BiPencil,
  groups: [
    {
      name: 'basics',
      title: 'Basics',
      default: true
    },
        {
      name: 'meta',
      title: 'Meta',
    },
    {
      name: 'extras',
      title: 'Extras',
    },
    {
      name: 'comments',
      title: 'Comments',
    }
  ],
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Every post must have a title'),
      group: 'basics'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      group: 'basics',
      validation: (Rule) => Rule.required().error('Please generate a slug'),
    },
    {
      name: 'coverImage',
      title: 'Cover image',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['exif', 'location', 'lqip', 'blurhash', 'palette'],
      },
      group: 'meta',
      validation: (Rule) => Rule.required().error('Cover Images are required'),
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
      group: 'meta',
      validation: (Rule) => Rule.required().error('Every post must belong to at least one category'),
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'date',
      group: 'meta',
      validation: (Rule) => Rule.required().error('Every post must have a publish date'),
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'blockContent',
      group: 'basics',
      validation: (Rule) => Rule.required().error('Every post must have a summary'),
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      group: 'basics',
      validation: (Rule) => Rule.required().error('Every post must have a body'),
    },
    {
      name: 'references',
      title: 'Refernce Posts',
      type: 'array',
      group: 'extras',
      of: [{ type: 'reference', to: { type: 'post' } }],
      validation: (Rule) => Rule.warning("Are you sure you don't want to reference other posts?"),
    },
    {
      name: 'hike',
      title: 'Hike report?',
      description: 'If this post is a hike report, select the hike.',
      type: 'reference',
      group: 'extras',
      to: { type: 'hike' },
    },
    {
      name: 'socialCardImage',
      title: 'Social Card Image',
      type: 'image',
      group: 'basics',
      readOnly: () => true
    },
    {
      name: 'socialCardButton',
      title: 'Social Card Button',
      type: 'boolean',
      group: 'basics',
      inputComponent: Button,
    },
    {
      name: 'comments',
      title: 'Comments',
      type: 'array',
      of: [{ type: 'comment' }],
      inputComponent: InputComponent,
      group: 'comments',
    }
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
