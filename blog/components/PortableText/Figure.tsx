import Image from 'next/image'
import { urlFor } from '../../utils/sanity'

export const Figure = (props: any) => {
  const { asset } = props.node

  const dimensions = {
    width: asset._ref.split('-')[2].split('x')[0],
    height: asset._ref.split('-')[2].split('x')[1],
    aspectRatio:
      asset._ref.split('-')[2].split('x')[0] /
      asset._ref.split('-')[2].split('x')[1],
  }
  const lqip =
    urlFor(asset._ref)
      .format('jpg')
      .width(dimensions.aspectRatio > 1 ? 20 : 10)
      .height(dimensions.aspectRatio > 1 ? 10 : 20)
      .quality(5)
      .url() || 'https://rosnovsky.us/favicon.png'

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
    <figure className="relative rounded-lg">
      <div className="absolute overflow-hidden object-cover rounded-lg">
        <Image
          src={lqip}
          alt={`Cover Image for ${asset.title}`}
          width={896}
          height={896 / dimensions.aspectRatio}
          objectFit="contain"
          className={'rounded-lg'}
          quality={100}
        />
      </div>
      <Image
        src={
          urlFor(asset).width(896).format('jpg').quality(95).url() ||
          'https://rosnovsky.us/favicon.png'
        }
        width={896}
        height={896 / dimensions.aspectRatio}
        alt={`Cover Image for ${asset.title}`}
        loading="lazy"
        quality={100}
        layout={'responsive'}
        objectFit="cover"
        className={`w-full object-cover shadow-inner hover:shadow-md transition-opacity ease-out duration-500 rounded-lg`}
      />
      <figcaption>{props.alt}</figcaption>
    </figure>
  )
}

export default Figure
