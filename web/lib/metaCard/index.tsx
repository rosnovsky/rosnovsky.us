/* eslint-disable multiline-ternary */

import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useContext,
} from 'react';

import { CardWrap, CardMedia, CardContent, CardEmpty } from './Card';
import GlobalState, { GlobalContext } from './context/GlobalState';
import {
  castArray,
  classNames,
  getUrlPath,
  getPreferredMedia,
  isFunction,
  isLazySupported,
  isObject,
  someProp,
} from './utils';
import { useIntersectionObserver } from './utils/hooks';

const Card = (props) => {
  const {
    className,
    fetchData,
    lazy,
    loading,
    media: mediaProp,
    setData,
    url,
    ...restProps
  } = props;

  const mediaProps = useMemo(() => castArray(mediaProp), [mediaProp]);
  // @ts-expect-error ???
  const { updateState } = useContext(GlobalContext);
  const [loadingState, setLoading] = useState(true);
  const [iframeMedia, setIframeMedia] = useState(null);
  const [isError, setIsError] = useState(false);
  const isLoadingUndefined = useMemo(() => loading === undefined, [loading]);
  const apiUrl = `https://rosnovsky.us/api/getMetaCardData?url=${url}`;

  const isLazyEnabled = useMemo(
    () => isLazySupported && (lazy === true || isObject(lazy)),
    [lazy]
  );

  const lazyOptions = useMemo(
    () => (isObject(lazy) ? lazy : undefined),
    [lazy]
  );

  const [hasIntersected, cardRef] = useIntersectionObserver(
    isLazyEnabled,
    lazyOptions
  );

  const canFetchData = useMemo(
    () => !isLazyEnabled || (isLazyEnabled && hasIntersected),
    [isLazyEnabled, hasIntersected]
  );

  const mergeData = useCallback(
    (fetchedData) => {
      const payload = isFunction(setData)
        ? setData(fetchedData)
        : { ...fetchedData, ...setData };

      const { title, description, url, video, audio, image, logo, iframe } =
        payload;

      const mediaFallback = image || logo || {};
      let media = mediaFallback;
      let videoUrl;
      let audioUrl;
      let isVideo = false;
      let isAudio = false;

      const preferredMedia = getPreferredMedia(payload, mediaProps);

      switch (preferredMedia) {
        case 'audio':
          isAudio = true;
          audioUrl = getUrlPath(audio);
          break;
        case 'video':
          isVideo = true;
          videoUrl = getUrlPath(video);
          break;
        case 'iframe':
          setIframeMedia(iframe);
          break;
        default:
          media = someProp(payload, mediaProps) || mediaFallback;
          break;
      }

      const imageUrl = getUrlPath(media);
      const { color, background_color: backgroundColor } = media;

      updateState({
        url,
        color,
        title,
        description,
        imageUrl,
        videoUrl,
        audioUrl,
        isVideo,
        isAudio,
        backgroundColor,
      });

      setLoading(false);
    },
    [mediaProps, updateState, setData]
  );

  const toFetchData = useCallback(() => {
    const fetchFromApi = async () => {
      setLoading(true);
      const data = await fetch(apiUrl).then((res) => res.json());
      return { data: data.metadata };
    };
    if (canFetchData) {
      setLoading(true);

      const fetch = fetchData ? fetchFromApi() : Promise.resolve({});

      fetch
        // @ts-expect-error ???
        .then(({ data }) => mergeData(data))
        .catch((error) => {
          setLoading(false);
          setIsError(true);
          console.error(`Error fetching data: ${error}`);
        });
    }
  }, [canFetchData, apiUrl, fetchData, mergeData]);

  useEffect(toFetchData, [url, toFetchData, setData]);

  const isLoading = isLoadingUndefined ? loadingState : loading;

  if (isError) {
    return (
      <a href={url} {...restProps}>
        {url}
      </a>
    );
  }

  if (iframeMedia) {
    // @ts-expect-error ???
    iframeMedia.scripts.forEach((attrs) => {
      const hasScript = document.querySelector(`script[src="${attrs.src}"]`);
      if (!hasScript) {
        const script = document.createElement('script');
        Object.keys(attrs).forEach((key) => (script[key] = attrs[key]));
        document.body.appendChild(script);
      }
    });

    return (
      <div
        className={classNames.iframe}
        // @ts-expect-error ???
        dangerouslySetInnerHTML={{ __html: iframeMedia.html }}
        {...restProps}
      />
    );
  }

  return (
    <CardWrap
      className={`${classNames.main} ${className}`.trim()}
      href={url}
      isLoading={isLoading}
      ref={cardRef}
      {...restProps}
    >
      {isLoading ? (
        <CardEmpty />
      ) : (
        <>
          <CardMedia />
          <CardContent />
        </>
      )}
    </CardWrap>
  );
};

const MetaCardComponent = (props) => (
  <GlobalState {...props}>
    {(otherProps) => <Card {...otherProps} />}
  </GlobalState>
);

export default MetaCardComponent;
