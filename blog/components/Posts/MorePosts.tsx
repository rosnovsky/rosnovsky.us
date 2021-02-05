import { BlogProps } from '../..'
import PostPreview from './PostPreview'

const MoreStories = ({ posts }: { posts: BlogProps['posts'] }) => {
  return (
    <section>
      <div className="text-center mt-10">
        <h2 className="text-3xl leading-9 tracking-tight font-extrabold text-green-900 sm:text-4xl sm:leading-10">
          From the Pacific Northwest to the World
        </h2>
        <p className="mt-3 max-w-2xl mb-20 mx-auto text-xl leading-7 text-gray-700 sm:mt-4">
          Thoughts, reports, tutorials, photos and more.
        </p>
      </div>
      <div className="mt-12 grid gap-5 max-w-xl mx-auto md:grid-cols-1 md:max-w-none lg:grid-cols-2 xl:grid-cols-3 lg:max-w-none">
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
