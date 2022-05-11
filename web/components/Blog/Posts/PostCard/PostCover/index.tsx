import { BlogPost } from 'index';
import dynamic from 'next/dynamic';
const Image = dynamic(() => import('next/image'), { ssr: false });
const Link = dynamic(() => import('next/link'));

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
            src={coverImage.asset.url}
            layout="responsive"
            placeholder="blur"
            blurDataURL={coverImage.asset.metadata.lqip}
            width={600}
            height={400}
            objectFit="cover"
            alt={slug}
          />
        </span>
      </Link>
    </div>
  );
};

export default PostCover;
