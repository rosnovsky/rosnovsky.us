import { Link } from 'gatsby'
import React from 'react'
import BlogPostPreview from '../Post/blogpostcard'
import FeaturedPost from '../Post/featuredPost'

function BlogPostPreviewGrid(props) {
  const featuredPost = props.nodes.filter(node => node.featured === true)

  return (
    <>
      <div className="mt-20 w-6xl mx-auto md:max-w-xl">
        <div className="mt-10 mx-auto lg:mx-5  md:max-w-none">
          {props.title && (
            <h2 className="xs:text-center leading-relaxed mt-10 mb-4 font-semibold text-2xl sm:ml-5">
              {props.title}
            </h2>
          )}
          <div className="">
            {featuredPost.length > 0 ? (
              <FeaturedPost post={featuredPost} />
            ) : null}
          </div>
          <div className="grid grid-cols-2 grid-flow-row md:grid-cols-1 md:grid-flow-row sm:grid-cols-1 sm:grid-flow-row xs:grid-cols-1 xs:grid-flow-row">
            {props.nodes &&
              props.nodes.map(node =>
                node.featured ? null : (
                  <div key={node.id}>
                    <BlogPostPreview {...node} isInList />
                  </div>
                )
              )}
          </div>
        </div>
        {props.browseMoreHref && (
          <div className="text-center text-gray-700 font-semibold mt-10 text-xl">
            <Link to={props.browseMoreHref}>More posts</Link>
          </div>
        )}
      </div>
    </>
  )
}

export default BlogPostPreviewGrid
