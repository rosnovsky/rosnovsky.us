import { BlogPost } from 'index';
import { urlFor } from 'lib/helpers';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  coverImage: BlogPost['coverImage'];
  slug: string;
};

const PostCover = ({ coverImage, slug }: Props) => {
  return (
    <div className="block mb-6 overflow-hidden rounded-md cursor-pointer shadow shadow-darkCoolGray-100">
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
