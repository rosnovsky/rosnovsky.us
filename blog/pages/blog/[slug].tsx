import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { request } from 'graphql-request'
import { format } from 'date-fns'
import slugify from 'slugify'
import { postQuery } from '../../utils/queries'
import ErrorPage from 'next/error'
import Container from '../../components/Layout/container'
import PostBody from '../../components/Posts/PostBody'
import Header from '../../components/Header/header'
import PostHeader from '../../components/Posts/PostHeader'
import Layout from '../../components/Layout/layout'
import PostTitle from '../../components/Posts/PostTitle'
import Head from 'next/head'
import Meta from '../../components/Header/PageMeta'
// import MoreStories from '../../components/Posts/MorePosts'
import CommentSection from '../../components/Comments/CommentSection'
import type { BlogPost, PostComment, BlogAlert, Page } from '../..'

const Post = ({
  post,
  menuItems,
  comments,
  alert,
}: {
  post: BlogPost
  menuItems: Page[]
  comments: BlogPost['comments']
  alert: BlogAlert
}) => {
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

  useEffect(() => {
    const fetchImageUrl = async () => {
      const socialTitle = socialCard?.title || title
      const socialSubtitle = socialCard?.subtitle || 'Read More...'
      const fetchUrl = await fetch(
        `https://api.rosnovsky.us/api/generateOgImage?title=${socialTitle}&date=${format(
          Date.now(),
          'dd MMM yyyy'
        )}&category=${
          categories[0].title
        }&subtitle=${socialSubtitle}&coverImage=${encodeURIComponent(
          mainImage!.asset.url
        )}`
      )
      const urlJSON = await fetchUrl
      const url = await urlJSON.json()
      return url
    }
    fetchImageUrl()
  }, [])

  return (
    <>
      <Meta
        title={title}
        pageType="article"
        description=""
        coverImage={`https://res.cloudinary.com/rosnovsky/image/upload/social-images/${slugify(
          socialTitle
        ).toLowerCase()}.png`}
        canonicalUrl={`https://rosnovsky.us/blog/${format(
          Date.parse(publishedAt),
          'yyyy/MM/dd'
        )}/${slug!.current}`}
        coverAlt={title}
        slug={slug}
      />
      <Layout menuItems={menuItems} alert={alert}>
        <Container>
          <Header />
          {router.isFallback ? (
            <PostTitle>Loading…</PostTitle>
          ) : (
            <>
              <article className="mb-10">
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
                    slug={slug}
                  />
                  <PostBody body={body!} />
                </div>
              </article>
              <section>
                {/* <h2 className="text-center prose xl:prose-3xl lg:prose-2xl md:prose-2xl sm:prose-2xl xs:prose-2xl prose-xl mx-auto fond-black prose text-4xl">
                  Related Posts
                </h2> */}
                {/* <MoreStories posts={allPosts} /> */}
              </section>
              <section>
                <CommentSection comments={comments} _id={_id} />
              </section>
            </>
          )}
        </Container>
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
  const data: {
    alert: BlogAlert[]
    menuItems: Page
    posts: BlogPost[]
  } = await request(
    'https://n3o7a5dl.api.sanity.io/v1/graphql/production/default',
    postQuery(params.slug)
  )

  const fetchComments = await fetch(
    process.env.NODE_ENV === 'production'
      ? `https://rosnovsky.us/api/get?postId=${data.posts[0]._id}`
      : `http://localhost:3000/api/get?postId=${data.posts[0]._id}`
  )
  const comments: PostComment[] = await fetchComments.json()
  process.env.CI
    ? await fetch(
        `https://api.rosnovsky.us/api/algoliaIndex?blogPostId=${data.posts[0]._id}`
      )
    : console.log('Not in Vercel Build step, skipping Algolia indexing')

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
