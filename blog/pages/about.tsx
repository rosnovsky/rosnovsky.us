import Container from '../components/container'
import Covid from '../components/Covid/CovidTracker'
import Footer from '../components/footer'
import Header from '../components/header'
import Meta from '../components/meta'
import PostTitle from '../components/post-title'

const AboutPage = () => {
  return (
    <>
      <Meta title="About Me" />
      <div className="mx-auto">
        <Covid />
        <Container>
          <Header />
          <div className="bg-white h-auto ">
            <div className="max-w-7xl mx-auto px-4">
              <div className="">
                <PostTitle>About Me</PostTitle>
                <div className="max-w-4xl font-proper mx-auto prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl mb-10">
                  <p>
                    Hi, I'm Art Rosnovsky. I'm a software engineer and web
                    developer from Greater Seattle area, working mostly with
                    JavaScript stack (JavaScript, React, Node). I solve
                    problems, one line of code at a time.
                  </p>

                  <p>
                    I was born in Soviet Union, emigrated from Russia in 2011
                    and spent 2 wonderful years in SW Ontario, Canada. Then, in
                    2012 my family and I landed as permanent residents in the
                    United States.
                  </p>

                  <p>
                    For many years we've been calling Pacific Northwest our
                    home, and in 2018 we made it official.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
        <Footer />
      </div>
    </>
  )
}

export default AboutPage
