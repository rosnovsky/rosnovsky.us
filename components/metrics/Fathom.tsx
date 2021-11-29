import useSWR from 'swr';
import format from 'comma-number';

import fetcher from '../../lib/fetcher';
import MetricCard from './MetricCard';

export default function Fathom() {
  const { data } = useSWR('/api/fathom/uniquesThisMonth', fetcher);

  const stars = format(data?.uniques);
  const link = 'https://usefathom.com/ref/NB77IT';

  return <MetricCard header="Unique Visitors this month" link={link} metric={stars} />;
}
