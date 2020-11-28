import React from 'react';
import { Helmet } from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import { imageUrlFor } from '../../utils/imageUrl';
import { buildImageObj } from '../../utils/helpers';

function SEO({ description, lang, meta, tags, title, image }) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        const metaDescription =
          description || (data.site && data.site.description) || '';
        const siteTitle = (data.site && data.site.title) || '';
        const siteAuthor =
          (data.site && data.site.author && data.site.author.name) || '';
        const metaImage =
          image && image.asset
            ? imageUrlFor(buildImageObj(image)).width(1200).url()
            : '';

        return (
          <Helmet
            htmlAttributes={{ lang }}
            title={title}
            titleTemplate={title === siteTitle ? '%s' : `%s | ${siteTitle}`}
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:image',
                content: metaImage,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:creator',
                content: siteAuthor,
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
            ]
              .concat(
                tags && tags.length > 0
                  ? {
                      name: 'keywords',
                      content: tags.join(', '),
                    }
                  : []
              )
              .concat(meta)}
          />
        );
      }}
    />
  );
}

export default SEO;

const detailsQuery = graphql`
  query DefaultSEOQuery {
    site: sanitySiteSettings(_id: { eq: "siteSettings" }) {
      title
      description
      tags {
        label
        value
      }
      author {
        name
      }
    }
  }
`;
