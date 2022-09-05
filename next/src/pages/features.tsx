import { createSSGHelpers } from '@trpc/react/ssg';
import { appRouter } from '../server/router';
import {
  InferGetStaticPropsType,
} from 'next';
import superjson from 'superjson';
import Container from '../components/Container';
import { trpc } from '../utils/trpc';

const Features = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const { posts } = props;

  const status = trpc.useQuery(['meta.getStatus'])

  return (
    <Container
      title={`Rosnovsky Park – Art Rosnovsky`}
      description={"Hey, I'm Art, and we need to talk. Seriously."}
      type="website"
    >

      <div className="py-10 md:py-28">
        <div className="container px-4 mx-auto">
          <div
            className="flex flex-wrap xl:items-center -mx-4"
            style={{
              backgroundImage: `url(
              '/flex-ui-assets/elements/pattern-light-big.svg'
            )`,
              backgroundPosition: 'center',
            }}
          >
            {status?.data?.map((item) => <div className="flex flex-row mx-auto content-between" key={item.monitor}>{item.monitor}: &nbsp; <b>{item.status}</b></div>)}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Features;

export async function getStaticProps() {
  const ssg = createSSGHelpers({
    router: appRouter,
    ctx: {},
    transformer: superjson, // optional - adds superjson serialization
  });
  // prefetch `post.byId`
  const uniquesThisMonth = await ssg.fetchQuery('meta.getUniqueVisitors');
  const posts = await ssg.fetchQuery('blog.getPosts')

  return {
    props: {
      trpcState: ssg.dehydrate(),
      uniquesThisMonth,
      posts
    },
    revalidate: 400,
  };
}
