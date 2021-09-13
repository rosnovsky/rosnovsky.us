// @ts-nocheck
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic'
const Hls = dynamic(() => import('hls.js'))
import { useState, useEffect, useRef } from 'react'
import mux from 'mux-embed'

import type { PictureDescription } from '../../index'

const shimmer = (w, h) => `
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
</svg>`

const toBase64 = (str) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str)

const CustomLink = (props) => {
  const href = props.href;
  const isInternalLink = href && (href.startsWith('/') || href.startsWith('#'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        <a {...props} />
      </Link>
    );
  }

  return <a target="_blank" rel="noopener noreferrer" {...props} />;
};

const ImageWithAlt = ({ path, width, height, caption }: { path: string, width?: number, height?: number, caption?: string }) => {
  const [alt, setAlt] = useState("Image description is missing. I'm sorry!")

  useEffect(() => {
    const fetchAlt = async () => {
      if (!path) {
        return
      }
      try {
        const text = await fetch(`${process.env.NODE_ENV !== 'production' ? "http://localhost:3000/api/pictureDescription?image=" + path : "https://rosnovsky.us/api/pictureDescription?image=" + path}`).then(result => result.json()).then((final: { result: PictureDescription }) => (final.result.description.captions[0].text))
        setAlt(text)
        return
      }
      catch (error) {
        setAlt("Image description is missing. I'm sorry!")
        return
      }
    }
    fetchAlt()

  }, [])

  return <div className="my-5 shadow-lg bg-white dark:bg-gray-700 p-1">
    <Image
      src={require(`../../public/static/images/${path}`)}
      alt={alt}
      layout="responsive"
      blurDataURL={path.split('.').includes('gif') ? `data:image/svg+xml;base64,${toBase64(shimmer(672, (672 * height) / width))}` : null}
      placeholder="blur"
      className="p-3"
    />
    {caption ? <div className="pt-5 pb-5 text-center bg-gray-100 text-gray-700 dark:bg-gray-500 dark:text-white">{caption}</div> : null}
  </div>
}

const Video = ({ playbackId }) => {
  const videoRef = useRef(null);
  const src = `https://stream.mux.com/${playbackId}.m3u8`
  const poster = `https://image.mux.com/${playbackId}/animated.gif?start=378&end=387&fps=5`

  useEffect(() => {
    const video = videoRef.current
    const initTime = Date.now();
    if (!video) return

    video.controls = true
    let hls

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // This will run in safari, where HLS is supported natively
      video.src = src
    } else if (Hls.isSupported()) {
      // This will run in all other modern browsers
      hls = new Hls()
      hls.loadSource(src)
      hls.attachMedia(video)
    } else {
      console.error(
        'This is an old browser that does not support MSE https://developer.mozilla.org/en-US/docs/Web/API/Media_Source_Extensions_API'
      )
    }

    mux.monitor(video, {
      debug: false,
      // pass in the 'hls' instance and the 'Hls' constructor
      hlsjs: hls,
      Hls,
      data: {
        env_key: process.env.MUX_ENV_KEY, // required
        // Metadata fields
        player_name: "Main Player", // any arbitrary string you want to use to identify this player
        video_id: playbackId, // required
        player_init_time: initTime
        // ...
      }
    });

    return () => {
      if (hls) {
        hls.destroy()
      }
    }
  }, [src, videoRef])

  return (
    <video
      controls
      preload="auto"
      playsInline
      ref={videoRef}
      poster={poster}
      style={{ width: "100%", maxWidth: "900px" }}
      debug
      enableWorker
      lowLatencyMode
      forceStartLoad
    // data-setup='{
    //   "timelineHoverPreviews": true
    // }'
    />
  );
}


const MDXComponents = {
  ImageWithAlt,
  Image,
  Video,
  a: CustomLink
};

export default MDXComponents;
