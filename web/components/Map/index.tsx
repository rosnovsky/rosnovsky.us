import ReactMapGL, {
  Marker,
  Popup,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Hike } from 'index';
import { Pin } from './pin';

type Props = {
  data: Hike[] | Hike;
};

export default function Map({ data }: Props) {
  const [viewport, setViewport] = useState({
    viewport: {
      latitude: data instanceof Array ? 47.02577533373375 : data.location.lat,
      longitude:
        data instanceof Array ? -122.44353688197594 : data.location.lng,
      zoom: data instanceof Array ? 6 : 12,
    },
  });
  const [popupInfo, setPopupInfo] = useState<Hike | null>();

  const pins = useMemo(() => {
    if (data instanceof Array) {
      return data.map((hike, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={hike.location.lng}
          latitude={hike.location.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(hike);
          }}
        >
          <Pin />
        </Marker>
      ));
    } else {
      return (
        <Marker
          longitude={data.location.lng}
          latitude={data.location.lat}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(data);
          }}
        >
          <Pin />
        </Marker>
      );
    }
  }, [data]);

  return (
    <>
      <ReactMapGL
        mapStyle={'mapbox://styles/mapbox/outdoors-v11'}
        mapboxAccessToken={
          'pk.eyJ1Ijoicm9zbm92c2t5IiwiYSI6ImNsM2k1dGt6eTBvdXczaXVtOGh4c2x6cm0ifQ.s1iOueVeWKaqkf2Er3TWuA'
        }
        boxZoom
        style={{ height: '40rem' }}
        doubleClickZoom
        keyboard
        projection={'equalEarth'}
        onDrag={(e) => {
          setViewport({ viewport: { ...e.viewState } });
        }}
        onZoom={(e) => {
          setViewport({ viewport: { ...e.viewState } });
        }}
        {...viewport.viewport}
        interactive
        optimizeForTerrain
      >
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <ScaleControl />
        {pins}
        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.location.lng)}
            latitude={Number(popupInfo.location.lat)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.report && (
                <Link href={`/blog/${popupInfo.report.slug.current}`}>
                  {popupInfo.title}
                </Link>
              )}
              {!popupInfo.report && (
                <Link href={`/hike/${popupInfo.slug.current}`}>
                  {popupInfo.title}
                </Link>
              )}
              {popupInfo.report && (
                <Link href={`/blog/${popupInfo.report.slug.current}`}>
                  <Image
                    className="cursor-pointer"
                    src={popupInfo.coverImage.asset.url}
                    placeholder="blur"
                    blurDataURL={popupInfo.coverImage.asset.metadata.lqip}
                    width={
                      popupInfo.coverImage.asset.metadata.dimensions.width / 5
                    }
                    height={
                      popupInfo.coverImage.asset.metadata.dimensions.height / 5
                    }
                    objectFit="cover"
                    priority
                    alt=""
                  />
                </Link>
              )}
              {!popupInfo.report && (
                <Image
                  className="cursor-pointer"
                  src={popupInfo.coverImage.asset.url}
                  placeholder="blur"
                  blurDataURL={popupInfo.coverImage.asset.metadata.lqip}
                  width={
                    popupInfo.coverImage.asset.metadata.dimensions.width / 5
                  }
                  height={
                    popupInfo.coverImage.asset.metadata.dimensions.height / 5
                  }
                  objectFit="cover"
                  priority
                  alt=""
                />
              )}
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </>
  );
}
