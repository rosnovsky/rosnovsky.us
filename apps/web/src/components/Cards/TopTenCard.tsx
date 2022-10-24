import { Publisher, Author } from 'index'
import Link from 'next/link'

export const TopTenCard = ({ data }: { data: Author[] | Publisher[] }) => {

  const cleanStats = data.filter(item => item.name !== "undefined")
  const sortedStats = cleanStats.sort((a, b) => b.totalBooks - a.totalBooks)
  const topTenStats = sortedStats.slice(0, 10)
  return (
    <div className='mb-10 sm:w-1/2 lg:w-1/3 w-full flex-wrap text-zinc-900 dark:text-zinc-200'>
      <h2 className="text-xl font-semibold leading-6 text-gray-900 dark:text-zinc-100 mb-3">Top 10 {data[0]?._type}s</h2>
      <ol className='ml-3 mb-0'>
        {topTenStats.map((kind) => (
          <li key={kind.name} className="prose">
            <Link href={`/library/${kind._type}/${kind.slug?.current}`}>{kind.name}</Link>: {kind.totalBooks} books
          </li>
        ))}
      </ol>
    </div>
  )
} 
