import Alert from './alert'
import Footer from './footer'
import Meta from './meta'
import Covid from './Covid/CovidTracker'

type Props = {
  preview?: boolean
  children: React.ReactNode
}

const Layout = ({children }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert />
        <Covid />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
