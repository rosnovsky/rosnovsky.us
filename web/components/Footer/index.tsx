import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));

const Footer = () => {
  return (
    <section id="footer" className="bg-white">
      <div className="wave-top w-full text-coolGray-50">
        <svg
          viewBox="0 0 1440 116"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1440 64.5909H1090.08C833.336 64.5909 580.229 -7.62939e-06 360 -7.62939e-06C139.771 -7.62939e-06 0 64.5909 0 64.5909V116H1440V64.5909Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
      <div
        className="bg-coolGray-50"
        style={{
          backgroundImage: `url('/flex-ui-assets/elements/pattern-light1.svg')`,
          backgroundPosition: 'center',
        }}
      >
        <div className="container px-4 mx-auto">
          <div className="pt-24 pb-11 mx-auto max-w-4xl">
            <span className="block md:mx-auto mb-5 max-w-max text-coolGray-900 text-2xl font-medium">
              Rosnovsky Park™
            </span>
            <div
              id="footer-menu"
              className="flex flex-wrap justify-center -mx-3 lg:-mx-6"
            >
              <div className="w-full md:w-auto p-3 md:px-6">
                <span className="inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium">
                  <Link href="/">Home</Link>
                </span>
              </div>
              <div className="w-full md:w-auto p-3 md:px-6">
                <span className="inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium">
                  <Link href="/blog">Blog</Link>
                </span>
              </div>
              <div className="w-full md:w-auto p-3 md:px-6">
                <span className="inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium">
                  <Link href="/about">About</Link>
                </span>
              </div>
              <div className="w-full md:w-auto p-3 md:px-6">
                <span className="inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium">
                  <Link href="/maps/hikes">Hiking Map</Link>
                </span>
              </div>
              <div className="w-full md:w-auto p-3 md:px-6">
                <span className="inline-block text-lg md:text-xl text-coolGray-500 hover:text-coolGray-600 font-medium">
                  <Link href="/privacy">Privacy</Link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-b border-coolGray-100"></div>
        <div className="container px-4 mx-auto">
          <p
            id="land"
            className="py-5 md:pb-5 text-xs md:text-sm text-coolGray-400 text-center"
          >
            Built with ❤️ and 🙇‍♂️ on Snohomish, Stillaguamish and other Puget
            Salish ancestral lands.{' '}
            <span className="font-medium text-black">
              <Link href="/land">Land Acknowledgment</Link>
            </span>
          </p>
          <p className="py-5 md:pb-20 text-xs md:text-sm text-coolGray-400 text-center">
            © 2003-{new Date().getFullYear()} Art Rosnovsky. All rights
            reserved.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Footer;
