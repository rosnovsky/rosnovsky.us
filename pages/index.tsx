import Link from 'next/link';

// import Timeline from '../components/Timeline';
import Container from '../components/Container';
import BlogPost from '../components/Blog/BlogPost';
import Subscribe from '../components/Cards/SubscribeCard';
import ProjectCard from '../components/Cards/ProjectCard';
// import VideoCard from '../components/VideoCard';

// export async function getStaticProps() {
//   const auth = await googleAuth.getClient();
//   const youtube = google.youtube({
//     auth,
//     version: 'v3'
//   });

//   const response = await youtube.videos.list({
//     id: 'Pd2tVxhFnO4,FytxaSVQROc,u_o09PD_qAs',
//     part: 'snippet,statistics'
//   });

//   return {
//     props: {
//       videos: response.data.items
//     },
//     revalidate: 60 * 60 // 1 hour
//   };
// }

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
        <h1 className="font-bold text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Rosnovsky Park™
        </h1>
        <h2 className="prose text-gray-600 dark:text-gray-400 mb-16">
          Hi! I’m Art, I work as a Customer Onboarding Engineer @ Auth0. <Link href="/about"><span className="text-blue-700 dark:text-blue-400  underline hover:cursor-pointer">AMA</span></Link>!
        </h2>
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 text-black dark:text-white">
          Featured Posts
        </h3>
        <BlogPost
          title="Weekly Update #3"
          summary="This one is a bit late and shorter than usual."
          slug="2021-04-20-weekly-update-3"
          publishedAt="2021/04/19"
        />
        {/* <BlogPost
          title="Everything I Know About Style Guides, Design Systems, and Component Libraries"
          summary="A deep-dive on everything I've learned in the past year building style guides, design systems, component libraries, and their best practices."
          slug="style-guides-component-libraries-design-systems"
        />
        <BlogPost
          title="How Stripe Designs Beautiful Websites"
          summary="Examining the tips and tricks used to make Stripe's website design a notch above the rest."
          slug="how-stripe-designs-beautiful-websites"
        />
        <BlogPost
          title="Creating a Monorepo with Lerna & Yarn Workspaces"
          summary="In this guide, you will learn how to create a Monorepo to manage multiple packages with a shared build, test, and release process."
          slug="monorepo-lerna-yarn-workspaces"
        /> */}
        <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-8 text-black dark:text-white">
          Projects
        </h3>
        
        <ProjectCard
          title="Sanity.io Autocomplete Dropdown plugin"
          description="This plugin creates a custom tags input field for Sanity Studio. This custom input field allows users to type tags, select existing ones from the dropdown or create new ones. This is handy if you want to offer authors an experience of 'type, hit Enter, repeat' for adding tags."
          href="https://www.sanity.io/plugins/autocomplete-tags"
          icon="react"
        />
        <ProjectCard
          title="Indian Stories and Legends of the Stillaguamish and Allied Tribes"
          description="Amateur painter, anthropologist, photographer, botanist, geologist, and musician, in 1926, he published a small book, Indian Stories and Legends of the Stillagaumish and Allied Tribes."
          href="https://native-stories.vercel.app"
          icon="css"
        />
        {/* <h3 className="font-bold text-2xl md:text-4xl tracking-tight mb-4 mt-12 text-black dark:text-white">
          Recent Tweets
        </h3> */}
        {/* {videos.map((video) => (
          <VideoCard key={video.id} {...video} />
        ))} */}
        {/* <Timeline /> */}
        <Subscribe />
      </div>
    </Container>
  );
}
