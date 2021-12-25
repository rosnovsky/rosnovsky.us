import Link from 'next/link';

import Container from '../components/Container';
import BlogPost from '../components/Blog/BlogPost';
import SubscribeCard from '../components/Cards/SubscribeCard';
import ProjectCard from '../components/Cards/ProjectCard';

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
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
        <section aria-label="Featured Posts">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
            Featured Posts
          </h3>
          <BlogPost
            title="Building This Website: Meditation Through Code"
            summary="It's funny how I spend a lot of my free time on tweaking this website, improving this or that, adding a random feature, or falling down a rabbit hole of some technology I may eventually want to use here. Yet its main purpose - it's a blog, damn it! - happens to be mostly neglected."
            slug="meditation-through-code"
            publishedAt="2021/12/19"
            cover="https://static.cascadiajs.com/2021/graphic-recordings/michelle-bakels.jpg"
          />
          <BlogPost
            title="CascadiaJS 2021"
            summary="I wanted to attend CascadiaJS for a few years and it finally happened. I've got a few takeaways I want to share with you here."
            slug="cascadiajs-2021"
            publishedAt="2021/11/04"
          />
          <BlogPost
            title="Journaling"
            summary="I've been writing stuff that nobody reads for a long time. Now I not only do it here but also in a private paper-based journal. And it's been a gamechanger in the past few months."
            slug="journaling"
            publishedAt="2021-10-14"
          />
          <BlogPost
            title="Moonlander Keyboard"
            summary="I've updated my keyboarded recently. It's been a frustraring, fullfilling, and invigorating experience so far."
            slug="moonlander-keyboard"
            publishedAt="2021/09/17"
          />
          <BlogPost
            title="Using AI vision to generate alt text for images"
            summary="Let's make sure that you never miss an alt text in your image tags using Azure Computer Vision."
            slug="alt-text"
            publishedAt="2021/06/21"
          />
        </section>

        <section aria-label="Projects">
          <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
            Projects
          </h3>
          <div className="mb-5 flex flex-col justify-center items-start max-w-2xl mx-auto">
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
