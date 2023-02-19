import Image from 'next/image'
import Link from 'next/link'

export const Role = ({ role, roleIndex }) => {
  return (
    <li key={roleIndex} className="flex gap-4">
      <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
        <Image src={role.logo} alt="" className="h-7 w-7" />
      </div>
      <dl className="flex flex-auto flex-wrap gap-x-2">
        <dt className="sr-only">Company</dt>
        <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
          <Link aria-label={`${role.company} website`} href={role.url}>{role.company}</Link>
        </dd>
        <dt className="sr-only">Role</dt>
        <dd className="text-xs text-zinc-500 dark:text-zinc-400">
          {role.title}
        </dd>
        <dt className="sr-only">Date</dt>
        <dd
          className="ml-auto text-xs text-zinc-500 dark:text-zinc-400"
          aria-label={`${role.start} until ${role.end}`}
        >
          <time dateTime={role.start}>
            {role.start}
          </time>{' '}
          <span aria-hidden="true">—</span>{' '}
          <time dateTime={role.end}>
            {role.end}
          </time>
        </dd>
      </dl>
    </li>
)}
