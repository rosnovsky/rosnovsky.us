import Comment from '@components/Comments/Comment';
import useSWR from 'swr';
import { sanityFetcher } from '@lib/fetcher';
import { PostComment } from 'index';

type SWRProps = {
  comments: PostComment[];
  error: Error | null;
};

const Comments = ({ slug }) => {
  const { data, error } = useSWR<SWRProps>(slug, sanityFetcher, {
    refreshInterval: 500,
    revalidateIfStale: true,
    refreshWhenHidden: true,
    dedupingInterval: 10000,
    errorRetryInterval: 10000,
    errorRetryCount: 3,
    focusThrottleInterval: 10000,
    revalidateOnMount: true,
    revalidateOnReconnect: true,
    revalidateOnFocus: true,
  });

  if (error) return <p>Failed to load.</p>;
  if (!data) return <p>Loading...</p>;

  if (data.comments?.length === 0)
    return <div className="mt-5">No Comments</div>;
  return data.comments.map((comment) => (
    <Comment key={comment._id} comment={comment} />
  ));
};

export default Comments;
