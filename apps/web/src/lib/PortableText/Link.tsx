import { SanityDocument } from '@sanity/client';
import Link from 'next/link';
import { ReactNode } from 'react';

export const LinkComponent = (props: { [x: string]: any; text?: string; value?: SanityDocument; children?: ReactNode; }) => {
  const { value, children, ...args } = props;
  return <>
    {value?.internal ? (
      <Link href={value.internal.slug.current} {...args} >
        <span className="font-semibold cursor-pointer">
          {props.text}
        </span>
      </Link>
    ) : value?.external ? (
      <a target="_blank" rel="noreferrer" href={value.external}>
        <span className="inline">
          {children}
        </span>
      </a>
    ) : (
      <a
        target="_blank"
        className="underline"
        rel="noreferrer"
        href={value?.href}
      >
        <span className="inline">
          <span className="underline">{children}</span>
        </span>
      </a>
    )}
  </>;
}
