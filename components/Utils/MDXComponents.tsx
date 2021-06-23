// @ts-nocheck
import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react'

import type {PictureDescription} from '../../index'

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

const ImageWithAlt = ({ path, width, height }: {path: string, width: number, height: number }) => {
  const [alt, setAlt] = useState("Image description is missing. I'm sorry!")
  
  useEffect(() => {
    const fetchAlt = async () => {
      if(!path){
        return
      }
      try{
        const text = await fetch(`${process.env.NODE_ENV !== 'production' ? "http://localhost:3000/api/pictureDescription?image=" + path : "https://rosnovsky.us/api/pictureDescription?image=" + path}`).then(result => result.json()).then((final: {result: PictureDescription}) => (final.result.description.captions[0].text))
        setAlt(text)
        return
      }
      catch(error){
        setAlt("Image description is missing. I'm sorry!")
        return
      }
  }
  fetchAlt()
  
}, [])

    return <div className="my-5">
    <Image 
      src={`/static/images/${path}`} 
      alt={alt} 
      blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(672, (672*height)/width))}`}
      layout="responsive"
      height={(672*height)/width}
      width={672}
      placeholder="blur"
      />
  </div>
  }

const MDXComponents = {
  ImageWithAlt,
  Image,
  a: CustomLink
};

export default MDXComponents;
