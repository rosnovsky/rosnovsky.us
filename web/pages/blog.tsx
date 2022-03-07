import Container from '@components/Container';
import SubscribeCard from '@components/Cards/SubscribeCard';
import { InstantSearch } from '@components/InstantSearch';
import { useRouter } from 'next/router';
import { BlogPost } from 'index';
import client, {
  getClient,
  usePreviewSubscription,
  PortableText,
} from '@lib/sanity';
import { groq } from 'next-sanity';

export default function Blog(props) {
  const { postdata, preview } = props;

  const router = useRouter();

  const { data: blogPosts } = usePreviewSubscription(query, {
    initialData: postdata,
    enabled: preview || router.query.preview !== undefined,
  });

  return (
    <Container title="Blog – Art Rosnovsky" description="A bunch of nonsense.">
      <div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
        <h1 className="font-bold font-heading text-3xl md:text-5xl tracking-tight mb-4 text-black dark:text-white">
          Blog
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {`My first blog on Livejournal was established in 2003. I've started this one in 2019, posting ${blogPosts.length} blog posts.`}
        </p>
        <InstantSearch posts={blogPosts} />
        <SubscribeCard />
      </div>
    </Container>
  );
}

const query = groq`
*[_type == "post"] | order(_createdAt desc) {
  ..., 
  categories[]->,
  coverImage {
    ...,
    asset->
  }
}
`;

export async function getStaticProps({ preview = false }) {
  const posts = await getClient(preview).fetch(query);

  return {
    props: {
      postdata: posts,
      preview,
    },
    revalidate: 10,
  };
}
