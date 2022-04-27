import Link from 'next/link';

const Logo = () => {
  return (
    <div className="lg:w-1/3 md:w-1/2 font-black text-5xl mb-5 md:mb-0 md:text-2xl">
      <Link href="/">Rosnovsky Park</Link>
    </div>
  );
};

export default Logo;
