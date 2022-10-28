// @ts-expect-error
import React from 'react';
import Microlink from '../../helpers';


type Props = {
  url: string;
  size?: 'small' | 'normal' | 'large';
  media?: 'image' | 'logo';
};

const Metacard = ({ url, size, media }: Props) => {
  console.info(size, media);
  return (
    <Microlink url={url} fetchData size={size || 'normal'} media={media || 'logo'} />

  )
};

export default Metacard;
