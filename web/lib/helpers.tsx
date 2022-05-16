import { getAssetDocumentId, getImageDimensions } from '@sanity/asset-utils';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from './sanityClient';
import dynamic from 'next/dynamic';
import Image from 'next/image';
const SyntaxHighlighter = dynamic(() => import('react-syntax-highlighter'));
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/hljs/night-owl';
import getYouTubeId from 'get-youtube-id';
import { useEffect, useState } from 'react';
import type { SanityDocument, SanityImageAssetDocument } from '@sanity/client';
import { Feed } from 'feed';
import type { BlogPost } from 'index';
import fs from 'fs';
import Metacard from '@components/Metacard';

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
                  alt=""
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
    metacard: ({
      value,
    }: {
      value: { url: string; size?: string; media?: string };
    }) => {
      return (
        <div className="min-w-full mx-auto my-3 justify-center">
          <Metacard {...value} />
        </div>
      );
    },
  },
  marks: {
    abbriviation: ({ value, text }: { value?: any; text?: any }) => {
      return (
        <abbr className="cursor-wait" title={value.definition}>
          {text}
        </abbr>
      );
    },
  },
};

export const URLReplacer = (str) => {
  const match = str.match(
    /(ftp|http|https):\/\/(\w+:?\w*@)?(\S+)(:\d+)?(\/|\/([\w#:.?+=&%@!\-\\/]))?/
  );
  if (!match) return str;
  let final = str;
  match.forEach((url) => {
    final = final.replace(url, '[removed external link]');
  });
  return final;
};

const getBlogPostsData = async (): Promise<BlogPost[]> => {
  return await sanityClient.fetch(
    `
    *[_type == "post"] | order(publishedAt desc) {
      title,
      coverImage {
        ...,
        asset->
      },
      publishedAt,
      slug,
      "summaryRaw": pt::text(summary),
      "bodyRaw": pt::text(body),
    }
  `
  );
};

export const generateRssFeed = async () => {
  const posts = await getBlogPostsData();
  const siteURL = 'https://rosnovsky.us';
  const date = new Date();
  const author = {
    name: 'Rosnovsky Park™',
    email: 'artem@rosnovsky.us',
    link: 'https://twitter.com/rosnovsky',
  };

  const feed = new Feed({
    title: 'Rosnovsky Park™ Blog',
    description: 'A blog and site of Art Rosnovsky.',
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/icon-512x512.png`,
    favicon: `${siteURL}/icon-512x512.png`,
    copyright: `All rights reserved ${date.getFullYear()}, Art Rosnovsky`,
    updated: date,
    generator: 'Feed for Node.js',
    feedLinks: {
      rss2: `${siteURL}/feed/feed.xml`,
      json: `${siteURL}/feed/feed.json`,
      atom: `${siteURL}/feed/atom.xml`,
    },
    author,
  });

  posts.forEach((post) => {
    const url = `${siteURL}/blog/${post.slug.current}`;

    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.summaryRaw,
      content: post.bodyRaw,
      author: [author],
      contributor: [author],
      date: new Date(post.publishedAt),
    });
  });
  fs.mkdirSync('./public/feed', { recursive: true });
  fs.writeFileSync('./public/feed/feed.xml', feed.rss2());
  fs.writeFileSync('./public/feed/atom.xml', feed.atom1());
  fs.writeFileSync('./public/feed/feed.json', feed.json1());
};
