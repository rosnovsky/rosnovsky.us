import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

const WelcomeMessage = () => {
  return (
    <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
      <h2 className="mb-6 text-3xl md:text-5xl lg:text-6xl leading-tight font-bold tracking-tight">
        Hi, I&apos;m Art. We need to talk.
      </h2>
      <p className="mb-8 text-lg md:text-xl text-coolGray-500 font-medium">
        Or maybe we don&apos;t. In any case, I write about web development,
        hiking, and random hobbies I pick up every now and then.
      </p>
      <div className="flex flex-wrap">
        <div className="w-full md:w-auto py-1 md:py-0">
          <Link href="/blog">
            <button className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-coolGray-800 font-medium text-center bg-white hover:bg-coolGray-100 focus:ring-2 focus:ring-coolGray-200 focus:ring-opacity-50 border border-coolGray-200 rounded-md shadow-sm">
              Check it out
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WelcomeMessage;
