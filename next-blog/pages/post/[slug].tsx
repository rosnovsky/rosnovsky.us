import client from '../../client'
import groq from 'groq'
import Image from 'next/image'
import Link from 'next/link'

import imageUrlBuilder from '@sanity/image-url'
import BlockContent from '@sanity/block-content-to-react'
import serializers from '../../serializers'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Post = props => {
  const {
    title = 'Missing title',
    name = 'Missing name',
    categories,
    authorImage,
    body,
    mainImage
  } = props

  return (
    <>
      <div className="w-screen-xl mx-auto my-10 px-4 sm:px-6">
        <div className="object-cover h-screen-xl z-10 rounded-lg mx-auto">
          <Image
            className="mx-auto"
            src={urlFor(mainImage)
              .auto('format')
              .url()}
            height={1080}
            width={1920}
            layout={'intrinsic'}
          />
        </div>
      </div>
      <article className="relative w-full py-16 overflow-hidden">
        <div className="hidden mt-64  lg:block  lg:absolute lg:inset-y-0 lg:h-full lg:w-full">
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
        <div className="relative h-full rounded-2xl bg-white px-4 sm:px-6 lg:px-8">
          <div className="text-lg max-w-prose mx-auto mb-6">
            <p className="text-base text-center leading-6 text-orange-600 font-semibold tracking-wide uppercase">
              {/* <Link href={categoryUrl}> */}
              {categories[0].title}
              {/* </Link> */}
            </p>
            <h1 className="mt-2 mb-8 text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl sm:leading-10">
              {title}
            </h1>
            <div className="prose prose-lg text-gray-700 mx-auto">
              <BlockContent
                blocks={body}
                serializers={serializers}
                // imageOptions={{ w: 320, h: 240, fit: 'max' }}
                {...client.config()}
              />
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
const query = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "name": authors[].author->name,
    "categories": categories[]->title,
    "authorImage": authors[].author->image[0],
    body,
    mainImage}`

Post.getInitialProps = async function(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query
  return await client.fetch(query, { slug })
}

export default Post
