const bookIcon = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" aria-labelledby="notebookIconTitle" stroke="rgb(20 184 166)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="rgb(20 184 166)"> <title id="notebookIconTitle">Notebook</title> <path d="M9 8h5" /> <path d="M18 3v18H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12z" /> <path d="M5 19v-1a1 1 0 0 1 1-1h12" /> </svg>

const openBookIcon = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="30px" height="30px" viewBox="0 0 24 24" aria-labelledby="bookOpenedIconTitle" stroke="rgb(20 184 166)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="rgb(20 184 166)"> <title id="bookOpenedIconTitle">Book</title> <path d="M12 6s-2-2-4-2-5 2-5 2v14s3-2 5-2 4 2 4 2c1.333-1.333 2.667-2 4-2 1.333 0 3 .667 5 2V6c-2-1.333-3.667-2-5-2-1.333 0-2.667.667-4 2z" /> <path stroke-linecap="round" d="M12 6v14" /> </svg>

const calendarIcon = <svg width="30px" height="30px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-labelledby="calendarEventIconTitle" stroke="rgb(20 184 166)" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none" color="rgb(20 184 166)"> <title id="calendarEventIconTitle">Calendar event</title> <path d="M3 5H21V21H3V5Z" /> <path d="M21 9H3" /> <path d="M7 5V3" /> <path d="M17 5V3" /> <rect x="15" y="15" width="2" height="2" /> </svg>

type StatsCard = {
  id: number
  name: "Total books" | "Total pages" | "Total reading time"
  stat: number | string
  icon: JSX.Element
  secondStat: number | string
}

export default function LibraryStatsComponent({ stats }) {
  const statsCards: StatsCard[] = [
    { id: 1, name: 'Total books', stat: stats.totalBooks, icon: bookIcon, secondStat: stats.totalRead, },
    { id: 2, name: 'Total pages', stat: stats.totalPagesFormatted, icon: openBookIcon, secondStat: stats.totalPagesReadFormatted, },
    { id: 3, name: 'Total reading time', stat: stats.totalReadingTimeInYears, icon: calendarIcon, secondStat: stats.totalReadTimeInYears }]

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
                {item.secondStat.toLocaleString()} finished
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
