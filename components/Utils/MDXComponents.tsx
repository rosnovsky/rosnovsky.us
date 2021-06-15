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

const ImageWithAlt = ({ path, width, height }: {path, width: number, height: number}) => {
  const img = require(`../../public/static/images/${path}`)
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

  return <div className="my-5"><Image
  
    alt={alt}
    src={img}
    layout="responsive"
    placeholder="blur"
  /></div>
}

const MDXComponents = {
  ImageWithAlt,
  Image,
  a: CustomLink
};

export default MDXComponents;
