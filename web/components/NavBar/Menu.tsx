import dynamic from 'next/dynamic';
const Link = dynamic(() => import('next/link'));
import { useUser } from '@auth0/nextjs-auth0';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Menu = () => {
  const { user, error } = useUser();
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated && !user && !error) {
      setAuthenticated(true);
    }
    if (user) {
      localStorage.setItem('isAuthenticated', 'true');
      setAuthenticated(true);
    }
  }, [user, error, authenticated]);

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
            <Link href="/maps/hikes">Hiking Map</Link>
          </span>
        </li>
        <li>
          <span className="text-coolGray-500 hover:text-coolGray-900 font-medium">
            {!authenticated && (
              <Link passHref href={`/api/auth/login?returnTo=${router.asPath}`}>
                Log In
              </Link>
            )}
            {authenticated && (
              <Link
                legacyBehavior={false}
                onClick={() => {
                  setAuthenticated(false);
                  localStorage.setItem('isAuthenticated', 'false');
                }}
                href={`/api/auth/logout?returnTo=${router.asPath}`}
              >
                Log Out
              </Link>
            )}
          </span>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
