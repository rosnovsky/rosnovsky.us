import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
import Image from 'next/image';
const Container = dynamic(() => import('@components/Container'));
const NewsletterForm = dynamic(() => import('@components/NewsletterForm'));
import logo from 'public/logo.png';

export default function Custom404() {
  return (
    <Container>
      <section
        className="py-24 md:py-40 bg-white"
        style={{
          backgroundImage: "url('flex-ui-assets/elements/pattern-white.svg')",
          backgroundPosition: 'center;',
        }}
      >
        <div className=" z-10 container px-4 mx-auto">
          <div className="flex flex-wrap items-center -mx-4">
            <div className="w-full md:w-1/2 px-4 mb-16 md:mb-0">
              <div className="md:max-w-xl md:mx-auto text-center md:text-left">
                <span className="inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium rounded-full shadow-sm">
                  Error 404
                </span>
                <h2 className="mb-4 text-4xl md:text-5xl leading-tight font-bold tracking-tighter">
                  Oh no! Error 404
                </h2>
                <p className="mb-6 text-lg md:text-xl text-coolGray-500">
                  Something went wrong, so this page is broken.
                </p>
                <div className="flex flex-wrap">
                  <div className="w-full lg:w-auto py-1 lg:py-0 lg:mr-6">
                    <Link href="/">
                      <span className="inline-block py-5 px-7 w-full text-base md:text-lg leading-4 text-blue-50 font-medium text-center bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 border border-blue-500 rounded-md shadow-sm cursor-pointer">
                        Go back to Homepage
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <Image
                src={logo}
                placeholder="blur"
                width={500}
                height={500}
                layout={'intrinsic'}
              />
            </div>
          </div>
        </div>
      </section>
      <NewsletterForm />
    </Container>
  );
}
