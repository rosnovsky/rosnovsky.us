import React from 'react'
import clientConfig from '../../../client-config'
import BasePortableText from '@sanity/block-content-to-react'
import serializers from './serializers'

const PortableText = blocks => {
  console.log(blocks)
  return (
    <BasePortableText
      blocks={blocks.blocks}
      serializers={serializers}
      {...clientConfig.sanity}
    />
  )
}

export default PortableText
