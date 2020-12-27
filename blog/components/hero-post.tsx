import { format } from 'date-fns'
import MainImage from './cover-image'
import Link from 'next/link'
import { PortableText, urlFor } from '../lib/sanity'

const HeroPost = ({
  title,
  mainImage,
  date,
  excerpt,
  slug,
  categories,
}: any) => {
  const postUrl = `${format(Date.parse(date), 'yyyy/MM/dd')}`
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
  return (
    <section>
      <div className="mb-8 md:mb-16 bg-local">
        <MainImage
          featured
          preview={false}
          title={title}
          src={mainImage}
          slug={`${postUrl}/${slug}`}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 font-black text-4xl lg:text-6xl leading-tight">
            <Link
              href={`/blog/${postUrl}/${slug}`}
              as={`/blog/${postUrl}/${slug}`}
            >
              <a className="hover:underline">{title}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
            <div className="mb-4 font-mono font-semibold text-gray-500">
              {new Intl.DateTimeFormat('en-US', options).format(
                Date.parse(date)
              )}{' '}
              | <span className="text-yellow-600">{categories[0].title}</span>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xl leading-relaxed mb-4 prose prose-lg">
            <PortableText blocks={excerpt} />
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroPost
