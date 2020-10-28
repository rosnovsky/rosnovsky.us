import React, { useState, useEffect } from 'react'
import Figure from './figure'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import ReactPlayer from 'react-player/lazy'
import Gallery from '@browniebroke/gatsby-image-gallery'
import '@browniebroke/gatsby-image-gallery/dist/style.css'
import { buildGaleryImageObj } from '../../utils/helpers'
import 'react-image-lightbox/style.css'
import sanityClient from '@sanity/client'
import sanityConfig from '../../../client-config'

import PreviewCard from './linkPreview'

const client = sanityClient(sanityConfig.sanity)

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,
    youtube: ({ node }) => {
      const { url } = node
      const id = getYouTubeId(url)
      return (
        <div className="w-full">
          <YouTube containerClassName={'youtubeContainer'} videoId={id} />
        </div>
      )
    },
    mux: props => {
      console.warn(props)
      // TODO: Fix this bullshit
      const [asset, setAsset] = useState()

      const query = `*[_type == "post" && body[]._type =="mux" ]{
        "asset": *[asset._id == "${props.node.asset._ref}"]{...}
      }`

      useEffect(() => {
        console.warn(client)
        client
          .fetch(query)
          .then(asset => setAsset(asset[0].asset[0].playbackId))
      }, [])

      return (
        <ReactPlayer
          url={`https://stream.mux.com/${asset}.m3u8`}
          autoplay={false}
          light={`https://image.mux.com/${asset}/thumbnail.png?width=1280&height=720&fit_mode=pad`}
          config={{
            file: {
              attributes: {
                poster: `https://image.mux.com/${asset}/thumbnail.png?width=1280&height=720&fit_mode=pad`
              }
            }
          }}
          controls={true}
          pip={true}
          width={'100%'}
          // height={'auto'}
        />
      )
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
