import Image from 'next/future/image'

export default function LibraryStatsComponent({ statsCard }: { statsCard: Record<string, any>[] }) {
  const stats = statsCard

  return (
    <div>
      <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-zinc-100">Numbers</h3>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white dark:bg-zinc-800 px-4 pt-5  shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md dark:bg-zinc-900 bg-zinc-50 p-3">
                <Image src={item.icon} width="30" height="30" alt="icon" />
              </div>
              <p className="ml-16 truncate text-sm font-medium dark:text-zinc-400 text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-200">{item.stat.toLocaleString()}</p>
              <p
                className="text-green-600 ml-2 flex items-baseline text-sm font-semibold">
                {item.secondStat.toLocaleString()} finished
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
