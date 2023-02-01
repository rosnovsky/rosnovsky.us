import { Suspense } from 'react';
import Metacard from '@/components/metaCard'

export const MetacardComponent = ({
  value,
}: {
  value: { url: string; size?: string; media?: string };
}) => {
  return (
    <div className="min-w-full mx-auto my-3 justify-center">
      <Suspense fallback={<div>Loading...</div>}>
        <Metacard {...value} />
      </Suspense>
    </div>
  );
}
