import React from 'react';

const ExternalLink = ({
  href,
  children,
  testid
}: {
  href: string;
  children: React.ReactNode;
  testid?: string;
}) => (
  <a
    className="text-gray-500 hover:text-gray-600 transition"
    target="_blank"
    rel="noopener noreferrer"
    href={href}
    data-testid={testid}
  >
    {children}
  </a>
);

export default ExternalLink;
