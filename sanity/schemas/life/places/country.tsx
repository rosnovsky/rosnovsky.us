import { GoGlobe } from 'react-icons/go'
import React from 'react'

export default {
  name: 'country',
  title: 'Country',
  type: 'document',
  icon: GoGlobe,
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'code',
      title: 'Country code',
      type: 'string',
      validation: (Rule) => Rule.required().max(2),
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
  ],

  preview: {
    select: {
      title: 'name',
      code: 'code',
    },
    prepare({ title, code }) {
      const emoji = String.fromCodePoint(...[...code.toUpperCase()].map(x => 0x1f1a5 + x.charCodeAt(0)))
      return {
        title,
        media: <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
          };
        },
  },
};
