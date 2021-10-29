import useSWR from 'swr';

import fetcher from '../../lib/fetcher';

export default function NowPlaying() {
  const { data } = useSWR('/api/last-played', fetcher, {
    refreshInterval: 18000,
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    focusThrottleInterval: 9000
  });
  return (
    <>
      <div className="flex justify-items-center flex-row w-full mt-3 mb-10">
        <span className="text-gray-800 -rotate-90 font-bold font-mono text-xs dark:text-gray-200">Last&nbsp;Played<div><img className="mx-auto" src="../static/images/backend/apple-music-logo.png" alt="Apple Music Logo" width="50" /></div></span>
        
        <img src="https://current-music.vercel.app/last-played" alt="Last Played" className="w-full h-full object-cover rounded-lg shadow-lg" />
      </div>
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
    </>

  );
}
