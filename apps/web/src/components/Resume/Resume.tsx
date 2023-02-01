import { Button } from '@/components/Button';
import { CaseIcon, ArrowDownIcon } from '@/components/Icons';
import { Role, resumeRoles } from '@/components/Resume';

export function Resume() {

  return (
    <div className="rounded-2xl border border-zinc-100 p-6 dark:border-zinc-700/40">
      <h2 className="flex text-sm font-semibold text-zinc-900 dark:text-zinc-100">
        {CaseIcon}
        <span className="ml-3">Work</span>
      </h2>
      <ol className="mt-6 space-y-4">
        {resumeRoles.map((role, roleIndex) => (
          <Role role={role} roleIndex={roleIndex} />
        ))}
      </ol>
      <Button href="" variant="secondary" className="group mt-6 w-full">
        Not looking for work?
        {/* <ArrowDownIcon className="h-4 w-4 stroke-zinc-400 transition group-active:stroke-zinc-600 dark:group-hover:stroke-zinc-50 dark:group-active:stroke-zinc-50" /> */}
      </Button>
    </div>
  );
}
