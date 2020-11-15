import React from 'react'
import { Link } from 'gatsby'
import PortableText from '../PortableText/portableText'
import Container from '../Containers/container'
import Image from 'gatsby-image'
import Header from '../Header/Header'

function BlogPost(props) {
  const { _rawBody, categories, title, mainImage, publishedAt } = props
  const categoryUrl = `/category/${categories[0].slug.current}`

  return (
    <>
      <Header />
      <div className="w-screen-xl mx-auto my-10 px-4 sm:px-6">
        <div className="object-cover z-10 rounded-lg">
          <Image fluid={mainImage.asset.fluid} alt={mainImage.alt} />
        </div>
      </div>
      <article className="relative w-full py-16 overflow-hidden">
        <div className="hidden mt-64 lg:block  lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
          <div className="relative h-full text-lg max-w-prose mx-auto">
            <svg
              className="absolute top-12 h-full left-full transform translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="74b3fd99-0a6f-4271-bef2-e80eeafdf357"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)"
              />
            </svg>
            <svg
              className="absolute top-1/2 right-full transform -translate-y-1/2 -translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="f210dbf6-a58d-4871-961e-36d5016a0f49"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="2"
                    height="2"
                    className="text-gray-100"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#f210dbf6-a58d-4871-961e-36d5016a0f49)"
              />
            </svg>
            <svg
              className="absolute bottom-12 left-full transform translate-x-32"
              width="404"
              height="384"
              fill="none"
              viewBox="0 0 404 384"
            >
              <defs>
                <pattern
                  id="d3eb07ae-5182-43e6-857d-35c643af9034"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <rect
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    className="text-gray-200"
                    fill="currentColor"
                  />
                </pattern>
              </defs>
              <rect
                width="404"
                height="384"
                fill="url(#d3eb07ae-5182-43e6-857d-35c643af9034)"
              />
            </svg>
          </div>
        </div>
        <Container>
          <div className="relative h-full rounded-2xl bg-white px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto mb-6">
              <div className="text-base text-center leading-7 mb-7 text-orange-600 font-bold tracking-wide uppercase">
                <Link to={categoryUrl}>{categories[0].title}</Link>
              </div>
              <h1 className="mt-2 mb-8 text-6xl text-center leading-20  tracking-tight text-gray-900 sm:leading-20 font-black">
                {title}
              </h1>
              <h4 className="text-gray-400 text-base text-center leading-7 mb-5 font-semibold tracking-wide uppercase">
                {new Intl.DateTimeFormat('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                }).format(Date.parse(publishedAt))}
              </h4>
              <div className="prose prose-lg text-gray-700 mx-auto">
                {_rawBody && <PortableText blocks={_rawBody} />}
              </div>
            </div>
          </div>
        </Container>
      </article>
    </>
  )
}

export default BlogPost