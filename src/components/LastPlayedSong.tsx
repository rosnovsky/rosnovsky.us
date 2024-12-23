import { useEffect, useState } from 'preact/hooks';

// This is NOT how it works. Don't ask.
export const prerender = false;

interface CurrentMusic {
  albumArt: string;
  title: string;
  grandparentTitle: string;
}

const getMusicData = async (): Promise<CurrentMusic | null> => {
  try {
    const response = await fetch('https://rosnovsky.us/api/now-playing');
    const data = await response.json();
    return data[0];
  } catch (error) {
    console.error('Error fetching music data:', error);
    return null;
  }
};

const getAlbumArtUrl = (path: string) => {
  const baseUrl = 'https://music.rosnovsky.us';
  return new URL(path, baseUrl).toString();
};

export default function LastPlayedSong() {
  const [currentMusic, setCurrentMusic] = useState<CurrentMusic | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await getMusicData();
      setCurrentMusic(data);
    };

    getData();

    return () => {
      setCurrentMusic(null);
    };
  }, []);

  if (!currentMusic) {
    return (
      <div
        className="absolute left-12 top-full inline-flex h-12 w-max -translate-y-6 items-center justify-center gap-3.5 rounded-2xl bg-white/90 px-8 text-sm font-semibold text-slate-700 shadow-lg shadow-emerald-100/50 ring-1 ring-slate-900/5 backdrop-blur-md dark:bg-slate-950/30 dark:text-slate-400 dark:shadow-emerald-950/50 dark:ring-slate-100/5 md:left-0 md:-translate-x-20 md:-translate-y-24 lg:-left-3 lg:-translate-y-24 lg:px-10 xl:-left-6 xl:-translate-x-28 xl:-translate-y-32"
      >
        <img src="/react.svg" alt="" className="h-6 w-auto" />🔥🔥🔥
      </div>
    );
  }

  return (

    <a
      href="https://music.rosnovsky.us"
      aria-label={`Now playing: ${currentMusic.title} by ${currentMusic.grandparentTitle}`}
    >
      <div className="absolute left-12 top-full md:top-[580px] flex h-24 w-max -translate-y-6 rounded-2xl bg-white/90 text-sm font-semibold text-slate-700 shadow-lg shadow-emerald-100/50 ring-1 ring-slate-900/5 backdrop-blur-md dark:bg-slate-950/30 dark:text-slate-400 dark:shadow-emerald-950/50 dark:ring-slate-100/5 md:left-0 md:-translate-x-20 md:-translate-y-24 lg:-left-3 lg:-translate-y-24 xl:-left-6 xl:-translate-x-28 xl:-translate-y-32 ">
        <div className="flex h-24 items-center rounded-l-2xl">
          <span
            className="-rotate-180 px-2 text-[11px] font-thin tracking-wide text-yellow-900/70 dark:text-yellow-100/80"
            style={{ writingMode: 'vertical-lr' }} aria-hidden="true"
          >
            LAST PLAYED
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-3.5 px-8 lg:px-10">
          <div className="flex items-center gap-3">
            <img
              src={getAlbumArtUrl(currentMusic.albumArt)}
              alt={`Album art for ${currentMusic.title}`}
              className="h-12 w-12 rounded-lg"
              loading="lazy"
            />
            <div className="flex flex-col">
              <span className="truncate text-sm font-semibold">
                {currentMusic.title}
              </span>
              <span className="truncate text-xs text-slate-500 dark:text-slate-200">
                {currentMusic.grandparentTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
