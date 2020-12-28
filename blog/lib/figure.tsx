import Image from 'next/image'
import ProgressiveImage from 'react-progressive-image'
import { urlFor } from './sanity'

export const Figure = (props: any) => {
  const { asset } = props.node

  if (!asset) {
    return null
  }

  if (asset.extension === 'gif') {
    return (
      <figure>
        <img
          src={asset.url}
          alt={props.alt}
          loading="lazy"
          className="w-full"
        />
        <figcaption>{props.node.alt}</figcaption>
      </figure>
    )
  }

  return (
    <div className="w-5xl">
      <figure>
        <img
          src={asset.metadata.lqip}
          width={900}
          height={Math.floor(
            (asset.metadata.dimensions.height * 900) /
              asset.metadata.dimensions.width
          )}
          className="absolute opacity-100 transition-opacity duration-1000"
          style={{
            width: 900,
            height: Math.floor(
              (asset.metadata.dimensions.height * 900) /
                asset.metadata.dimensions.width
            ),
            filter: 'blur(2rem)',
          }}
        />
        <Image
          placeholder={asset.metadata.lqip}
          src={
            urlFor(asset)
              .width(900)
              .maxHeight(
                Math.floor(
                  (asset.metadata.dimensions.height * 900) /
                    asset.metadata.dimensions.width
                )
              )
              .auto('format')
              .quality(100)
              .url() || 'https://rosnovsky.us/favicon.png'
          }
          width={900}
          height={Math.floor(
            (asset.metadata.dimensions.height * 900) /
              asset.metadata.dimensions.width
          )}
          alt={`Cover Image for ${asset.title}`}
          layout={'responsive'}
          quality={100}
          objectFit="cover"
          objectPosition="50% 50%"
          className={`w-full object-cover shadow-inner hover:shadow-md transition-opacity ease-out duration-500`}
        />
        <figcaption>{props.alt}</figcaption>
      </figure>
    </div>
  )
}

export default Figure
