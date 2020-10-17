import React from 'react'
import Figure from './Figure'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'

import style from '../styles/custom-media.css'

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    youtube: ({ node }) => {
      const { url } = node
      const id = getYouTubeId(url)
      return <YouTube containerClassName={'youtubeContainer'} videoId={id} />
    },
    code: props => {
      if (!props.node || !props.node.code) {
        return null
      }
      const { language, code } = props.node
      return (
        <SyntaxHighlighter language={language || 'text'} style={docco}>
          {code}
        </SyntaxHighlighter>
      )
    }
  }
}

export default serializers
