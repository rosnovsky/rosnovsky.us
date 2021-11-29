import useSWR from 'swr';

import fetcher from '../../lib/fetcher';
import MetricCard from './MetricCard';


const url = process.env.NODE_ENV === "test" ? 'https://rosnovsky.us/api/comments/getCommentsCount' : '/api/comments/getCommentsCount'
export default function CommentsPosted() {
  const { data, error } = useSWR(url, fetcher);
  if (!data) return <MetricCard header="Comments Posted by visitors" metric="..." />;
  if (error) return <MetricCard header="Comments Posted by visitors" metric="(broken)" />;
  return (
    <MetricCard
      header="Comments Posted by visitors"
      metric={data.totalComments}
    />
  );
}
