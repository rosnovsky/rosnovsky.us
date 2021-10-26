import { getLastPlayed, getLastPlayedAppleMusicTrack, AppleMusicTrack } from '../../lib/spotify';

export default async (_, res) => {
 // const response = await getLastPlayed();
    const appleResponse = await getLastPlayedAppleMusicTrack();
  // const track = await response.json();
  const appleTrack: AppleMusicTrack = await appleResponse.json();
   // const song = track.items[0].track;
    const appleSong = appleTrack.data[0]

    // const title = song.name;
    const { name, albumName, artistName, artwork } = appleSong.attributes
  // const artist = song.artists.map((_artist) => _artist.name).join(', ');
  // const album = song.album.name;
  // const albumImageUrl = song.album.images[0].url;
  // const songUrl = song.external_urls.spotify;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=2, stale-while-revalidate=1',
  );
// temp artwork url instead of song URL (need to find this first)
  return res.status(200).json({
      album: albumName,
      albumImageUrl: artwork.url,
      artist: artistName,
      songUrl: artwork.url,
      title: name,
  });
};
