import useSWR from 'swr';

import fetch from 'isomorphic-fetch';

import Track from '../components/Track';
import Link from 'next/link';

const fetcher = async (url: string) =>
  await fetch(url).then((res) => res.json());

const url =
  process.env.NODE_ENV === 'test'
    ? 'https://rosnovsky.us/api/top-tracks'
    : '/api/top-tracks';

export default function TopTracks() {
  const { data, error } = useSWR(url, fetcher);

  if (!data) return <div>Loading Songs...</div>;
  if (error) return <div>Something went terribly wrong: {error.message}</div>;

  return (
    <div className="mb-5">
      {data?.tracks.map((track) => (
        <div
          key={track.songUrl}
          className="dark:border-gray-800 border-b border-gray-100"
        >
          <Track track={track} />
        </div>
      ))}
      <div className="text-xs text-right text-black mt-2 dark:text-white">
        ℹ{' '}
        <Link href="/blog/apple-music" passHref>
          <span className="hover:underline text-black cursor-pointer dark:text-white">
            How it works
          </span>
        </Link>
      </div>
    </div>
  );
}
