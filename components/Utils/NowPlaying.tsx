import useSWR from 'swr';

import fetcher from '../../lib/fetcher';

export default function NowPlaying() {
  const { data } = useSWR('/api/last-played', fetcher, {
    refreshInterval: 18000,
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
    focusThrottleInterval: 9000
  });
console.info(data)
  return (
    <div className="flex flex-row sm:flex-row mb-8 space-x-0 sm:space-x-2 w-full">
      <span className="text-gray-800 dark:text-gray-200">Last&nbsp;Played:</span>
      

      <div className="inline-flex flex-col sm:flex-row w-full max-w-full truncate">
        {data?.isPlaying ? (
          <a
            className="text-gray-800 dark:text-gray-200 font-medium  max-w-max truncate"
            href={data.songUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            {data.title}
          </a>
        ) : (
          <p className="text-gray-800 dark:text-gray-200 font-medium">
            <a
              className="text-gray-800 dark:text-gray-200 font-medium  max-w-max truncate"
              href={data?.songUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {data?.title}
            </a>
          </p>
        )}
        <span className="mx-2 text-gray-500 dark:text-gray-300 hidden sm:block">
          {' – '}
        </span>
        <p className="text-gray-500 dark:text-gray-300 max-w-max truncate">
          {data?.artist ?? 'Apple Music'}
        </p>
      </div>
    </div>
  );
}
