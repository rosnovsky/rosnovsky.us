import React from 'react';
import BasePortableText from '@sanity/block-content-to-react';
import clientConfig from '../../../client-config';
import serializers from './serializers';

const PortableText = (blocks) => (
  <BasePortableText
    blocks={blocks.blocks}
    serializers={serializers}
    {...clientConfig.sanity}
  />
);

export default PortableText;
