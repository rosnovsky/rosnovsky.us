const Image = dynamic(() => import('next/image'), { ssr: false });
import placeholderVideo from '@images/IMG_8477 4.jpeg';
import ukraineHeart from '@images/stand-with-Ukraine.png';
import dynamic from 'next/dynamic';

const Cover = () => {
  return (
    <div className="relative rounded-7xl">
      <Image
        priority
        quality={90}
        src={placeholderVideo}
        placeholder="blur"
        alt="Art's portrait"
      />
      <div className="absolute -right-20 -bottom-28 w-64 h-64 -rotate-[25deg] opacity-80  md:-bottom-28 md:-right-36 md:w-64 md:h-64 lg:-bottom-28 lg:-right-36 lg:w-80 lg:h-80">
        <Image
          src={ukraineHeart}
          alt="Ukrainian flag in the shape of heart"
          placeholder="blur"
          priority
        />
      </div>
    </div>
  );
};

export default Cover;
