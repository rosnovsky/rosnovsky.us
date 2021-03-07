import { useState, useEffect } from 'react'
import { request } from 'graphql-request'
import { morePostsQuery } from './queries'
import type { BlogPost } from '../'

// Custom Hook that manages loading more posts on scroll
const useLoadMore = (posts: BlogPost[]) => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>(posts)
  const [index, setIndex] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [noMorePosts, setNoMorePosts] = useState<boolean>(false)

  useEffect(() => {
    setAllPosts(posts)
  }, [])

  const loadMore = async () => {
    setIsLoading(true)

    await request(
      'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
      morePostsQuery(index)
    ).then((morePosts: { posts: BlogPost[] }): void => {
      if (morePosts.posts.length < 6) {
        setNoMorePosts(true)
        // @ts-ignore
        setAllPosts((allPosts) => [...allPosts, ...morePosts.posts])
        setIsLoading(false)
        return
      }
      // @ts-ignore
      setAllPosts((allPosts) => [...allPosts, ...morePosts.posts])
      setIndex(index + 1)
      setIsLoading(false)
      return
    })
  }
  return { isLoading, noMorePosts, allPosts, loadMore }
}

export default useLoadMore
