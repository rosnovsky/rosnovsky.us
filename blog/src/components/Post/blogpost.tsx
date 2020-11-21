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
      <Header page="post" />
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
      <div className="w-screen-xl mx-auto my-10 px-4 sm:px-6">
        <div className="object-cover z-10 rounded-lg">
          <Image fluid={mainImage.asset.fluid} alt={mainImage.alt} />
        </div>
      </div>
      <article className="relative w-full py-16 overflow-hidden">
        <Container>
          <div className="relative h-full rounded-2xl bg-white px-4 sm:px-6 lg:px-8">
            <div className="text-lg max-w-prose mx-auto mb-6">
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
