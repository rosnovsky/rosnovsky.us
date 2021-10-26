import useSWR from 'swr';

import fetcher from '../../lib/fetcher';
import MetricCard from './MetricCard';

export default function CommentsPosted() {
  const { data, error } = useSWR('/api/comments/getCommentsCount', fetcher);
  if(!data) return <MetricCard header="Comments Posted by visitors" metric="..." />;
  if(error) return <MetricCard header="Comments Posted by visitors" metric="(broken)" />;
  return (
    <MetricCard
      header="Comments Posted by visitors"
      metric={data.totalComments}
    />
  );
}
