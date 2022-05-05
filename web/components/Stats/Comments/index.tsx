import fetcher from '@lib/fetcher';
import useSWR from 'swr';

const Comments = () => {
  const { data, error } = useSWR('/api/comments/getCommentsCount', fetcher, {
    refreshInterval: 30,
  });
  if (error) return <div>Failed to load</div>;
  if (!data) return <div>...</div>;
  return (
    <div className="w-full md:w-1/3 lg:w-1/4 px-4 mb-8 lg:mb-0">
      <h2 className="mb-2 font-bold text-4xl md:text-5xl text-coolGray-900 tracking-tighter">
        {data.totalComments}
      </h2>
      <p className="text-lg md:text-xl text-coolGray-500 font-medium">
        Comments
      </p>
    </div>
  );
};

export default Comments;
