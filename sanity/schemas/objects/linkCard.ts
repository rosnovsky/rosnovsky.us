import React, { useState, useEffect } from 'react'
import LinkCard from '../../src/linkCard'

export default {
  title: 'Link Card',
  name: 'linkCard',
  type: 'object',
  preview: {
    select: {
      url: 'href'
    },
    component: LinkCard
  },
  fields: [
    {
      title: 'URL',
      name: 'href',
      type: 'url',
      validation: Rule => Rule.uri({ allowRelative: true, scheme: ['https'] })
    },
    {
      title: 'Title',
      name: 'title',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Description',
      name: 'description',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Author',
      name: 'author',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Publisher',
      name: 'publisher',
      type: 'string',
      readOnly: true
    },
    {
      title: 'Logo URL',
      name: 'logo',
      type: 'url',
      readOnly: true
    },
    {
      title: 'Image URL',
      name: 'imageUrl',
      type: 'url',
      readOnly: true
    },
    {
      title: 'Publication Date',
      name: 'publicationDate',
      type: 'datetime',
      options: {
        dateFormat: 'MMM Do, YYYY'
      },
      readOnly: true
    }
  ]
}
