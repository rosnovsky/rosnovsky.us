// @ts-nocheck
import InternalLink from './InternalLink'
import dynamic from 'next/dynamic'

const Figure = dynamic(import('./Figure'))
const Code = dynamic(import('./Code'))
const Microlink = dynamic(import('@microlink/react'))
const Youtube = dynamic(import('react-player/youtube'))

const serializers = {
  marks: {
    internalLink: InternalLink,
    link: ({ mark, children }: { mark: any; children: any }) => {
      // TODO: implement Fathom goal tracking
      const { blank, href /* fathom */ } = mark
      return blank ? (
        <a
          href={href}
          // onClick={trackGoal(fathom.goalID, fathom.goalValue)}
          target="_blank"
          rel="noopener"
        >
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
