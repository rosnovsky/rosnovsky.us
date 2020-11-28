import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../utils/helpers';
import BlogPostPreviewGrid from '../components/PostGrid/blogpostcardslist';
import Container from '../components/Containers/container';
import GraphQLErrorList from '../components/Errors/graphqlerrorlist';
import SEO from '../components/SEO/seo';
import Layout from '../containers/layout';
import Header from '../components/Header/Header';

export const query = graphql`
  query ArchivePageQuery {
    posts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
    ) {
      edges {
        node {
          id
          publishedAt
          mainImage {
            ...SanityImage
            alt
            asset {
              fluid(maxWidth: 1300) {
                ...GatsbySanityImageFluid
              }
            }
          }
          title
          _rawExcerpt
          slug {
            current
          }
          categories {
            title
            description
            slug {
              current
            }
          }
        }
      }
    }
  }
`;

const BlogPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);

  return (
    <Layout>
      <SEO
        description=""
        lang="en"
        meta={[]}
        tags={[]}
        image={null}
        title="Archive"
      />
      <Header page={null} />
      <Container>
        <div className="mx-auto">
          <h1 className="mt-6 font-black text-center text-6xl">Blog</h1>
          {postNodes && postNodes.length > 0 && (
            <BlogPostPreviewGrid nodes={postNodes} />
          )}
        </div>
      </Container>
    </Layout>
  );
};

export default BlogPage;
