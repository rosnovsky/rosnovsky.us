import algoliasearch from 'algoliasearch';
import { NowRequest, NowResponse } from '@vercel/node'
import sanity from '@sanity/client'


// Algolia Config
const algoliaClient = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY);
const index = algoliaClient.initIndex('blog_posts');

const query = `*[_type == "post" && _id == $id] {
  publishedAt, 
  _updatedAt,
  _createdAt,
  title, 
  _id, 
	categories[]->{title}, 
  body[]{
    _key,
    children[]{
      text
    }
  },
	slug{current}, 
	excerpt[]{
    children[]{
      text
    }  
	},
	mainImage{
    asset->{url}
  },
  tags[]{
    value
  }
}`

// Sanity Config
const sanityClient = sanity({
  projectId: 'n3o7a5dl',
  dataset: 'production',
  useCdn: true
})


export default async (req: NowRequest, res: NowResponse) => {
  if(!req.query.blogPostId) res.status(400).send("No PostId")
  const blogPostId = String(req.query.blogPostId);

    const postToIndex = await sanityClient.fetch(query, {id: blogPostId}).then(post => {
      try {
        if(post.length < 1) {throw new Error("Post not found")}
        const blogPost = {
          objectID: post[0]._id,
          title: post[0].title,
          category: post[0].categories.map(category => category.title),
          publishTimestamp: Date.parse(post[0].publishedAt),
          updateTimestamp: Date.parse(post[0]._updatedAt),
          slug: post[0].slug.current,
          mainImage: post[0].mainImage.asset.url,
          excerpt: post[0].excerpt[0].children ? post[0].excerpt[0].children.map(child => child.text).flat().filter(item => item !== "").toString() : "",
          tags: post[0].tags ? post[0].tags.map(tag => tag.value): ""
        }
        const body = post[0].body.map(item => item.children ? item.children.map(child => { return { text: child.text, _key: item._key}}) : "").flat().filter(item => item !== "")
        
        const bodyParts = []

        body.forEach(bodyPart => { 
          const part = {
          objectID: bodyPart._key,
          title: post[0].title,
          slug: post[0].slug.current,
          bodyPart: bodyPart.text,
          excerpt: post[0].excerpt[0].children ? post[0].excerpt[0].children.map(child => child.text).flat().filter(item => item !== "").toString() : "",
          category: post[0].categories.map(category => category.title),
          tags: post[0].tags ? post[0].tags.map(tag => tag.value): "",
          mainImage: post[0].mainImage.asset.url,
        }
        bodyParts.push(part)
      })

      bodyParts.push(blogPost)

        const indexing = index
        .saveObjects(bodyParts)
        .then(result => {
          if(!result) throw new Error("Unable to save to index")
          return result
        });
        return indexing
      }
      catch(err){
        console.error(err)
        res.status(400).send({message: "Unable to index", error: err})
      }})
    
    res.status(200).send(postToIndex)
  }

