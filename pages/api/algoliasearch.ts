import algoliasearch from 'algoliasearch';
import { VercelRequest, VercelResponse } from '@vercel/node'

// Algolia Config
const algoliaClient = algoliasearch(process.env.ALGOLIA_ID, process.env.ALGOLIA_KEY);
const index = algoliaClient.initIndex('prod_BLOG');

export default async (req: VercelRequest, res: VercelResponse) => {
  // if(!req.body) res.status(400).send({error: "400", message: "No slug found"})
  

  const post = JSON.parse(req.body)

  const objectID = require('crypto').createHash('sha256').update(post.title + post.publishedAt, 'utf8').digest('hex');


  const postToIndex = { 
    objectID,
    title: post.title,
    slug: post.slug,
    body: post.body,
    publishedAt: post.publishedAt,
    summary: post.summary,
    cover: post.cover ? post.cover : "/static/favicons/favicon.ico"
  }

  try {
    const result = await index.setSettings({
      attributeForDistinct: 'section',
      distinct: true
    }).then(() => { 
      index.saveObject(postToIndex)
      .then(result => {
        console.log(`Indexed "${postToIndex.title}"`)
        if(!result) throw new Error("Unable to save to index")
        return result
      })});
    res.status(200).send(result);
  }
  catch(err){
    console.error(err)
    return res.status(400).send({message: "Unable to index", error: err})
  }
}
