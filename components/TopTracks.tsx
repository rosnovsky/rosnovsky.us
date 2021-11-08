import useSWR from 'swr';

import fetcher from '../lib/fetcher';
import Track from '../components/Track';
import Link from 'next/link';

export default function TopTracks() {
  const { data } = useSWR('/api/top-tracks', fetcher);

  if (!data) {
    return null;
  }

  return <div className="mb-5">{data.tracks.map((track) => (
    <div key={track.songUrl} className="dark:border-gray-800 border-b border-gray-100"><Track track={track} /></div>
  ))}<div className="text-xs text-right text-black mt-2 dark:text-white">ℹ <Link href="/blog/apple-music" passHref><span className="hover:underline text-black cursor-pointer dark:text-white">How it works</span></Link></div></div>;
}
