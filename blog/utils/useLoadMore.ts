import { useState, useEffect } from 'react'
import { request } from 'graphql-request'
import { morePostsQuery } from './queries'
import type { BlogPost } from '../'

// Custom Hook that manages loading more posts on scroll
const useLoadMore = (posts: BlogPost[]) => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(posts)
  const [index, setIndex] = useState<number>(1)
  const [loading, setLoading] = useState<boolean>(false)
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false)

  useEffect(() => {
    setAllPosts(posts)
  }, [])

  const loadMore = async () => {
    setLoading(true)

    await request(
      'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
      morePostsQuery(index)
    ).then((morePosts: { posts: BlogPost[] }): void => {
      if (morePosts.posts.length < 6) {
        setNoMorePosts(true)
        // @ts-ignore
        setAllPosts((allPosts) => [...allPosts, ...morePosts.posts])
        setLoading(false)
        return
      }
      // @ts-ignore
      setAllPosts((allPosts) => [...allPosts, ...morePosts.posts])
      setIndex(index + 1)
      setLoading(false)
      return
    })
  }
  return { loading, noMorePosts, allPosts, loadMore }
}

export default useLoadMore
