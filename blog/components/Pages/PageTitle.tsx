type Props = {
  children?: React.ReactNode
}

const PageTitle = ({ children }: Props) => {
  return (
    <h1 className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight md:leading-none mb-12 text-center md:text-left">
      {children}
    </h1>
  )
}

export default PageTitle