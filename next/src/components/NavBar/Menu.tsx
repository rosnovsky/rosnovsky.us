import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';

const Menu = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  return (
    <div className="w-full flex justify-center md:justify-end">
      <ul
        id="menu"
        className="flex align-center justify-center md:align-end my-auto"
      >
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
            <Link href="/features">Features</Link>
          </span>
        </li>
        <li>
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            {!user && !isLoading && !error && (
              <Link passHref href={`/api/auth/login?returnTo=${router.asPath}`}>
                Log In
              </Link>
            )}
            {user && (
              <Link
                passHref
                href={`/api/auth/logout?returnTo=${router.asPath}`}
              >
                Log Out
              </Link>
            )}
            {isLoading && <span className="text-gray-300">Wait...</span>}
            {error && <span className="text-red-500">Oops </span>}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
