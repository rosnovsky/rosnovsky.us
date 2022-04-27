import Link from 'next/link';
import Logo from './Logo';
import Menu from './Menu';

export const NavBar = () => {
  return (
    <section className="relative bg-coolGray-50 overflow-hidden">
      <div className="bg-transparent">
        <nav className="flex justify-between p-6 px-4">
          <div className="flex md:flex-row flex-col my-3 justify-between items-center w-full">
            <Logo />
            <Menu />
            <div className="mt-5 md:mt-0 md:w-1/3">
              <div className="lg:flex items-center justify-end">
                <span className="inline-block py-2 px-4 mr-2 leading-5 text-coolGray-500 hover:text-coolGray-900 bg-transparent font-medium rounded-md">
                  <Link href="1">Log In</Link>
                </span>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>
  );
};
