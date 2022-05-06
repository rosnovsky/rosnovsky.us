import fetcher from '@lib/fetcher';
import useSWR from 'swr';

const Visitors = () => {
  const { data, error } = useSWR('/api/fathom/uniquesThisMonth', fetcher, {
    refreshInterval: 30000,
  });
  if (error) {
    console.error(error);
  }

  return (
    <div className="w-full md:w-1/3 lg:w-1/4 px-4">
      <h2 className="mb-2 font-bold text-4xl md:text-5xl text-coolGray-900 tracking-tighter">
        {data?.uniques ? data.uniques : '...'}
      </h2>
      <p className="text-lg md:text-xl text-coolGray-500 font-medium">
        Visitors This Month
      </p>
    </div>
  );
};

export default Visitors;
