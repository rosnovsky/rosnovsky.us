import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0';

const Menu = () => {
  const { user, error, isLoading } = useUser();

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
        <li className="mr-12 hidden md:block">
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="/privacy">Privacy</Link>
          </span>
        </li>
        <li className="mr-12 hidden lg:block">
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            <Link href="/land">Land</Link>
          </span>
        </li>

        <li>
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            {!user && !isLoading && (
              <Link passHref href="/api/auth/login">
                Log In
              </Link>
            )}
            {user && (
              <Link passHref href="/api/auth/logout">
                Log Out
              </Link>
            )}
            {isLoading && <span className="text-gray-300">Wait...</span>}
            {error && <span className="text-red-500">Error</span>}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
