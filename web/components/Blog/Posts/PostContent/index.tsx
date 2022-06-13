import { PortableTextComponents } from '@lib/helpers';
import { PortableText } from '@portabletext/react';
import { BlogPost, Page } from 'index';

export const PostContent = ({
  body,
}: {
  body: BlogPost['body'] | Page['body'];
}) => {
  return (
    <div className="prose prose-xl md:max-w-3xl mx-auto">
      <PortableText value={body} components={PortableTextComponents} />
    </div>
  );
};
