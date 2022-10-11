import clsx from 'clsx'

export function Prose({ children, className }) {
  return (
    <div className={clsx(className, 'prose prose-xl dark:prose-invert')}>{children}</div>
  )
}
