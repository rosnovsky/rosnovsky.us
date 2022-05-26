import {BsFillPersonFill} from 'react-icons/bs';

export default {
  name: 'person',
  title: 'Person',
  type: 'document',
  icon: BsFillPersonFill,
  fields: [
    {
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'birthday',
      title: 'Birthday',
      type: 'date',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: doc => `${doc.firstName}-${doc.lastName}`,
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
    {
      name: 'location',
      title: 'Location',
      type: 'reference',
      to: { type: 'city' },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'job',
      title: 'Job',
      type: 'reference',
      to: { type: 'company' },
    },
    {
      name: 'significantOther',
      title: 'Significant Other',
      type: 'reference',
      to: { type: 'person' },
    },
    {
      name: 'friends',
      title: 'Friends',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'person' } }],
    },
    {
      name: 'deceased',
      title: 'Deceased',
      type: 'boolean',
      initialValue: false,
      options: {
        layout: 'checkbox',
      }
    },
    
  ],

  preview: {
    select: {
      title: 'firstName',
      location: 'location.title',
      media: 'photo',
    },
    prepare(selection) {
      const { location } = selection;
      return Object.assign({}, selection, {
        subtitle: location,
      });
    },
  },
};
