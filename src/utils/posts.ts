import type { Post } from '@types'
import { getCollection } from 'astro:content'

export async function getTopCategories() {
  const posts = await getCollection('blog')
  const repeatingCategories = posts.map((post) => post.data.category)
  const categoryCount = new Map()

  repeatingCategories.forEach((category) => {
    if (categoryCount.has(category)) {
      categoryCount.set(category, categoryCount.get(category) + 1)
    } else {
      categoryCount.set(category, 1) // Map to capture Count of elements
    }
  })

  const uniqueCategories = [...new Set(repeatingCategories)]

  const categories = uniqueCategories.sort((category1, category2) => {
    let freq1 = categoryCount.get(category1)
    let freq2 = categoryCount.get(category2)

    return freq2 - freq1
  })

  // return the top 4 categories
  return categories.slice(0, 4)
}

export function getNonDraftPosts(posts: Post[]) {
  return posts.filter((post) => !post.data.draft)
}

export function sortPosts(posts: Post[]) {
  return getNonDraftPosts(posts).filter(Boolean).sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  )
}

export async function getSortedPosts() {
  const posts = await getCollection('blog')
  return sortPosts(posts)
}
