import Link from 'next/link';
import Image from 'next/image';
import Hls from 'hls.js';
import { useState, useEffect, useRef } from 'react';
import { Tweet, YouTube, Gist } from 'mdx-embed';

import type { PictureDescription } from '../../index';

export const shimmer = (w: number, h: number): string => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#EFEFEF" offset="20%" />
      <stop stop-color="#DFDFDF" offset="50%" />
      <stop stop-color="#EFEFEF" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#EFEFEF" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="2s" repeatCount="indefinite"  />
</svg>`;

export const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <span {...props} />
      </Link>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {props.children}
    </a>
  );
};

const ImageWithAlt = ({
  path,
  width,
  height,
  caption,
}: {
  path: string;
  width?: number;
  height?: number;
  caption?: string;
}) => {
  const [alt, setAlt] = useState("Image description is missing. I'm sorry!");

  useEffect(() => {
    const fetchAlt = async () => {
      if (!path) {
        return;
      }
      try {
        const text = await fetch(
          `https://rosnovsky.us/api/pictureDescription?image=${path}`
        )
          .then((result) => result.json())
          .then(
            (final: { result: PictureDescription }) =>
              final.result.description.captions[0].text
          );
        setAlt(text);
        return;
      } catch (error) {
        setAlt("Image description is missing. I'm sorry!");
        return;
      }
    };
    fetchAlt();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="my-5 shadow-lg bg-white dark:bg-gray-700 p-1">
      <Image
        src={
          process.env.NODE_ENV === 'test'
            ? '/public/static/images/art.jpg'
            : require(`../../public/static/images/${path}`)
        }
        alt={alt}
        layout={process.env.NODE_ENV === 'test' ? 'fill' : 'responsive'}
        blurDataURL={
          path.split('.').includes('gif')
            ? `data:image/svg+xml;base64,${toBase64(
                shimmer(
                  672,
                  (672 * (height ? height : 400)) / (width ? width : 800)
                )
              )}`
            : undefined
        }
        placeholder={process.env.NODE_ENV === 'test' ? 'empty' : 'blur'}
        className="p-3"
        quality={95}
      />
      {caption ? (
        <div className="pt-5 pb-5 text-center bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-white">
          {caption}
        </div>
      ) : null}
    </div>
  );
};

const Video = ({ playbackId }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const src = `https://stream.mux.com/${playbackId}.m3u8`;
  const poster = `https://image.mux.com/${playbackId}/animated.gif?start=378&end=387&fps=5`;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (!Hls) return;

    video.controls = true;
    let hls;

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // This will run in safari, where HLS is supported natively
      video.src = src;
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers
      hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
    } else {
      console.error(
        'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
      );
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, videoRef]);

  return (
    <video
      controls
      preload="auto"
      playsInline
      ref={videoRef}
      poster={poster}
      style={{ width: '100%', maxWidth: '900px' }}
    >
      <track kind="captions" />
    </video>
  );
};

const MDXComponents = {
  ImageWithAlt,
  Image,
  Tweet,
  YouTube,
  Gist,
  Video,
  a: CustomLink,
};

export default MDXComponents;
