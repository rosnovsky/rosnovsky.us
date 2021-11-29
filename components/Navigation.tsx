import { useUser } from '@auth0/nextjs-auth0';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme = 'light', setTheme } = useTheme();
  const { user } = useUser();

  // After mounting, we have access to the theme
  useEffect(() => { setMounted(true) }, []);

  return <nav data-testid="nav-bg" className="sticky-nav flex justify-between items-center max-w-4xl w-full p-8 my-0 md:my-2 mx-auto bg-white dark:bg-black bg-opacity-60">
    <a href="#skip" className="sr-only focus:not-sr-only">
      Skip to content
    </a>
    <button
      aria-label="Toggle Dark Mode"
      data-testid="toggle-btn"
      data-status={resolvedTheme === 'dark' ? 'dark' : 'light'}
      type="button"
      className="bg-green-100 dark:bg-green-opaque rounded p-3 h-10 w-10"
      onClick={() => {
        setTheme(resolvedTheme === 'dark' ? 'light' : 'dark'); console.log(
          'current theme: ', resolvedTheme,
          'Theme changed to:', resolvedTheme === 'dark' ? 'light' : 'dark'
        )
      }}
    >
      {mounted && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          stroke="currentColor"
          className="h-4 w-4 text-gray-800 dark:text-gray-200"
        >
          {resolvedTheme === 'dark' ? (
            <path
              data-testid="dark"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          ) : (
            <path
              data-testid="light"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          )}
        </svg>
      )}
    </button>
    <div>
      <span title="Home" className="p-1 sm:p-4 text-gray-900 dark:text-gray-100">
        <Link href="/" >Home</Link>
      </span>

      <span title="Blog" className="p-1 sm:p-4 text-gray-900 dark:text-gray-100"><Link href="/blog">Blog</Link></span>


      <span title="Stats" className="p-1 sm:p-4 text-gray-900 dark:text-gray-100"><Link href="/stats">
        Stats </Link>
      </span>


      <span title="About" className="p-1 sm:p-4 text-gray-900 dark:text-gray-100"><Link href="/about">About</Link></span>

      {user ? <span className="p-1 sm:p-4 text-black dark:text-red-100" title="Logout" ><Link href="/api/auth/logout">Logout</Link></span> : <span title="Login" className="p-1 sm:p-4 text-gray-900 dark:text-gray-100"><Link href="/api/auth/login">Login</Link></span>}
    </div>
  </nav>;
}

export default Navigation;
