import { getImageDimensions } from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from './sanityClient';
import Image from 'next/image';
import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';

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
      return (
        <Image
          src={urlFor(value).fit('crop').auto('format').url()}
          width={getImageDimensions(value).width}
          height={getImageDimensions(value).height}
          placeholder="blur"
          blurDataURL={urlFor(value)
            .fit('max')
            .auto('format')
            .quality(10)
            .blur(10)
            .url()}
        />
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
