import { Suspense, lazy } from 'preact/compat'
const ViewsCount = lazy(() => import('./ViewsCount')) 

export const Views = ({ currentPage }: { currentPage: string[] }) => {
  return (
    <Suspense fallback={<div>Loading Views...</div>}>
      <ViewsCount currentPage={currentPage} />
    </Suspense>
  )
}
