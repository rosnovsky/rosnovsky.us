import SubscribeCard from '../components/Cards/SubscribeCard';
import Container from '../components/Container';
import GitHub from '../components/metrics/Github';
import Buttondown from '../components/metrics/Buttondown';
import Gumroad from '../components/metrics/CommentsCount';
import TopTracks from '../components/TopTracks';
import CommentsPosted from '../components/metrics/CommentsCount';
import Link from 'next/link';
import Fathom from '@components/metrics/Fathom';

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
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
            <GitHub />
            <CommentsPosted />
          </div>
          
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 my-2 w-full">
          <Buttondown />
          <Fathom />
        </div>
        <h2 className="font-bold text-3xl tracking-tight mb-4 mt-16 text-black dark:text-white">
          Last Played Tracks
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          These are the last 10 tracks I've listened to on Apple Music. Don't judge!
        </p>
        <TopTracks />
        <SubscribeCard />
      </div>
      </div>
    </Container>
  );
}
