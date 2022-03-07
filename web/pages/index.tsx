import Link from 'next/link';

import Container from '@components/Container';
import BlogPost from '@components/Blog/BlogPost';
import SubscribeCard from '@components/Cards/SubscribeCard';
import ProjectCard from '@components/Cards/ProjectCard';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
        <h1 className="font-heading  font-black text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Rosnovsky Park™
        </h1>
        <h2 className="prose text-gray-600 dark:text-gray-400 mb-16">
          Hi! I’m Art, Software Engineer from{' '}
          <a
            href="https://www.google.com/maps/place/Arlington,+WA/@48.1741806,-122.1844234,13z/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <span className="text-green-700 font-semibold hover:text-green-900 dark:hover:text-green-200 dark:text-green-400 underline hover:cursor-pointer">
              Arlington, WA
            </span>
          </a>
          . I work as a Customer Onboarding Engineer @ Auth0 (part of Okta).{' '}
          <Link href="/about" passHref>
            <span className="text-green-700 dark:text-green-400  underline hover:cursor-pointer font-semibold hover:text-green-900 dark:hover:text-green-200">
              AMA
            </span>
          </Link>
          !
        </h2>
        <section className="mb-10" aria-label="Featured Posts">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-7 text-black font-heading dark:text-white">
            Featured Posts
          </h3>
        </section>

        <section aria-label="Projects">
          <h3 className="font-bold font-heading text-2xl md:text-4xl tracking-tight mb-7 mt-8 text-black dark:text-white">
            Projects
          </h3>
          <div className="mb-5 flex flex-col justify-center items-start max-w-4xl mx-auto">
            <ProjectCard
              title="Current Music: Apple Music"
              description="This project generates an SVG image featuring the last song you listened to on Apple Music."
              href="https://github.com/rosnovsky/current-apple-music"
              icon="ts"
            />
            <ProjectCard
              title="Sanity.io Autocomplete Tags plugin"
              description="This plugin creates a custom tags input field for Sanity Studio. This custom input field allows users to type tags, select existing ones from the dropdown or create new ones. This is handy if you want to offer authors an experience of 'type, hit Enter, repeat' for adding tags."
              href="https://www.sanity.io/plugins/autocomplete-tags"
              icon="react"
            />
            <ProjectCard
              title="Indian Stories and Legends of the Stillaguamish and Allied Tribes"
              description="Amateur painter, anthropologist, photographer, botanist, geologist, and musician, in 1926, Nels Bruseth published a small book, Indian Stories and Legends of the Stillagaumish and Allied Tribes."
              href="https://native-stories.vercel.app"
              icon="site"
            />
          </div>
        </section>
        <SubscribeCard />
      </div>
    </Container>
  );
}
