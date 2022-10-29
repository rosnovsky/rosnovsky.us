import Image from 'next/future/image';
import { Button } from '@/components/Button';
import logoMicrosoft from '@/images/logos/microsoft.svg';
import logoAtt from '@/images/logos/att.svg';
import logoOkta from '@/images/logos/okta.svg'
import logoIntel from '@/images/logos/intel.svg';
import { StaticImageData } from 'next/image';

const caseIcon = <svg role="img" xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" aria-labelledby="suitcaseIconTitle" stroke="rgb(20 184 166)" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" fill="none" color="rgb(20 184 166)"> <title id="suitcaseIconTitle">Suitcase</title> <rect width="18" height="12" x="3" y="7" /> <rect width="8" height="4" x="8" y="3" /> </svg>

type Role = {
  company: string;
  title: string;
  logo: StaticImageData;
  start: string;
  end: string;
};

// TODO: fetch this from Sanity
export function Resume() {
  const resume: Role[] = [
    {
      company: 'Okta',
      title: 'Software Engineer',
      logo: logoOkta,
      start: 'Dec 2019',
      end: 'Present',

    },
    {
      company: 'Microsoft',
      title: 'Software Engineer',
      logo: logoMicrosoft,
      start: 'May 2019',
      end: 'Oct 2019',
    },
    {
      company: 'AT&T',
      title: 'Web Developer',
      logo: logoAtt,
      start: 'Apr 2017',
      end: 'Oct 2018',
    },
    {
      company: 'Intel',
      title: 'Web Producer',
      logo: logoIntel,
      start: 'Dec 2016',
      end: 'Apr 2017',
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {caseIcon}
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resume.map((role, roleIndex) => (
          <li key={roleIndex} className="flex gap-4">
            <div className="relative mt-1 flex h-10 w-10 flex-none items-center justify-center rounded-full shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0">
              <Image src={role.logo} alt="" className="h-7 w-7" unoptimized />
            </div>
            <dl className="flex flex-auto flex-wrap gap-x-2">
              <dt className="sr-only">Company</dt>
              <dd className="w-full flex-none text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {role.company}
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
        ))}
      </ol>
      <Button href="" variant="secondary" className="group mt-6 w-full">
        Not looking for work
        {/* <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" /> */}
      </Button>
    </div>
  );
}
