import Image from 'next/image';
import placeholderVideo from '@images/IMG_8477 4.jpeg';

const Cover = () => {
  return (
    <div className="relative rounded-7xl">
      <Image
        priority
        quality={80}
        width={480}
        height={360}
        src={placeholderVideo}
        placeholder="blur"
      />
      <div className="absolute top-48 left-72 w-64 h-64 -rotate-[25deg] opacity-80 sm:top-48 sm:left-72 md:top-28 md:left-48 md:w-64 md:h-64 lg:top-48 lg:left-80 lg:w-80 lg:h-80">
        <Image
          className=""
          src="/static/images/stand-with-Ukraine.png"
          alt="Ukrainian flag in the shape of heart"
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default Cover;
