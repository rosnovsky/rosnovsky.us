import { useContext, useState } from 'react';

import { GlobalContext } from '../../context/GlobalState';
import { getUrlPath } from '../../utils';
import { ImageLoadCatcher } from './loader';
import Image from './Image';

const isUrl = (url: string) => getUrlPath(url) !== null;

const MEDIA_COMPONENT = {
  image: Image,
};

const getMediaType = (isAudio: boolean, isVideo: boolean) => {
  if (isAudio) return 'audio';
  if (isVideo) return 'video';
  return 'image';
};

const CardMedia = () => {
  const {
    // @ts-expect-error ???
    state: { imageUrl, isAudio, isVideo },
  } = useContext(GlobalContext);
  const [isLoading, setIsLoading] = useState(isUrl(imageUrl));
  const mediaType = getMediaType(isAudio, isVideo);
  const MediaComponent = MEDIA_COMPONENT[mediaType];

  return (
    <>
      <MediaComponent isLoading={isLoading} />
      {isLoading && (
        <ImageLoadCatcher src={imageUrl} onLoad={() => setIsLoading(false)} />
      )}
    </>
  );
};

export default CardMedia;
