import React, { useState, useEffect } from 'react'
import Figure from './figure'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import ReactPlayer from 'react-player'
import sanityClient from '@sanity/client'
import sanityConfig from '../../../client-config'

const client = sanityClient({ ...sanityConfig.sanity, useCdn: true })

const serializers = {
  types: {
    authorReference: ({ node }) => <span>{node.author.name}</span>,
    mainImage: Figure,

    // Youtube component could be replaced with ReactPlayer, removing 2 dependencies (YouTube and getYoutubeId)
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
      // TODO: Fix this bullshit
      const [asset, setAsset] = useState()

      const query = `*[_type == "post" && body[]._type =="mux" ]{
        "asset": *[asset._id == "${props.node.asset._ref}"]{...}
      }`

      useEffect(() => {
        client
          .fetch(query)
          .then(video => setAsset(video[0].asset[0].playbackId))
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
      const { code } = props.node
      return { code }
    }
  }
}

export default serializers
