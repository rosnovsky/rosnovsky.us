import { Post } from '../..'
import PostPreview from './PostPreview'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <div className="mt-12 max-w-7xl mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
        {posts.map((post) => {
          return (
            <PostPreview
              preview
              key={post.slug.current}
              socialCard={post.socialCard}
              title={post.title}
              mainImage={post.mainImage}
              publishedAt={post.publishedAt}
              slug={post.slug}
              excerpt={post.excerpt}
              categories={post.categories}
            />
          )
        })}
      </div>
    </section>
  )
}

export default MoreStories
