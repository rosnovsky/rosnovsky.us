import Image from 'next/image';
import placeholderVideo from '@images/IMG_8477 4.jpeg';

const Cover = () => {
  return (
    <div className="relative overflow-hidden rounded-7xl">
      <Image src={placeholderVideo} placeholder="blur" />
    </div>
  );
};

export default Cover;
