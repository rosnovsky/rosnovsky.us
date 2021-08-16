import Link from 'next/link';
import { useEffect, useState } from 'react';

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
  const [status, setStatus] = useState(null);
  useEffect(() => {
    const getStatus = async () => {
      const status = fetch(`https://rosnovsky.us/api/status`).then(res => res.json()).then(result => { setStatus(result); return result }).catch(err => { console.error(err); });
      return status
    }
    getStatus();
  }, []);
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
          !!!
        </div>
        <div className="flex flex-col space-y-4">

          <ExternalLink href="https://status.rosnovsky.us">
            <svg className="inline-block mr-2" height="10" width="10">
              <circle cx="5" cy="5" r="5" fill={status === "up" ? "green" : "red"} />
            </svg>
            Status
          </ExternalLink>
        </div>
      </div>
      <hr className="w-full border-1 border-gray-200 dark:border-gray-800 mb-8" />
      <div className="text-center text-gray-600 text-sm">
        <p className="mb-2">© 2003-{new Date().getFullYear()} Art Rosnovsky</p>
        <p>
          Built with ❤️ and 🙇‍♂️ on Snohomish, Stillaguamish
          and other Puget Salish ancestral lands. <span><Link href="/acknowledgment" passHref><span className="underline hover:cursor-pointer">Land Acknowledgment</span></Link></span>
        </p>
      </div>
    </footer>
  );
}
