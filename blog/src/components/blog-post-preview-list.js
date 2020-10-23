import {Link} from 'gatsby'
import React from 'react'
import BlogPostPreview from './blog-post-preview'
import Covid from './Covid'

import styles from './blog-post-preview-list.module.css'

function BlogPostPreviewGrid (props) {
  return (
    <>
      <div>
        <Covid />
      </div>
      <div className="relative max-w-5xl mx-auto">
      {props.title && <h2 className={styles.headline}>{props.title}</h2>}
      <ul className="mt-12 grid gap-5 max-w-lg mx-auto lg:grid-cols-2 lg:max-w-none">
        {props.nodes &&
          props.nodes.map(node => (
            <li className="h-full" key={node.id}>
              <BlogPostPreview {...node} isInList />
            </li>
          ))}
      </ul>
      {props.browseMoreHref && (
        <div className={styles.browseMoreNav}>
          <Link to={props.browseMoreHref}>Browse more</Link>
        </div>
      )}
    </div>
    </>
  )
}

BlogPostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: ''
}

export default BlogPostPreviewGrid
