// @ts-expect-error
import React from 'react'

import ReactPlayer from 'react-player/youtube'

const Preview = ({ value }: { value: { url: string } }) => {
  const { url } = value
  return (<div className="player-wrapper">
              <ReactPlayer url={url} width="100%" className="react-player" />
            </div>)
}
export default {
  name: 'youtube',
  type: 'object',
  title: 'YouTube Embed',
  fields: [
    {
      name: 'url',
      type: 'url',
      title: 'YouTube video URL'
    }
  ],
  preview: {
    select: {
    url: 'url'
    },
    component: Preview
  }
}
