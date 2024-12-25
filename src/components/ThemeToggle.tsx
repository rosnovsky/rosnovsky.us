import type { JSX } from 'react'
import { useEffect, useState } from 'react'

export default function ThemeToggle(): JSX.Element | null {
  const [theme, setTheme] = useState(localStorage.getItem('theme') ?? 'light')
  const [isMounted, setIsMounted] = useState(false)

  const handleClick = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // or null;
  }

  return (
    <button onClick={handleClick}>{theme === 'light' ? '🌙' : '🌞'}</button>
  )
}
