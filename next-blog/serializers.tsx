import { useState, useEffect } from 'react'
import Figure from './Figure'
// import SyntaxHighlighter from 'react-syntax-highlighter'
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import getYouTubeId from 'get-youtube-id'
import YouTube from 'react-youtube'
import client from './client'
import ReactPlayer from 'react-player/lazy'
import groq from 'groq'

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
    // code: props => {
    //   if (!props.node || !props.node.code) {
    //     return null
    //   }
    //   const { language, code } = props.node
    //   return (
    //     <SyntaxHighlighter language={language || 'text'}>
    //       {code}
    //     </SyntaxHighlighter>
    //   )
    // },
    mux: props => {
      // TODO: Fix this bullshit
      const [asset, setAsset] = useState()

      const query = groq`*[_type == "post" && body[]._type =="mux" ]{
        "asset": *[asset._id == "${props.node.asset._ref}"]{playbackId}[0]}`

      useEffect(() => {
        client.fetch(query).then(result => {
          console.log(result[0].asset.playbackId)
          setAsset(result[0].asset.playbackId)
          return result[0].asset.playbackId
        })
      }, [])

      return (
        <div className="max-w-1/2">
          <ReactPlayer
            className="mx-auto"
            url={`https://stream.mux.com/${asset}.m3u8?time=30`}
            autoPlay={false}
            light={`https://image.mux.com/${asset}/thumbnail.jpg?height=720&width=1280&fit_mode=preserve`}
            controls={true}
            pip={true}
            width={650}

            // height={'auto'}
          />
        </div>
      )
    }
    // linkCard: node => {
    //   return <PreviewCard url={node.node.href} />
    // },
    // photoGallery: node => {
    //   const images = node.node.images.map(node => {
    //     return buildGaleryImageObj(node)
    //   })
    //   return (
    //     <div>
    //       <h3>{node.node.galleryTitle}</h3>
    //       <Gallery
    //         lightboxOptions={{
    //           reactModalProps: { shouldReturnFocusAfterClose: false }
    //         }}
    //         images={images}
    //       />
    //     </div>
    //   )
    // }
  }
}

export default serializers
