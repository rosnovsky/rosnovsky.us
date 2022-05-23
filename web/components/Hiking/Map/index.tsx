import ReactMapGL, {
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from 'react-map-gl';
import { memo, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from 'index';

const ICON = `M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z`;

const pinStyle = {
  cursor: 'pointer',
  fill: '#d00',
  stroke: 'none',
};

// @ts-expect-error ???
const Pin = memo(function Pin({ size = 20 }) {
  return (
    <svg height={size} viewBox="0 0 24 24" style={pinStyle}>
      <path d={ICON} />
    </svg>
  );
});

export default function Map({ posts }) {
  const [viewport, setViewport] = useState({
    viewport: {
      latitude: 47.02577533373375,
      longitude: -122.44353688197594,
      zoom: 6,
    },
  });
  const [popupInfo, setPopupInfo] = useState<BlogPost | null>();

  const pins = useMemo(
    () =>
      posts.map((hike, index) => (
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
      )),
    [posts]
  );

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
        <NavigationControl position="top-left" />
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
              <Link href={`/blog/${popupInfo.slug.current}`}>
                {popupInfo.title}
              </Link>
              <Link href={`/blog/${popupInfo.slug.current}`}>
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
            </div>
          </Popup>
        )}
      </ReactMapGL>
    </>
  );
}
