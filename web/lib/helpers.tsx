import { getAssetDocumentId, getImageDimensions } from '@sanity/asset-utils';
import { FloatingTooltip } from '@mantine/core';
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
import SanityMuxPlayer from 'sanity-mux-player';
import Link from 'next/link';
import { FaExternalLinkAlt } from 'react-icons/fa';

export const localDate = (date: string, format?: 'year' | 'month' | 'full') => {
  const formatDate = (
    format: 'year' | 'month' | 'full' | undefined
  ): {
    year?: 'numeric' | '2-digit' | undefined;
    month?: 'long' | 'short' | undefined;
    day?: 'numeric' | '2-digit' | undefined;
  } => {
    switch (format) {
      case 'year':
        return { year: 'numeric' };
      case 'month':
        return { year: 'numeric', month: 'long' };
      case 'full':
        return { year: 'numeric', month: 'long', day: 'numeric' };
      default:
        return { year: 'numeric', month: 'long', day: 'numeric' };
    }
  };
  return new Date(date).toLocaleDateString('en-US', formatDate(format));
};

export const urlFor = (source: SanityDocument) => {
  return imageUrlBuilder(sanityClient).image(source);
};

export const PortableTextComponents = {
  types: {
    video: ({ value }) => {
      return (
        <>
          <SanityMuxPlayer
            assetDocument={value.videoFile.asset}
            autoload={true}
            autoplay={false}
            className="mb-0"
            height={'100%'}
            loop={false}
            muted={false}
            showControls={true}
            style={{ marginBottom: '0' }}
            width={'100%'}
          />
          <p className="w-full mx-auto text-sm text-darkCoolGray-600 text-center">
            {value.title}
          </p>
        </>
      );
    },

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
    link: (props) => {
      const { value, children, ...args } = props;
      return (
        <>
          {value?.internal ? (
            <FloatingTooltip
              transition="fade"
              transitionDuration={300}
              transitionTimingFunction="ease"
              label={`Read "${value.internal.title}" ${value.internal._type}`}
              className="inline-block underline hover:cursor-pointer"
            >
              <Link href={value.internal.slug.current} {...args}>
                <span className="font-semibold cursor-pointer">
                  {props.text}
                </span>
              </Link>
            </FloatingTooltip>
          ) : value?.external ? (
            <a target="_blank" rel="noreferrer" href={value.external}>
              <span className="inline">
                <FloatingTooltip
                  transition="fade"
                  transitionDuration={300}
                  transitionTimingFunction="ease"
                  label={value.external}
                  className="inline-block"
                >
                  {children}&nbsp;
                </FloatingTooltip>
                <sup>
                  <FaExternalLinkAlt
                    size={'1rem'}
                    className="text-gray-500 inline-block self-baseline"
                  />
                </sup>
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
                <FloatingTooltip
                  transition="fade"
                  transitionDuration={300}
                  transitionTimingFunction="ease"
                  label={value.href}
                  className="inline-block"
                >
                  <span className="underline">{children}</span>&nbsp;
                </FloatingTooltip>
              </span>
            </a>
          )}
        </>
      );
    },
  },
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

export const difficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Easy':
      return 'inline-block font-medium text-emerald-700';
    case 'Moderate':
      return 'inline-block font-medium text-amber-700';
    case 'Hard':
      return 'inline-block font-medium text-rose-700';
    default:
      return 'inline-block font-medium text-blue-700';
  }
};

export const lengthColor = (length: number) => {
  if (length <= 8) return 'inline-block text-emerald-700 font-medium';
  if (length > 8 && length <= 20)
    return 'inline-block text-amber-700 font-medium';
  if (length > 20) return 'inline-block text-rose-700 font-medium';
};

export const ratingToText = (rating: number) => {
  switch (rating) {
    case 1:
      return 'hated it';
    case 2:
      return 'disliked it';
    case 3:
      return 'it was okay';
    case 4:
      return 'liked it';
    case 5:
      return 'loved it';
    default:
      return 'it was okay';
  }
};
