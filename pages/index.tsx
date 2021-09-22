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
          Hi! I’m Art, Software Engineer from <a href="https://www.google.com/maps/place/Arlington,+WA/@48.1741806,-122.1844234,13z/" target="_blank" rel="noreferrer noopener" ><span className="text-green-700 font-semibold hover:text-green-900 dark:hover:text-green-200 dark:text-green-400 underline hover:cursor-pointer">Arlington, WA</span></a>. I work as a Customer Onboarding Engineer @ Auth0. <Link href="/about" passHref><span className="text-green-700 dark:text-green-400  underline hover:cursor-pointer font-semibold hover:text-green-900 dark:hover:text-green-200">AMA</span></Link>!
        </h2>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          Featured Posts
        </h3>
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
        <BlogPost
          title="2020, you won't be missed"
          summary="This by far the worst year in generations is coming to a close. It won't be missed, yet it will remain in our memory, history books, and our shared trauma will take decades to heal. Here's to 2021, hopefully, a better year."
          slug="2020-you-won-t-be-missed"
          publishedAt="2020/12/31"
        />
        <BlogPost
          title="Dynamic comments for a static website"
          summary="For the past couple of months, I've been working on a comment feature for this blog. Now that it's almost finished, I invite you to check it out along with some implementation details."
          slug="dynamic-comments-for-a-static-website"
          publishedAt="2021/01/13"
        />
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          Projects
        </h3>

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
          icon="css"
        />
        <SubscribeCard />
      </div>
    </Container>
  );
}
