// @ts-nocheck
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import ReactPlayer from 'react-player/file'
import Youtube from 'react-player/youtube'
import Figure from './figure'
import Code from './code'
import { getClient } from './sanity'
import dynamic from 'next/dynamic'
import Microlink from '@microlink/react'

// const Microlink = dynamic(
//   () => import('@microlink/react').then((mod) => mod.Microlink),
//   { ssr: false }
// )

const serializers = {
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark
      const href = `/blog/${slug.current}`
      return <Link href={href}>{children[0]}</Link>
    },
    link: ({ mark, children }: { mark: any; children: any }) => {
      const { blank, href } = mark
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      )
    },
  },
  types: {
    mainImage: Figure,
    code: Code,

    // Youtube component could be replaced with ReactPlayer, removing 2 dependencies (YouTube and getYoutubeId)
    youtube: ({ node }: any) => {
      const { url } = node
      // const id = getYouTubeId(url)
      return (
        <div className="w-full">
          <Youtube
            url={url}
            className="youtubeContainer"
            autoPlay={false}
            pip
            width="100%"
          />
        </div>
      )
    },
    mux: (props: any) => {
      // TODO: Fix this bullshit
      const [asset, setAsset] = useState()

      const query = `*[_type == "post" && body[]._type =="mux" ]{
        "asset": *[asset._id == "${props.node.asset._ref}"]{...}
      }`

      useEffect(() => {
        getClient(false)
          .fetch(query)
          .then((video) => setAsset(video[0].asset[0].playbackId))
      }, [])

      return (
        <ReactPlayer
          url={`https://stream.mux.com/${asset}.m3u8`}
          autoPlay={false}
          pip
          width="100%"
          // height={'auto'}
        />
      )
    },
    linkCard: ({ node }: any) => {
      return (
        <div className="text-black">
          <Microlink
            url={node.href}
            size="normal"
            media={['image', 'logo', 'audio', 'screenshot', 'video']}
          />
        </div>
      )
    },
  },
}

export default serializers
