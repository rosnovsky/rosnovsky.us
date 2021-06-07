import Link from 'next/link';
import Image from 'next/image';
import {useState, useEffect} from 'react'

import type {PictureDescription} from '../../index'

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

const ImageWithAlt = ({ path, width, height }: {path: string, width: number, height: number}) => {
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

  return <Image
    alt={alt}
    src={`/static/images/${path}`}
    width={width ? width : 4028 / 2}
    height={height ? height : 2268 / 2}
  />
}

const MDXComponents = {
  ImageWithAlt,
  a: CustomLink
};

export default MDXComponents;
