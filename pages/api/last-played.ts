import { getLastPlayedAppleMusicTrack } from '../../lib/music';
import type { AppleMusicTrack } from '../../index'
import { NextApiRequest, NextApiResponse } from 'next';


export default async (req: NextApiRequest, res: NextApiResponse) => {
  const appleResponse = await getLastPlayedAppleMusicTrack();
  const appleTrack: AppleMusicTrack = await appleResponse.json();

  const { name, albumName, artistName, artwork, url } = appleTrack.data[0].attributes

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=2, stale-while-revalidate=1',
  );

  return res.status(200).json({
      album: albumName,
      albumImageUrl: artwork.url.replace('{w}x{h}', '300x300'),
      artist: artistName,
      songUrl: url,
      title: name,
  });
};
