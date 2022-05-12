/* eslint-disable multiline-ternary */
import { useState, useEffect, useCallback, useMemo, useContext } from 'react';

import { CardWrap, CardMedia, CardContent, CardEmpty } from './Card';
import GlobalState, { GlobalContext } from './context/GlobalState';
import {
  castArray,
  classNames,
  getUrlPath,
  imageProxy,
  isFunction,
  isSSR,
} from './utils';

const Card = (props) => {
  const {
    className,
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
  const [isError, setIsError] = useState(false);
  const isLoadingUndefined = useMemo(() => loading === undefined, [loading]);
  const apiUrl = `https://rosnovsky.us/api/meta?url=${url}`;

  const toFetchData = useCallback(() => {
    const fetcher = async () => {
      setLoading(true);
      const data = await fetch(apiUrl).then((res) => res.json());
      return mergeData(await data);
    };
    fetcher();
  }, [url]);

  const mergeData = useCallback(
    (fetchedData) => {
      const payload = isFunction(setData)
        ? setData(fetchedData)
        : { ...fetchedData, ...setData };

      const { title, description, url, image, logo } = payload.metadata;

      const mediaFallback = image || logo || {};
      const media = mediaFallback;

      const imageUrl = getUrlPath(media);
      const { color, background_color: backgroundColor } = media;

      updateState({
        url,
        color,
        title,
        description,
        imageUrl,
        backgroundColor,
      });

      setLoading(false);
    },
    [mediaProps, setData]
  );

  useEffect(toFetchData, [url, setData]);

  const isLoading = isLoadingUndefined ? loadingState : loading;

  if (isError) {
    return (
      <a href={url} {...restProps}>
        {url}
      </a>
    );
  }
  if (isSSR) return null;
  return (
    <CardWrap
      className={`${classNames.main} ${className}`.trim()}
      href={url}
      isLoading={isLoading}
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

const Microlink = (props) => (
  <GlobalState {...props}>
    {(otherProps) => <Card {...otherProps} />}
  </GlobalState>
);

export { imageProxy };

export default Microlink;
