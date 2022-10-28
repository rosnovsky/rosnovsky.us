import { pluralize } from '@/lib/helpers'
import { Publisher, Author, Genre } from 'index'
import Link from 'next/link'

export const TopTenCard = ({ data }: { data: Author[] | Publisher[] | Genre[] }) => {

  const cleanStats = data.filter(item => item.name !== "undefined")
  const sortedStats = cleanStats.sort((a, b) => b.totalBooks - a.totalBooks)
  const topTenStats = sortedStats.slice(0, 10)
  return (
    <div
      className="relative overflow-hidden rounded-lg bg-white dark:bg-zinc-800 px-4 py-5  shadow sm:px-6 sm:pt-6"
    >
      <div className=' text-zinc-900 dark:text-zinc-200'>
        <h2 className="text-xl font-semibold leading-6 text-gray-900 dark:text-zinc-100 mb-3">Top 10 {data[0]?._type}s</h2>
        <ol className='ml-3 mb-0'>
          {topTenStats.map((kind) => (
            <li key={kind.name} className="prose">
              <Link href={`/library/${kind._type}/${kind.slug?.current}`}>{kind.name}</Link>: <span className="text-zinc-800 dark:text-zinc-400">{pluralize(kind.totalBooks, "book")} </span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
} 
