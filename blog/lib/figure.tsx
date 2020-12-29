import Image from 'next/image'
import { urlFor } from './sanity'

export const Figure = (props: any) => {
  const { asset } = props.node
  const lqip =
    urlFor(asset._ref).format('jpg').width(20).quality(10).url() ||
    'https://rosnovsky.us/favicon.png'

  const dimensions = {
    width: asset._ref.split('-')[2].split('x')[0],
    height: asset._ref.split('-')[2].split('x')[1],
    aspectRatio:
      asset._ref.split('-')[2].split('x')[0] /
      asset._ref.split('-')[2].split('x')[1],
  }

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
    <figure className="relative">
      {/* <img
          style={{
            width: '56rem',
          }}
          src={asset.metadata.lqip}
          className="absolute opacity-100 transition-opacity duration-1000"
        /> */}
      <div className="absolute overflow-hidden object-cover">
        <Image
          src={lqip}
          alt={`Cover Image for ${asset.title}`}
          width={896}
          height={896 / dimensions.aspectRatio - 200}
          objectFit="contain"
          loading="eager"
        />
      </div>
      <Image
        src={
          urlFor(asset).width(896).format('jpg').quality(85).url() ||
          'https://rosnovsky.us/favicon.png'
        }
        width={896}
        height={896 / dimensions.aspectRatio}
        alt={`Cover Image for ${asset.title}`}
        loading="lazy"
        layout={'responsive'}
        objectFit="cover"
        className={`w-full object-cover shadow-inner hover:shadow-md transition-opacity ease-out duration-500`}
      />
      <figcaption>{props.alt}</figcaption>
    </figure>
  )
}

export default Figure
