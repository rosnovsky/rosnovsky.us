export default {
  name: 'hike',
  title: 'Hike',
  type: 'document',
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
      hikeDate: 'hikeDate',
      media: 'coverImage',
    },
    prepare(selection) {
      const { hikeDate } = selection;
      return Object.assign({}, selection, {
        subtitle: new Date(hikeDate).toLocaleDateString(),
      });
    },
  },
};
