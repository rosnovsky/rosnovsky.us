import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

const Logo = () => {
  return (
    <h1 className="flex justify-center md:justify-start w-full font-black text-3xl mb-5 md:mb-0 md:text-4xl">
      <Link href="/">Rosnovsky Park&trade;</Link>
    </h1>
  );
};

export default Logo;
