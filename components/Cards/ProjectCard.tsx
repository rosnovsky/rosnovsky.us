import * as Fathom from 'fathom-client';
import { SiGithub, SiReact } from 'react-icons/si';
import { GoBrowser } from 'react-icons/go';

const trackGoal = (title) => {
  const goalCodes = {
    'Sanity Tags': 'WSO7SGLK',
    'Native Stories': 'XKB3X00J',
  };

  Fathom.trackGoal(goalCodes[title], 0);
};

export default function ProjectCard({ title, description, href, icon }) {
  return (
    <a
      className="mb-4 hover:shadow"
      href={href}
      data-testid="project-card"
      onClick={() => trackGoal(title)}
      aria-label={title}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center border border-gray-200 dark:border-gray-800 rounded p-4">
        {icon == 'react' && (
          <div className="h-10 w-10 ml-2 mr-8 text-black dark:text-white text-5xl">
            <span className="sr-only">React Project</span>
            <SiReact />
          </div>
        )}
        {icon == 'site' && (
          <div className="h-10 w-10 ml-2 mr-8 text-black dark:text-white text-5xl">
            <span className="sr-only">Website Project</span>
            <GoBrowser />
          </div>
        )}
        {icon == 'ts' && (
          <div className="h-10 w-10 ml-2 mr-8 text-black  dark:text-white text-5xl">
            <span className="sr-only">Typescript project</span>
            <SiGithub />
          </div>
        )}
        <div>
          <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {title}
          </h4>
          <p className="leading-7 text-gray-700 dark:text-gray-300">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}
