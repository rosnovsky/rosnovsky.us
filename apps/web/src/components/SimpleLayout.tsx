import { Container } from '@/components/Container'

type SimpleLayoutProps = {
  title: string
  intro: string
  children?: React.ReactNode
}

export function SimpleLayout({ title, intro, children }: SimpleLayoutProps) {
  return (
    <Container className="mt-16 sm:mt-32">
      <header className="max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          {title}
        </h1>
        <p className="prose tracking-tight mt-6 text-zinc-600 dark:text-zinc-400" dangerouslySetInnerHTML={{ __html: intro }} />
      </header>
      <div className="mt-10 sm:mt-14 leading-8 text-xl">{children}</div>
    </Container>
  )
}
