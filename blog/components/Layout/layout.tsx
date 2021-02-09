import Footer from '../Footer/footer'
import dynamic from 'next/dynamic'
import { BlogAlert, BlogProps } from '../..'
const Alert = dynamic(import('../Alert/alert'))
import Link from 'next/link'

type Props = {
  children?: React.ReactNode
  menuItems: BlogProps['menuItems']
  alert: BlogAlert
}

const Layout = ({ children, menuItems, alert }: Props) => {
  return (
    <>
      <div className="bg-gray-50 bg-opacity-50">
        <div className="min-h-screen">
          {alert?.active ? (
            <Alert
              message={alert.message}
              alertLink={alert.alertLink}
              internal={alert.internal}
            />
          ) : null}
          <div className="relative overflow-hidden">
            <div className="relative pt-6 md:pb-12 sm:pb-4 lg:pb-28 xl:pb-32">
              <div className="max-w-screen-2xl mx-auto ">
                <nav className="relative flex sm:h-10 justify-center ">
                  <div className="flex xs:hidden md:visible">
                    {menuItems
                      ? menuItems.map((menuItem: any) => (
                          <div
                            className="px-5 py-2 text-md text-gray-800 hover:text-gray-900"
                            key={menuItem.slug.current}
                          >
                            <Link href={`/${menuItem.slug.current}/`}>
                              {menuItem.title}
                            </Link>
                          </div>
                        ))
                      : null}
                  </div>
                </nav>
                <main>{children}</main>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer menuItems={menuItems} />
      {/* </> */}
    </>
  )
}

export default Layout
