import { StatsCard } from 'index'
import { bookIcon, openBookIcon, calendarIcon } from '../Icons/Icons'


export default function LibraryStatsComponent({ stats }) {
  const statsCards: StatsCard[] = [
    { id: 1, name: 'Total books', stat: stats.totalBooks, icon: bookIcon, secondStat: Math.ceil((stats.totalRead / stats.totalBooks) * 100), },
    { id: 2, name: 'Total pages', stat: stats.totalPagesFormatted, icon: openBookIcon, secondStat: Math.ceil((stats.totalPagesRead / stats.totalPages) * 100), },
    { id: 3, name: 'Total reading time', stat: `${stats.totalReadingTimeInYears} years`, icon: calendarIcon, secondStat: Math.ceil((stats.totalReadTimeInYears / stats.totalReadingTimeInYears) * 100) }]

  return (
    <div className='mb-20'>
      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 ">
        {statsCards.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-zinc-800 px-4 pt-5  shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md dark:bg-zinc-900 bg-zinc-50 p-3">
                {item.icon}
              </div>
              <p className="ml-16 truncate text-sm font-medium dark:text-zinc-400 text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-200">{item.stat.toLocaleString()}</p>
              <p
                className="text-teal-600 ml-2 flex items-baseline text-sm font-semibold">
                {item.secondStat.toLocaleString()}% finished
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
