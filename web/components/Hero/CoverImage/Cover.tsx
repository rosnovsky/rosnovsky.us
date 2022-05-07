import Image from 'next/image';
import placeholderVideo from '@images/IMG_8477 4.jpeg';

const Cover = () => {
  return (
    <div className="relative overflow-hidden rounded-7xl">
      <Image
        priority
        quality={80}
        width={480}
        height={360}
        src={placeholderVideo}
        placeholder="blur"
      />
    </div>
  );
};

export default Cover;
