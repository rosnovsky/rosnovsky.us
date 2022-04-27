import Image from 'next/image';
import Link from 'next/link';
import image from '@images/2021/mary-ray-kU_icQUmn9w-unsplash.jpg';

const PostCover = () => {
  return (
    <div className="block mb-6 overflow-hidden rounded-md cursor-pointer">
      <Link href="blog/1">
        <Image
          className="w-full rounded-lg"
          src={image}
          placeholder="blur"
          objectFit="cover"
        />
      </Link>
    </div>
  );
};

export default PostCover;
