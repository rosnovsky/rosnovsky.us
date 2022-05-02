import {
  getImage,
  getImageAsset,
  getImageDimensions,
} from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from './sanityClient';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'));
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import getYouTubeId from 'get-youtube-id';

export const localDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const urlFor = (source: SanityImageObject) => {
  return imageUrlBuilder(sanityClient).image(source);
};

export const PortableTextComponents = {
  types: {
    image: ({ value }: { value }) => {
      if (!value?.asset) return null;
      console.log(getImage(value, { projectId: 'n3o7a5dl', dataset: 'prod' }));
      return (
        <div className="h-full w-full">
          <Image
            src={urlFor(value).fit('crop').auto('format').url()}
            width={getImageDimensions(value).width}
            height={getImageDimensions(value).height}
            loading="lazy"
            layout="responsive"
            placeholder="blur"
            blurDataURL={urlFor(value)
              .fit('max')
              .auto('format')
              .quality(10)
              .blur(10)
              .url()}
          />
          <div className="mb-5">{value.alt}</div>
        </div>
      );
    },
    code: ({ value }) => {
      return (
        <SyntaxHighlighter style={nightOwl} language={value.language}>
          {value.code}
        </SyntaxHighlighter>
      );
    },
    youtube: ({ value }) => {
      return (
        <div className="embed-responsive aspect-ratio-16/9 w-full h-full">
          <iframe
            title="youtube video"
            className="embed-responsive-item w-full h-full"
            src={`https://www.youtube.com/embed/${getYouTubeId(value.url)}`}
            frameBorder="0"
            height={'400'}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    },
  },
  marks: {},
};
