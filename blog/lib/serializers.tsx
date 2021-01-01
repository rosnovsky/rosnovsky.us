// @ts-nocheck
import Link from 'next/link'
import Youtube from 'react-player/youtube'
import Figure from './figure'
import Code from './code'
import Microlink from '@microlink/react'
import InternalLink from './internalLink'
// const Microlink = dynamic(
//   () => import('@microlink/react').then((mod) => mod.Microlink),
//   { ssr: false }
// )

const serializers = {
  marks: {
    internalLink: InternalLink,
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
