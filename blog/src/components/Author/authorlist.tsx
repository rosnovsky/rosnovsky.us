import { SanityAsset } from '@sanity/image-url/lib/types/types';
import React from 'react';
import { buildImageObj } from '../../utils/helpers';
import { imageUrlFor } from '../../utils/imageUrl';

type Author = {
  author: {
    name: string;
    image: {
      asset: SanityAsset;
    };
  };
  _key: number;
};

function AuthorList({ items, title }: { items: Author[]; title: string }) {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {items.map(({ author, _key }) => {
          const authorName = author && author.name;
          return (
            <li key={_key}>
              <div>
                <div>
                  {author && author.image && author.image.asset && (
                    <img
                      src={imageUrlFor(buildImageObj(author.image))
                        .width(100)
                        .height(100)
                        .fit('crop')
                        .url()}
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div>
                <div>{authorName || <em>Missing name</em>}</div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default AuthorList;
