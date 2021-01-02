import Covid from '../components/Covid/CovidTracker'
import Footer from '../components/Footer/footer'
import Meta from '../components/Header/PageMeta'

const NotFound = () => {
  return (
    <>
      <Meta
        title="404, damn it!"
        pageType="article"
        description="404: Page not found. Let's not point fingers, ok? Ok."
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/c_fill,w_1200,e_blur:400/c_fit,l_og_template,w_1000/w_500,c_fit,l_text:mono.ttf_24_bold:From Pacific Northwest to the World,g_north_west,x_160,y_523,co_rgb:A6A6A6FF/w_300,c_fit,l_text:mono.ttf_36_bold:Visit,g_north_west,x_150,y_130,co_rgb:D03801FF/w_700,c_fit,l_text:fira.ttf_96_bold:Rosnovsky Park,g_north_west,x_150,y_290/v1607201491/b920c2fab2f915bd9a11f621ce40002c157293d2-1800x1013_napjjt.png`}
        canonicalUrl="https://rosnovsky.us/"
        coverAlt="Rosnovsky Park"
      />
      <div className="">
        <Covid />
        <div className="bg-white h-auto ">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-base font-semibold text-orange font-mono tracking-wide uppercase mb-5">
                Error 404
              </h2>
              <p className="mt-1 text-4xl font-black font-mono text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl pb-5">
                Page Not Found
              </p>
              <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
                Let's not point fingers, ok? Ok.
              </p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default NotFound
