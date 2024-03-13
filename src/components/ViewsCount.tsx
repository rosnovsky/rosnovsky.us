import { useEffect, useState } from 'preact/hooks'

const ViewsCount = ({ currentPage }: { currentPage: string[] }): JSX.Element => {
  const [views, setViews] = useState()

  useEffect(() => {
    const fetchViews = async () => {
      const visitsData = await fetch(`/visitors/count?${currentPage}`)
      const visits = await visitsData.json()

      setViews(visits)
    }

    fetchViews()
  }, [currentPage])

  return (
    <span className="mt-8 text-base text-slate-400/90 md:mt-0">Views: {views}</span>
  );
}

export default ViewsCount;
