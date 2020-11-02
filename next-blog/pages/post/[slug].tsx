import client from '../../client'
import groq from 'groq'
import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'

function urlFor(source) {
  return imageUrlBuilder(client).image(source)
}

const Post = props => {
  const {
    title = 'Missing title',
    name = 'Missing name',
    categories,
    authorImage
  } = props

  return (
    <article>
      <h1 className="text-3xl font-bold">{title}</h1>
      Category:{' '}
      {categories.map(category => (
        <span key={category}>{category}</span>
      ))}
      {authorImage && (
        <div>
          <Image
            className="rounded-full"
            src={urlFor(authorImage).url()}
            width={100}
            height={100}
            alt="Profile Picture"
            loading="lazy"
            quality="2"
          />
          {name}
        </div>
      )}
    </article>
  )
}
const query = groq`
  *[_type == "post" && slug.current == $slug][0]{
    title,
    "name": authors[].author->name,
    "categories": categories[]->title,
    "authorImage": authors[].author->image[0]}`

Post.getInitialProps = async function(context) {
  // It's important to default the slug so that it doesn't return "undefined"
  const { slug = '' } = context.query
  return await client.fetch(query, { slug })
}

export default Post
