import { Link } from 'gatsby'
import React from 'react'
import BlogPostPreview from '../Post/blogpostcard'
import FeaturedPost from '../Post/featuredPost'

function BlogPostPreviewGrid(props) {
  const featuredPost = props.nodes.filter(node => node.featured === true)

  return (
    <>
      <div className="mt-20 relative max-w-5xl mx-auto">
        <div className="mt-10 max-w-lg mx-auto h-full xl:max-w-none lg:max-w-none lg:mx-5 md:max-w-none">
          {props.title && (
            <h2 className="ml-5 mt-10 mb-4 font-semibold text-2xl">
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
          <div className="text-center mt-10 text-xl">
            <Link to={props.browseMoreHref}>Browse more</Link>
          </div>
        )}
      </div>
    </>
  )
}

export default BlogPostPreviewGrid
