import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../components/container'
import PostBody from '../../components/post-body'
import Header from '../../components/header'
import PostHeader from '../../components/post-header'
import Layout from '../../components/layout'
import PostTitle from '../../components/post-title'
import Head from 'next/head'
import PostType from '../../types/post'
import { groq } from 'next-sanity'
import { getClient, usePreviewSubscription } from '../../lib/sanity'

type Props = {
  data: {
    post: PostType
  }
  preview?: boolean
}

const Post = ({ data, preview }: Props) => {
  const {
    title,
    mainImage,
    publishedAt,
    body,
    slug,
    author,
    excerpt,
    categories,
  } = data.post
  const router = useRouter()
  if (!router.isFallback && !data?.post.slug) {
    return <ErrorPage statusCode={404} />
  }

  const { data: post } = usePreviewSubscription(postQuery, {
    params: { slug: slug },
    initialData: data,
    enabled: preview,
  })

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className="mb-32">
              <Head>
                <title>{title} | Rosnovsky Park</title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={title}
                mainImage={mainImage}
                date={publishedAt}
                author={author}
                excerpt={excerpt}
                categories={categories}
              />
              <PostBody content={body} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

export default Post

const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    categories[]->,
    body[]{
      ...,
      markDefs[]{
        ...,
        _type == "internalLink" => {
          "slug": @.reference->slug
        }
      }
    }
  }
`

export async function getStaticProps({
  params,
  preview = false,
}: {
  params: any
  preview: boolean
}) {
  const post = await getClient(preview).fetch(postQuery, {
    slug: `${params.slug}`,
  })

  return {
    props: {
      preview,
      data: { post },
    },
  }
}

export async function getStaticPaths() {
  const paths = await getClient(false).fetch(
    groq`*[_type == "post" && defined(slug.current)][]{ slug, publishedAt}`
  )

  return {
    paths: paths.map(
      (slug: { slug: { current: string }; publishedAt: string }) => {
        return {
          params: { slug: `${slug.slug.current}`, date: slug.publishedAt },
        }
      }
    ),
    fallback: false,
  }
}
