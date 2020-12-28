import Image from 'next/image'
import ProgressiveImage from 'react-progressive-image'

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
    <div className="w-full">
      <figure>
        <ProgressiveImage
          src={asset.url}
          placeholder={asset.metadata.lqip}
          delay={1000}
        >
          {(src: string, loading: boolean) => (
            <div>
              <Image
                src={src}
                width={760}
                height={Math.floor(
                  (asset.metadata.dimensions.height * 760) /
                    asset.metadata.dimensions.width
                )}
                alt={`Cover Image for ${asset.title}`}
                layout={'responsive'}
                objectFit="cover"
                priority
                objectPosition="50% 50%"
                className={`${
                  loading ? 'opacity-0' : 'opacity-100'
                } w-full object-cover shadow-inner hover:shadow-md transition-opacity ease-out duration-500`}
              />
            </div>
          )}
        </ProgressiveImage>
        <figcaption>{props.alt}</figcaption>
      </figure>
    </div>
  )
}

export default Figure
