import React from 'react'

import Metacard from '../components/Metacard'

const Preview = ({ value }: { value: { url: string, media: any, size: any } }) => {
  const { url, media, size } = value
  return <Metacard url={url} media={media} size={size} />
}
export default {
  name: 'metacard',
  type: 'object',
  title: 'Metacard',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'Website URL',
    },
    {
      name: 'size',
      type: 'string',
      title: 'Card Size',
      options: {
        list: ['small', 'normal', 'large'],
      }
    },
    {
      name: 'media',
      type: 'string',
      title: "Media Type",
      options: {
        list: ['image', 'logo'],
      }

    }
  ],
  preview: {
    select: {
      url: 'url',
      size: 'size',
      media: 'media',
    },
    component: Preview
  }
}
