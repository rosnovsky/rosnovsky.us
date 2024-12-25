import { useEffect, useState, type JSX } from 'react';

const ViewsCount = ({
  currentPage,
}: {
  currentPage: string[];
}): JSX.Element => {
  const [views, setViews] = useState();

  useEffect(() => {
    const fetchViews = async () => {
      const visitsData = await fetch(`/visitors/count?page=${currentPage}`);
      const visits = await visitsData.json();

      setViews(visits);
    };

    fetchViews();
  }, [currentPage]);

  return (
    <span className="mt-8 text-base text-slate-400/90 md:mt-0">
      <a href="/blog/exploring-astro-db">Views</a> since Mar 13, 2024: {views}
    </span>
  );
};

export default ViewsCount;
