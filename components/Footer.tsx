import Link from 'next/link';
import StatusIndicator from './StatusIndicator';
import ExternalLink from './ExternalLink';

import NowPlaying from './Utils/NowPlaying';

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-4xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <NowPlaying />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <span className="text-gray-500 hover:text-gray-600 transition">
            <Link href="/" passHref>
              Home
            </Link>
          </span>
          <span className="text-gray-500 hover:text-gray-600 transition">
            <Link href="/about" passHref>
              About
            </Link>
          </span>
        </div>
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://twitter.com/rosnovsky">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://github.com/rosnovsky">
            GitHub
          </ExternalLink>
        </div>
        <div className="flex flex-col space-y-4">
          <StatusIndicator />
        </div>
      </div>
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="text-center text-gray-600 text-sm">
        <p className="mb-2">© 2003-{new Date().getFullYear()} Art Rosnovsky</p>
        <p>
          Built with ❤️ and 🙇‍♂️ on Snohomish, Stillaguamish and other Puget
          Salish ancestral lands.{' '}
          <span className="underline hover:cursor-pointer">
            <Link href="/acknowledgment">Land Acknowledgment</Link>
          </span>
        </p>
      </div>
    </footer>
  );
}
