import Link from 'next/link';

const Menu = () => {
  return (
    <div className="w-full flex justify-center md:justify-end">
      <ul className="flex align-center justify-center md:align-end my-auto">
        <li className="mr-12">
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="/blog">Blog</Link>
          </span>
        </li>
        <li className="mr-12">
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="/about">About</Link>
          </span>
        </li>
        <li className="mr-12">
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="/privacy">Privacy</Link>
          </span>
        </li>

        <li>
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="/api/auth/login">Log In</Link>
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
