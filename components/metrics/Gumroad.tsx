import useSWR from 'swr';
import format from 'comma-number';

import fetcher from '../../lib/fetcher';
import MetricCard from './MetricCard';

export default function Gumroad() {
  const { data } = useSWR('/api/gumroad', fetcher);

  const sales = format(data?.sales);
  const link = 'https://gumroad.com/rosnovsky';

  return (
    <MetricCard
      header="Gumroad Sales"
      link={link}
      metric={sales && `$${sales}`}
    />
  );
}
