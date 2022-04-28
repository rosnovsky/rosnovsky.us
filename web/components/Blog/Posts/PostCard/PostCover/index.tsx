import { urlFor } from 'lib/helpers';
import Image from 'next/image';
import Link from 'next/link';

const PostCover = ({ coverImage, slug }) => {
  return (
    <div className="block mb-6 overflow-hidden rounded-md cursor-pointer">
      <Link href={`/blog/${slug}`}>
        <span>
          <Image
            className="w-full rounded-lg"
            src={urlFor(coverImage).url()}
            layout="responsive"
            placeholder="blur"
            blurDataURL={coverImage.asset.metadata.lqip}
            width={600}
            height={400}
            objectFit="cover"
          />
        </span>
      </Link>
    </div>
  );
};

export default PostCover;
