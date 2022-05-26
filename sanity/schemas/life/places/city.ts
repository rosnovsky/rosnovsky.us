export default {
  name: 'city',
  title: 'City',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
        {
      name: 'country',
      title: 'Country',
      type: 'reference',
      to: { type: 'country' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      title: 'Location',
      type: 'geopoint',
      validation: (Rule) => Rule.required(),
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
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
        metadata: ['exif', 'location', 'lqip', 'blurhash', 'palette'],
      },
    },
  ],

  preview: {
    select: {
      title: 'name',
      country: 'country.name',
      media: 'photo',
    },
    prepare(selection) {
      const { country } = selection;
      return Object.assign({}, selection, {
        subtitle: country
      });
    },
  },
};
