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
	slug{current}, 
	excerpt[]{
    children[]{
      text
    }  
	},
	mainImage{
    asset->{url}
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
          category: post[0].categories[0].title,
          publishedAt: post[0].publishedAt,
          updatedAt: post[0]._updatedAt,
          createdAt: post[0]._createdAt,
          slug: post[0].slug.current,
          mainImage: post[0].mainImage.asset.url,
          excerpt: post[0].excerpt[0].children[0].text
        }
        

        const indexing = index
        .saveObject(blogPost)
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

