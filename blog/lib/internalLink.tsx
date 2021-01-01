import { format } from 'date-fns'
import client from '@sanity/client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { setDate } from 'date-fns/esm'

const InternalLink = ({ mark, children }: any) => {
  const [slug, setSlug] = useState([{ publishedAt: '', slug: { current: '' } }])

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

  const postUrl = slug[0].publishedAt
    ? format(Date.parse(slug[0].publishedAt), 'yyyy/MM/dd')
    : 'wait...'

  const href = slug[0].slug
    ? `/blog/${postUrl}/${slug[0].slug.current}`
    : 'wait...'

  return <Link href={href}>{children[0]}</Link>
}

export default InternalLink
