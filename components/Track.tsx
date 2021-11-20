import Image from 'next/image';
import { shimmer, toBase64 } from './Utils/MDXComponents';

export default function Track({ track }) {
  return (
    <div className="flex flex-row max-w-3xl pl-2 pt-1 mt-8">
      <div>
        <Image
          className="w-full"
          width="50"
          height="50"
          src={track.albumImageUrl}
          placeholder="blur"
          blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(50, 50))}`}
          alt={track.title}
          layout="intrinsic"
        />
      </div>
      <div className="flex flex-col pl-5">
        <a
          className="font-medium xl:w-96 text-gray-900 dark:text-gray-100 truncate sm:w-96 md:w-full"
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {track.title}
        </a>
        <p
          className="text-gray-500 mb-4 truncate w-60 sm:w-96 md:w-full"
          color="gray.500"
        >
          {track.artist}
        </p>
      </div>
    </div>
  );
}
