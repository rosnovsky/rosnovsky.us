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
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium dark:text-zinc-400 text-gray-500">{item.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900 dark:text-zinc-200">{item.stat}</p>
              <p
                className="text-green-600 ml-2 flex items-baseline text-sm font-semibold">
                {item.secondStat}
              </p>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
