import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import Track from '../components/Track';

export default function TopTracks() {
  const { data } = useSWR('/api/top-tracks', fetcher);

  if (!data) {
    return null;
  }

  return data.tracks.map((track) => (
    <div key={track.songUrl} className="dark:border-gray-800 border-b border-gray-100"><Track track={track} /></div>
  ));
}
