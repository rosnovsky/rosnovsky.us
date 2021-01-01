import { format } from 'date-fns'
import client from '@sanity/client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { setDate } from 'date-fns/esm'

const InternalLink = ({ mark, children }: any) => {
  const [slug, setSlug] = useState([
    { slug: { current: 'blog' }, publishedAt: '2000-01-01T00:00:00.001Z' },
  ])

  const query = '*[_type == "post" && _id == $_ref ] {publishedAt, slug}'
  const sanityClient = client({
    projectId: 'n3o7a5dl',
    dataset: 'production',
    useCdn: true, // `false` if you want to ensure fresh data
  })
  useEffect(() => {
    const getSlug = async () => {
      const querySlug = await sanityClient.fetch(query, {
        _ref: mark.reference._ref,
      })
      const slug = await querySlug
      setSlug(slug)
    }
    getSlug()
  }, [])

  const postUrl = format(Date.parse(slug[0].publishedAt), 'yyyy/MM/dd')

  const href = `/blog/${postUrl}/${slug[0].slug.current}`

  return <Link href={href}>{children[0]}</Link>
}

export default InternalLink
