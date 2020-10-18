import React from 'react'
import Figure from './Figure'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import Gallery from '@browniebroke/gatsby-image-gallery'
import '@browniebroke/gatsby-image-gallery/dist/style.css'
import { buildGaleryImageObj } from '../lib/helpers'
import 'react-image-lightbox/style.css'

import style from '../styles/custom-media.css'
import PreviewCard from './linkPreview'

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
    },
    linkCard: node => {
      return <PreviewCard url={node.node.href} />
    },
    photoGallery: node => {
      const images = node.node.images.map(node => {
        return buildGaleryImageObj(node)
      })
      return (
        <div>
          <h3>{node.node.galleryTitle}</h3>
          <Gallery
            lightboxOptions={{
              reactModalProps: { shouldReturnFocusAfterClose: false }
            }}
            images={images}
          />
        </div>
      )
    }
  }
}

export default serializers
