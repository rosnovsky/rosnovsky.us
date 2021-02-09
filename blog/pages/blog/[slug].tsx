import { useRouter } from 'next/router'
import slugify from 'slugify'
import ErrorPage from 'next/error'
import Container from '../../components/Layout/container'
import PostBody from '../../components/Posts/PostBody'
import Header from '../../components/Header/header'
import PostHeader from '../../components/Posts/PostHeader'
import Layout from '../../components/Layout/layout'
import PostTitle from '../../components/Posts/PostTitle'
import Head from 'next/head'
import { request } from 'graphql-request'
import { format } from 'date-fns'
import Meta from '../../components/Header/PageMeta'
// import MoreStories from '../../components/Posts/MorePosts'
// import { useState, useEffect } from 'react'
import CommentSection from '../../components/Comments/CommentSection'
import { BlogProps, BlogPost, PostComment, BlogAlert } from '../..'
import { UserProvider, useFetchUser } from '../../utils/user'

const Post = ({
  post,
  menuItems,
  comments,
  alert,
}: {
  post: BlogPost
  menuItems: BlogProps['menuItems']
  comments: BlogProps['comments']
  alert: BlogAlert
}) => {
  const { user, loading } = useFetchUser()
  // const [relatedPosts, setRelatedPosts] = useState([])
  const {
    _id,
    title,
    mainImage,
    publishedAt,
    body,
    slug,
    excerpt,
    categories,
    socialCard,
  }: BlogPost = post
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage menuItems={menuItems} statusCode={404} />
  }

  const socialTitle = socialCard?.title || title

  return (
    <>
      <Meta
        title={title}
        pageType="article"
        description=""
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/social-images/${slugify(
          socialTitle
        )}.png`}
        canonicalUrl={`https://rosnovsky.us/blog/${format(
          Date.parse(publishedAt),
          'yyyy/MM/dd'
        )}/${slug.current}`}
        coverAlt={title}
      />
      <Layout menuItems={menuItems} alert={alert}>
        <UserProvider value={{ user, loading }}>
          <Container>
            <Header />
            {router.isFallback ? (
              <PostTitle>Loading…</PostTitle>
            ) : (
              <>
                <article className="mb-32">
                  <Head>
                    <title>{title} | Rosnovsky Park</title>
                  </Head>
                  <div className="relative py-16 overflow-hidden">
                    <PostHeader
                      title={title}
                      mainImage={mainImage}
                      publishedAt={publishedAt}
                      excerpt={excerpt}
                      categories={categories}
                    />
                    <PostBody content={body} />
                  </div>
                </article>
                <section>
                  {/* <h2 className="text-center prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl mx-auto fond-black prose text-4xl">
                  Related Posts
                </h2> */}
                  {/* <MoreStories posts={allPosts} /> */}
                </section>
                <section>
                  <CommentSection comments={comments} postId={_id} />
                </section>
              </>
            )}
          </Container>
        </UserProvider>
      </Layout>
    </>
  )
}

export default Post

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: any
  preview: boolean
}) {
  const data: BlogProps = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    `{
      alert: allAlert {
        message
        alertLink
        internal
        active
      }
      menuItems: allPage(where: {menuItem: {eq: true }}){
        title
        slug {
          current
        }
      }
      posts: allPost(where: {slug: {current: {eq: "${params.slug}"}}}) {
        _id
        title
        body: bodyRaw
        socialCard {
          title
          subtitle
        }
        slug {
          current
        }
        categories {
          title
          slug {
            current
          }
        }
        tags {
          value
        }
        publishedAt
        excerpt: excerptRaw
        featured
        mainImage {
          alt
          caption
          asset {
            metadata{
              dimensions {
                aspectRatio
                width
                height
              }
              lqip
            }
            url
          }
        }
      }
    }`
  )

  const fetchComments = await fetch(
    `https://rosnovsky.us/api/get?postId=${data.posts[0]._id}`
  )
  const comments: PostComment[] = await fetchComments.json()

  return {
    props: {
      alert: data.alert[0],
      preview,
      post: data.posts[0],
      menuItems: data.menuItems,
      comments,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const paths = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    `{
    allPost{
      publishedAt
      slug {
        current
      }
    }
  }`
  )

  return {
    paths: paths.allPost.map(
      (slug: { slug: { current: string }; publishedAt: string }) => {
        return {
          params: { slug: `${slug.slug.current}`, date: slug.publishedAt },
        }
      }
    ),
    fallback: false,
  }
}
