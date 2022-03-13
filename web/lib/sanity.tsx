import { createClient, createPreviewSubscriptionHook } from 'next-sanity';
// import ReactTooltip from 'react-tooltip';
import createImageUrlBuilder from '@sanity/image-url';
import { PortableText as PortableTextComponent } from '@portabletext/react';
import { getImageDimensions } from '@sanity/asset-utils';
import ReactPlayer from 'react-player/lazy';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/cjs/styles/hljs';

import { config } from './sanityConfig';
import Image from 'next/image';

// You'll now need to define your own image component
if (!config.projectId) {
  throw Error('The Project ID is not set. Check your environment variables.');
}
export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const imageBuilder = (source) =>
  createImageUrlBuilder(config).image(source);

const SampleImageComponent = ({ value }) => {
  const { width, height } = getImageDimensions(value);

  const imgUrl = imageBuilder(config)
    .image(value)
    .width(800)
    .fit('max')
    .auto('format')
    .url();

  const blurUrl = imageBuilder(config)
    .image(value)
    .width(800)
    .fit('max')
    .auto('format')
    .quality(5)
    .url();

  return (
    <Image
      src={imgUrl}
      alt={value.alt || ' '}
      width={width}
      height={height}
      placeholder="blur"
      blurDataURL={blurUrl}
    />
  );
};

export const PortableText = ({ value }) => {
  if (!value) return null;

  return (
    <PortableTextComponent
      value={value}
      components={{
        types: {
          image: SampleImageComponent,
          youtube: ({ value }: { value: { url: string } }) => {
            const { url } = value;
            return (
              <div className="player-wrapper">
                <ReactPlayer
                  url={url}
                  width="100%"
                  height="100%"
                  className="react-player"
                />
              </div>
            );
          },
          code: ({ value }) => {
            if (!value || !value.code) {
              return null;
            }
            const { language, code } = value;
            return (
              <SyntaxHighlighter
                wrapLongLines
                language={language || 'text'}
                style={github}
              >
                {code}
              </SyntaxHighlighter>
            );
          },
        },
        marks: {
          link: ({ children, value }) => {
            const rel = !value.href.startsWith('/')
              ? 'noreferrer noopener'
              : undefined;
            return (
              <a href={value.href} rel={rel}>
                {children}
              </a>
            );
          },
          code: ({ children }) => {
            return <code>{children}</code>;
          },
        },
      }}
    />
  );
};

export const usePreviewSubscription = createPreviewSubscriptionHook(config);

// Set up Portable Text serialization

export const client = createClient(config);

export const previewClient = createClient({
  ...config,
  useCdn: false,
});

export const getClient = (usePreview) => (usePreview ? previewClient : client);
export default client;
