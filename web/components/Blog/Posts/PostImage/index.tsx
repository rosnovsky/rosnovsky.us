import type { SanityImageAssetDocument } from '@sanity/client';
import Image from 'next/image';

export const PostImage = ({
  coverImage,
}: {
  coverImage: SanityImageAssetDocument;
}) => {
  return (
    <div className="mb-10 mx-auto max-w-max overflow-hidden rounded-lg">
      <Image
        src={coverImage.asset.url}
        placeholder="blur"
        blurDataURL={coverImage.asset.metadata.lqip}
        width={coverImage.asset.metadata.dimensions.width}
        height={coverImage.asset.metadata.dimensions.height}
        objectFit="cover"
        priority
        alt=""
      />
    </div>
  );
};
