import Link from 'next/link';

const Logo = () => {
  return (
    <div className="flex justify-center md:justify-start w-full font-black text-3xl mb-5 md:mb-0 md:text-4xl">
      <Link href="/">Rosnovsky Park</Link>
    </div>
  );
};

export default Logo;