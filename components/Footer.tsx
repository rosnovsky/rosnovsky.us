import Link from 'next/link';

import NowPlaying from './Utils/NowPlaying';

const ExternalLink = ({ href, children }) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
  >
    {children}
  </a>
);

export default function Footer() {
  return (
    <footer className="flex flex-col justify-center items-start max-w-2xl mx-auto w-full mb-8">
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <NowPlaying />
      <div className="w-full max-w-2xl grid grid-cols-1 gap-4 pb-16 sm:grid-cols-3">
        <div className="flex flex-col space-y-4">
          <Link href="/">
            <a className="text-gray-500 hover:text-gray-600 transition">Home</a>
          </Link>
          <Link href="/about">
            <a className="text-gray-500 hover:text-gray-600 transition">
              About
            </a>
          </Link>
          {/* <Link href="/newsletter">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Newsletter
            </a>
          </Link> */}
        </div>
        
          {/* <ExternalLink href="https://www.youtube.com/channel/UCZMli3czZnd1uoc1ShTouQw">
            YouTube
          </ExternalLink> */}
        <div className="flex flex-col space-y-4">
          <ExternalLink href="https://twitter.com/rosnovsky">
            Twitter
          </ExternalLink>
          <ExternalLink href="https://github.com/rosnovsky">
            GitHub
          </ExternalLink>
          {/* <Link href="/uses">
            <a className="text-gray-500 hover:text-gray-600 transition">Uses</a>
          </Link> */}
          {/* <Link href="/snippets">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Snippets
            </a>
          </Link> */}
          {/* <Link href="/tweets">
            <a className="text-gray-500 hover:text-gray-600 transition">
              Tweets
            </a>
          </Link> */}
        </div>
      </div>
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="text-center text-gray-600 text-sm">
        <p className="mb-2">© 2003-{new Date().getFullYear()} Art Rosnovsky</p>
        <p>
          Built with ❤️ and 🙇‍♂️ on Snohomish, Sauk-Suiattle, Tulalip, Duwamish,
          and other Puget Salish ancestral lands.
        </p>
      </div>
    </footer>
  );
}
