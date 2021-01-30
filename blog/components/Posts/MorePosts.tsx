import { Post } from '../..'
import PostPreview from './PostPreview'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <div className="text-center mt-10">
        <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
          From the Pacific Northwest to the World
        </h2>
        <p className="mt-3 max-w-2xl mb-10 mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
          Thoughts, reports, tutorials, photos and more.
        </p>
      </div>
      <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
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
