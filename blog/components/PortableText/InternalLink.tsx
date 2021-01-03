import { format } from 'date-fns'
import client from '@sanity/client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const InternalLink = ({ mark, children }: any) => {
  const [postUrl, setPostUrl] = useState('')

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

      setPostUrl(
        `/blog/${format(Date.parse(slug[0].publishedAt), 'yyyy/MM/dd')}/${
          slug[0].slug.current
        }`
      )
      console.log(postUrl)
    }
    getSlug()
  }, [])

  return (
    <Link href={postUrl} as={postUrl}>
      {children[0]}
    </Link>
  )
}

export default InternalLink
