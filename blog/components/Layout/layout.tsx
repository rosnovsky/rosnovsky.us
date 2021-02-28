import Footer from '../Footer/footer'
import dynamic from 'next/dynamic'
import { BlogAlert, Page } from '../..'
const Alert = dynamic(import('../Alert/alert'))
import Link from 'next/link'

interface LayoutProps {
  children?: React.ReactNode
  menuItems: Page[]
  alert: BlogAlert
}

const Layout = ({ children, menuItems, alert }: LayoutProps) => {
  return (
    <>
      <div className="bg-gray-50 bg-opacity-50">
        <div className="min-h-screen">
          {alert?.active ? (
            <Alert
              message={alert.message}
              alertLink={alert.alertLink}
              internal={alert.internal}
              active={alert.active}
            />
          ) : null}
          <div className="relative overflow-hidden">
            <div className="relative pt-6 md:pb-2 sm:pb-2 lg:pb-3 xl:pb-6">
              <div className="max-w-screen-2xl mx-auto ">
                <nav className="relative flex sm:h-10 justify-center ">
                  <div className="flex font-body xs:hidden md:visible">
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
          <Footer menuItems={menuItems} />
        </div>
      </div>
    </>
  )
}

export default Layout
