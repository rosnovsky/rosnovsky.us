import Link from 'next/link'

import { Container } from '@/components/Container'

function NavLink({ href, children }) {
  return (
    <Link
      href={href}
      className="transition hover:text-teal-500 dark:hover:text-teal-400"
    >
      {children}
    </Link>
  )
}

export function Footer() {
  return (
    <footer className="mt-32">
      <Container.Outer>
        <div className="border-t border-zinc-100 pt-10 pb-16 dark:border-zinc-700/40">
          <Container.Inner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex gap-6 text-sm font-medium text-zinc-800 dark:text-zinc-200">
                <NavLink href="/">Home</NavLink>
                <NavLink href="/about">About</NavLink>
                <NavLink href="/features">Features</NavLink>
                <NavLink href="/uses">Uses</NavLink>
                <NavLink href="/login">Login</NavLink>
                <Link href="https://status.rosnovsky.us">
                  <div className="flex pt-2">
                    <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-teal-400 opacity-75"></span>
                    <span className=" inline-flex relative rounded-full h-2 w-2 bg-teal-500"></span>
                  </div>
                </Link>
              </div>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                &copy; 2003-{new Date().getFullYear()} Art Rosnovsky. All rights
                reserved.
              </p>
            </div>
          </Container.Inner>
        </div>
      </Container.Outer>
    </footer>
  )
}
