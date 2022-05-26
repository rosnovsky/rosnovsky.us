import { GiWalk } from 'react-icons/gi';

export default {
  name: 'hike',
  title: 'Hike',
  type: 'document',
  icon: GiWalk,
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
        metadata: ['exif', 'location', 'lqip', 'blurhash', 'palette'],
      },
    },
    {
      name: 'report',
      title: 'Hike Report',
      type: 'reference',
      to: { type: 'post' },
    },
    {
      name: 'hikeDate',
      title: 'Hike Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'trail',
      title: 'Trail Link',
      description: 'A link to the trail on the WTA / Alltrails website',
      type: 'url',
    },
    { 
      name: 'length',
      title: 'Total distance',
      description: 'In miles',
      type: 'number',
    },
    {
      name: 'difficulty',
      title: 'Difficulty',
      type: 'string',
      options: {
        list: [
          { title: 'Easy', value: 'Easy' },
          { title: 'Moderate', value: 'Moderate' },
          { title: 'Hard', value: 'Hard' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'elevationGain',
      title: 'Elevation Gain',
      description: 'In feet',
      type: 'number',
    },
    {
      name: 'location',
      type: 'geopoint',
      title: 'Location',
      validation: (Rule) => Rule.required(),
    },
  ],

  preview: {
    select: {
      title: 'title',
      date: 'hikeDate',
      media: 'coverImage',
    },
    prepare(selection) {
      const { title, date, media } = selection;
      return {
        title,
        subtitle: new Date(date).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        media,
      };
    }
  },
    orderings: [
    {
      title: 'New hikes first',
      name: 'hikeDateDesc',
      by: [
        {field: 'hikeDate', direction: 'desc'}
      ]
    },
    {
      title: 'Old hikes first',
      name: 'hikeDateAsc',
      by: [
        {field: 'hikeDate', direction: 'asc'}
      ]
    },
  ]
};
