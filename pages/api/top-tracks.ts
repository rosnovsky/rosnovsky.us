import { NextApiRequest, NextApiResponse } from 'next';
import { AppleMusicTrack } from '../..';
import { getLastPlayedAppleMusicTracks } from '../../lib/music';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await getLastPlayedAppleMusicTracks();
  const { data }: AppleMusicTrack = await response.json();

  const tracks = data.map((track) => ({
    artist: track.attributes.artistName,
    songUrl: track.attributes.url,
    title: track.attributes.name
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ tracks });
};
