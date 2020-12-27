import Image from 'next/image'
import { isMainThread } from 'worker_threads'
import { urlFor } from './sanity'

export const Figure = (props: any) => {
  const { asset } = props.node
  const demensions = asset._ref.split('-')[2]
  const sizes = {
    width: demensions.split('x')[0],
    height: demensions.split('x')[1],
    orientation:
      demensions.split('x')[0] / demensions.split('x')[1] > 1
        ? 'landscape'
        : 'portrait',
  }

  const gif = asset._ref.split('-')[3] === 'gif'

  if (!asset) {
    return null
  }

  if (gif) {
    return (
      <figure>
        <img
          src={
            urlFor(asset).minWidth(760).height(sizes.height).url() ||
            'https://rosnovsky.us/favicon.png'
          }
          alt={props.alt}
          loading="lazy"
          className="w-full"
        />
        <figcaption>{props.alt}</figcaption>
      </figure>
    )
  }

  return (
    <div className="w-full">
      <figure>
        <Image
          src={
            urlFor(asset)
              .width(760)
              .height(Math.floor((sizes.height * 760) / sizes.width))
              .format('jpg')
              .crop('focalpoint')
              .url() || 'https://rosnovsky.us/favicon.png'
          }
          loading="lazy"
          width={760}
          height={Math.floor((sizes.height * 760) / sizes.width)}
          quality={80}
          objectFit="cover"
          objectPosition="50% 50%"
          layout="responsive"
          alt={props.title}
          className="w-full"
        />
        <figcaption>{props.alt}</figcaption>
      </figure>
    </div>
  )
}

export default Figure
