import PostPreview from './post-preview'
import Post from '../types/post'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        More Posts
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 mb-32">
        {posts.map((post) => {
          return (
            <PostPreview
              preview
              key={post.slug}
              title={post.title}
              mainImage={post.mainImage}
              date={post.publishedAt}
              author={post.author}
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
