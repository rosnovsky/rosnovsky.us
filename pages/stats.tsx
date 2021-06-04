import Link from 'next/link';

// import Analytics from '@/components/metrics/Analytics';
import Subscribe from '../components/Cards/SubscribeCard';
import Container from '../components/Container';
import GitHub from '../components/metrics/Github';
import Buttondown from '../components/metrics/Buttondown';
import Gumroad from '../components/metrics/Gumroad';
// import Unsplash from '@/components/metrics/Unsplash';
// import YouTube from '@/components/metrics/Youtube';
import TopTracks from '../components/TopTracks';

export default function Stats() {
  return (
    <Container
      title="Stats – Art Rosnovsky"
      description="My personal statistics, built with Next.js API routes deployed as serverless functions."
    >
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Stats
        </h1>
        <div className="mb-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            This Stats page is work in progress. It's inspired by <a href="https://leerob.io/dashboard" className="underline text-green-800 dark:text-green-300">Lee Robinson's Dashboard</a> (as is the rest of the website), and I will customize it with my own points of data. Eventually :)
          </p>
        </div>
        <div className="flex flex-col w-full">
          {/* <Unsplash />
          <YouTube />
        </div>
        */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
            {/* <Analytics /> */}
            <GitHub />
            <Gumroad />
          </div>
          
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <Buttondown />
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Top Tracks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          These are my Top Tracks on Spotify. I listen to Apple Music and Spotify interchangebly, leaning towards Spotify in recent months. 
        </p>
        <TopTracks />
        <Subscribe />
      </div>
      </div>
    </Container>
  );
}
