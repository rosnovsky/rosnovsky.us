import Footer from '../Footer/footer'
import Covid from '../Covid/CovidTracker'
import dynamic from 'next/dynamic'
import { UserProvider, useFetchUser } from '../../utils/user'
const Alert = dynamic(import('../Alert/alert'))

type Props = {
  preview?: boolean
  children?: React.ReactNode
  menuItems: {
    title: string
    slug: { current: string }
  }[]
  alert?: {
    message: string
    alertLink: string
    internal: boolean
    active: boolean
  }
}

const Layout = ({ children, menuItems, alert }: Props) => {
  const { user, loading } = useFetchUser()
  return (
    <UserProvider value={{ user, loading }}>
      <div className="min-h-screen">
        {alert?.active ? (
          <Alert
            message={alert.message}
            alertLink={alert.alertLink}
            internal={alert.internal}
          />
        ) : null}
        <Covid />
        <main>{children}</main>
      </div>
      <Footer menuItems={menuItems} />
    </UserProvider>
  )
}

export default Layout
