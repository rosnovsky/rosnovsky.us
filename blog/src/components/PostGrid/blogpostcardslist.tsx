import { Link } from 'gatsby'
import React from 'react'
import BlogPostPreview from '../Post/blogpostcard'
import FeaturedPost from '../Post/featuredPost'

function BlogPostPreviewGrid(props) {
  const featuredPost = props.nodes.filter(node => node.featured === true)

  return (
    <>
      <div className="mt-20 mx-auto xl:max-w-3xl lg:max-w-2xl md:max-w-xl">
        <div className="mt-10 mx-auto h-full lg:mx-5  md:max-w-none">
          {props.title && (
            <h2 className="ml-5 xs:text-center leading-relaxed mt-10 mb-4 font-semibold text-2xl">
              {props.title}
            </h2>
          )}
          <div className="h-full">
            {featuredPost.length > 0 ? (
              <FeaturedPost post={featuredPost} />
            ) : null}
          </div>
          {props.nodes &&
            props.nodes.map(node =>
              node.featured ? null : (
                <div className="h-full" key={node.id}>
                  <BlogPostPreview {...node} isInList />
                </div>
              )
            )}
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
