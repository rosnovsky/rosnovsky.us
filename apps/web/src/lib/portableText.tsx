import { lazy, Suspense } from 'react';
import { getImageDimensions } from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import Image from 'next/future/image';
const MuxPlayer = lazy(() => import('@mux/mux-player-react'));
import getYouTubeId from 'get-youtube-id';
import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';
const Metacard = lazy(() => import('@/components/metaCard'));
import Link from 'next/link';
import sanityClient from './sanityClient';
const LiteYouTubeEmbed = lazy(() => import('react-lite-youtube-embed'));
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export const urlFor = (source: SanityDocument) => {
  return imageUrlBuilder(sanityClient).image(source);
};

export const PortableTextComponents = {
  types: {
    video: ({ value }) => {
      return (
        <div className='w-full mx-auto'>
          <Suspense fallback={<div>Loading...</div>}>
            <MuxPlayer
              streamType="on-demand"
              playbackId={value.videoFile.asset.playbackId}
              autoPlay={false}
              metadata={{
                title: value.title,
              }}
            ></MuxPlayer></Suspense>
          <p className="w-full mx-auto text-sm text-darkCoolGray-600 text-center">
            {value.title}
          </p>
        </div>
      );
    },

    image: ({ value }: { value: SanityImageAssetDocument }) => {
      if (!value) return null;
      const ImageComponent = () => {
        return (
          <div className=" w-full">
            {value.asset && (
              <>
                <Image
                  src={value.asset.url}
                  width={800}
                  height={getImageDimensions(value).height / getImageDimensions(value).width * 800}
                  placeholder="blur"
                  sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                  blurDataURL={value.asset.metadata.lqip}
                  quality={75}
                  alt=""
                  loading='lazy'
                />
                <div className="w-full mt-3 text-gray-700 mb-5 text-center text-sm">
                  {value.asset.description}
                </div>
              </>
            )}
          </div>
        );
      };

      return <ImageComponent />;
    },
    code: ({ value }) => {
      return <pre>{value.code}</pre>;
    },
    youtube: ({ value }) => {
      return (
        <div className="embed-responsive aspect-ratio-16/9 w-full my-3 max-h-3xl">
          <Suspense fallback={<div>Loading...</div>}>
            <LiteYouTubeEmbed
              id={getYouTubeId(value.url) || ""} // Default none, id of the video or playlist
              adNetwork={false} // Default true, to preconnect or not to doubleclick addresses called by YouTube iframe (the adnetwork from Google)
              params="" // any params you want to pass to the URL, assume we already had '&' and pass your parameters string
              playlist={false} // Use  true when your ID be from a playlist
              poster="hqdefault" // Defines the image size to call on first render as poster image. Possible values are "default","mqdefault",  "hqdefault", "sddefault" and "maxresdefault". Default value for this prop is "hqdefault". Please be aware that "sddefault" and "maxresdefault", high resolution images are not always avaialble for every video. See: https://stackoverflow.com/questions/2068344/how-do-i-get-a-youtube-video-thumbnail-from-the-youtube-api
              title="YouTube Embed" // a11y, always provide a title for iFrames: https://dequeuniversity.com/tips/provide-iframe-titles Help the web be accessible ;)
              noCookie={true} //Default false, connect to YouTube via the Privacy-Enhanced Mode using https://www.youtube-nocookie.com
              webp={true} // Default false, use webp format for the poster image
            /></Suspense>
        </div>
      );
    },
    metacard: ({
      value,
    }: {
      value: { url: string; size?: string; media?: string };
    }) => {
      return (
        <div className="min-w-full mx-auto my-3 justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <Metacard {...value} />
          </Suspense>
        </div>
      );
    },
  },
  marks: {
    link: (props: { [x: string]: any; text?: any; value?: any; children?: any; }) => {
      const { value, children, ...args } = props;
      return (
        <>
          {value?.internal ? (
            <Link href={value.internal.slug.current} {...args}>
              <span className="font-semibold cursor-pointer">
                {props.text}
              </span>
            </Link>
          ) : value?.external ? (
            <a target="_blank" rel="noreferrer" href={value.external}>
              <span className="inline">
                {children}
              </span>
            </a>
          ) : (
            <a
              target="_blank"
              className="underline"
              rel="noreferrer"
              href={value.href}
            >
              <span className="inline">
                <span className="underline">{children}</span>
              </span>
            </a>
          )}
        </>
      );
    },
  },
};
