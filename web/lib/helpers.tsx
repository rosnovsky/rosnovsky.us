import { getAssetDocumentId, getImageDimensions } from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from './sanityClient';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'));
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/hljs';
import getYouTubeId from 'get-youtube-id';
import { useEffect, useState } from 'react';
import { SanityDocument, SanityImageAssetDocument } from '@sanity/client';

export const localDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const urlFor = (source: SanityDocument) => {
  return imageUrlBuilder(sanityClient).image(source);
};

export const PortableTextComponents = {
  types: {
    image: ({ value }: { value }) => {
      if (!value?.asset) return null;
      const ImageComponent = () => {
        const [asset, setAsset] = useState<SanityImageAssetDocument>();

        useEffect(() => {
          const fetchAsset = async () => {
            const data: any = await sanityClient.getDocument(
              getAssetDocumentId(value)
            );
            setAsset(data ? data : null);
            return data;
          };
          fetchAsset();
        }, []);

        return (
          <div className="h-full w-full">
            {asset && (
              <>
                <Image
                  src={urlFor(value).fit('crop').auto('format').url()}
                  width={getImageDimensions(value).width}
                  height={getImageDimensions(value).height}
                  layout="responsive"
                  placeholder="blur"
                  blurDataURL={asset.metadata.lqip}
                />
                <div className="w-full mt-3 text-gray-700 mb-5 text-center text-sm">
                  {asset?.description}
                </div>
              </>
            )}
          </div>
        );
      };

      return <ImageComponent />;
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

export const URLReplacer = (str) => {
  const match = str.match(
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\\/]))?/
  );
  if (!match) return str;
  let final = str;
  match.forEach((url) => {
    final = final.replace(url, '[removed external link]');
  });
  return final;
};
