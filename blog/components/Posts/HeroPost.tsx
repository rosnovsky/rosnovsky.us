import { format } from 'date-fns'
import MainImage from '../Image/CoverImage'
import Link from 'next/link'
// @ts-expect-error
import PortableText from '@sanity/block-content-to-react'
import serializers from '../PortableText/serializers'

const HeroPost = ({
  title,
  mainImage,
  date,
  excerpt,
  slug,
  categories,
}: any) => {
  const postDate = new Date(date)
  const postUrl = `${format(postDate, 'yyyy/MM/dd')}`
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }

  return (
    <section className="xl:flex mb-24">
      <div className="my-8 mx-3 xl:w-2/3">
        <MainImage
          featured
          preview={false}
          title={title}
          src={mainImage}
          slug={`${postUrl}/${slug}`}
        />
      </div>
      <div className="xl:ml-20 my-8 flex flex-col w-full mb-20 md:mb-28">
        <h3 className="mb-4 mx-5 font-black text-4xl lg:text-6xl leading-tight">
          <Link
            href={`/blog/${postUrl}/${slug}`}
            as={`/blog/${postUrl}/${slug}`}
          >
            <a className="hover:underline">{title}</a>
          </Link>
        </h3>
        <div className="mb-4 md:mb-0 text-lg">
          <div className="mb-4 mx-5 font-mono font-semibold text-gray-500">
            {new Intl.DateTimeFormat('en-US', options).format(Date.parse(date))}{' '}
            | <span className="text-yellow-600">{categories[0].title}</span>
          </div>
          <p className="text-xl mx-5 font-proper leading-relaxed mb-4 prose prose-lg">
            <PortableText blocks={excerpt} serializers={serializers} />
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
