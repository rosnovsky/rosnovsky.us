import Logo from './Logo';
import Menu from './Menu';

export const NavBar = () => {
  return (
    <section className="relative bg-coolGray-50 overflow-hidden">
      <div className="bg-transparent">
        <nav className="p-6 px-4">
          <div className="flex align-middle md:flex-row flex-col my-3  w-full">
            <Logo />
            <Menu />
          </div>
        </nav>
      </div>
    </section>
  );
};
