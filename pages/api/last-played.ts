import { getLastPlayed } from '../../lib/spotify';

export default async (_, res) => {
  const response = await getLastPlayed();

  const track = await response.json();

  const song = track.items[0].track;

  const title = song.name;
  const artist = song.artists.map((_artist) => _artist.name).join(', ');
  const album = song.album.name;
  const albumImageUrl = song.album.images[0].url;
  const songUrl = song.external_urls.spotify;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=2, stale-while-revalidate=1'
  );

  return res.status(200).json({
    album,
    albumImageUrl,
    artist,
    songUrl,
    title
  });
};
