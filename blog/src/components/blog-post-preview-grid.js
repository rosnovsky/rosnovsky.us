import { Link } from 'gatsby'
import React from 'react'
import BlogPostPreview from './blog-post-preview'

// import styles from './blog-post-preview-grid.module.css'

function BlogPostPreviewGrid(props) {
  return (
    <div>
      <div className="relative max-w-5xl mx-auto">
        {props.title && (
          <div className="text-center mx-auto">
            <h2 className=" mx-auto text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              {props.title}
            </h2>
          </div>
        )}
        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
          {props.description }
        </p>
      </div>
      <div className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
        {props.nodes &&
          props.nodes.map(node => (
            <li key={node.id}>
              <BlogPostPreview {...node} />
            </li>
          ))}
        {props.browseMoreHref && (
          <div>
            <Link to={props.browseMoreHref}>Browse more</Link>
          </div>
        )}
      </div>
    </div>
  )
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BlogPostPreviewGrid
