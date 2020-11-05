import React from 'react'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import client from './client'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Figure = ({ node }) => {
  if (!node || !node.asset || !node.asset._ref) {
    return null
  }

  return (
    <figure className="w-full h-full">
      <Image
        src={`${urlFor(node.asset).url()}`}
        height={720}
        width={720}
        layout={'intrinsic'}
        alt={node.alt}
      />
      <figcaption>{node.caption}</figcaption>
    </figure>
  )
}

export default Figure
