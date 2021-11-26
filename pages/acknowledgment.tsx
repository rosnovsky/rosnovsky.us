import { MDXRemote } from 'next-mdx-remote';

import { getFileBySlug } from '../lib/mdx';
import AcknowledgmentLayout from '../layouts/acknowledgment';

export default function Acknowledgment({ mdxSource }) {
  return (
    <AcknowledgmentLayout>
      <MDXRemote {...mdxSource} />
    </AcknowledgmentLayout>
  );
}

export async function getStaticProps() {
  const acknowledgment = await getFileBySlug('', 'acknowledgment');

  return { props: acknowledgment };
}

export const Acknowledgement = ({ title, link, children }) => (
  <>
    <h3 className="font-medium mb-2 text-lg">
      <a
        className="flex items-center text-gray-900 dark:text-gray-100"
        target="_blank"
        rel="noopener noreferrer"
        href={link}
      >
        {title}
        <div>
          <svg
            className="h-4 w-4 ml-1"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </div>
      </a>
    </h3>
    <p className="text-gray-600 dark:text-gray-400 mb-8">{children}</p>
  </>
);
