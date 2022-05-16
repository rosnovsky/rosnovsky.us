import { NextApiRequest, NextApiResponse } from 'next';
import { getLastPlayedAppleMusicTracks } from '@lib/music';

export default async (_req: NextApiRequest, res: NextApiResponse) => {
  const response = await getLastPlayedAppleMusicTracks();
  const { data } = await response.json();

  const tracks = data.map((track) => ({
    title: track.attributes.name,
    album: track.attributes.albumName,
    artist: track.attributes.artistName,
    albumImageUrl: track.attributes.artwork.url.replace('{w}x{h}', '300x300'),
    songUrl: track.attributes.url,
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ tracks });
};
