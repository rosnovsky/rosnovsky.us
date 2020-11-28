import { Link } from 'gatsby';
import React from 'react';
import BlogPostPreview from '../Post/blogpostcard';

function BlogPostPreviewGrid(props) {
  return (
    <div>
      <div className="relative max-w-5xl mt-3 mx-auto">
        {props.title && (
          <div className="text-center mx-auto">
            <h2 className=" mx-auto text-3xl leading-9 tracking-tight font-extrabold text-gray-900 sm:text-4xl sm:leading-10">
              {props.title}
            </h2>
          </div>
        )}
        <p className="mt-3 max-w-2xl mx-auto text-xl leading-7 text-gray-500 sm:mt-4">
          {props.description}
        </p>
      </div>
      <div className="mt-12 grid mb-10 gap-5 md:max-w-xl max-w-lg mx-auto lg:grid-cols-2 lg:mx-5 xl:grid-cols-2 xl:gap-10 xl:max-w-none lg:max-w-none lg:gap-10">
        {props.nodes &&
          props.nodes.map((node) => (
            <div key={node.id}>
              <BlogPostPreview {...node} />
            </div>
          ))}
        {props.browseMoreHref && (
          <div className="text-center mt-10 text-xl">
            <Link to={props.browseMoreHref}>Browse more</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPostPreviewGrid;
