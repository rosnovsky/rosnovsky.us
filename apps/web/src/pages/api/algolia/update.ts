import { SanityClient as sanity } from '@/lib/Sanity'; // configured Sanity client
import { SanityDocumentStub } from '@sanity/client';
import { VercelRequest, VercelResponse } from '@vercel/node';
import algoliasearch from 'algoliasearch';
import indexer from 'sanity-algolia';
// import { isValidRequest, isValidSignature } from '@sanity/webhook';

export const searchClient = algoliasearch(
  'MX9C0DBFF5',
  process.env.ALGOLIA_ADMIN_KEY || '',
  {}
);

if (!process.env.ALGOLIA_SANITY_SHARED_SECRET) {
  throw new Error('ALGOLIA_SANITY_SHARED_SECRET is not set');
}

// const secret = process.env.ALGOLIA_SANITY_SHARED_SECRET;

/**
 *  This function receives webhook POSTs from Sanity and updates, creates or
 *  deletes records in the corresponding Algolia indices.
 */
const handler = (req: VercelRequest, res: VercelResponse) => {
  // if (!isValidRequest(req, secret)) {
  //   res.status(401).json({ success: false, message: 'Invalid signature' });
  //   return;
  // }
  if (req.headers['content-type'] !== 'application/json') {
    res.status(400);
    res.json({ message: 'Bad request' });
    return;
  }

  // Configure this to match an existing Algolia index name
  const algoliaIndex = searchClient.initIndex('blog_posts');

  const sanityAlgolia = indexer(
    // The first parameter maps a Sanity document type to its respective Algolia
    // search index. In this example both `post` and `article` Sanity types live
    // in the same Algolia index. Optionally you can also customize how the
    // document is fetched from Sanity by specifying a GROQ projection.
    //
    // In this example we fetch the plain text from Portable Text rich text
    // content via the pt::text function.
    //
    // _id and other system fields are handled automatically.
    {
      post: {
        index: algoliaIndex,
        projection: `{
          title,
          "slug": slug.current,
          "body": pt::text(body),
          "cover": coverImage.asset->url,
          "categories": categories[]->{ title },
          "summary": pt::text(summary)
          }`,
      },
      // For the article document in this example we want to resolve a list of
      // references to authors and get their names as an array. We can do this
      // directly in the GROQ query in the custom projection.
    },

    // The second parameter is a function that maps from a fetched Sanity document
    // to an Algolia Record. Here you can do further mutations to the data before
    // it is sent to Algolia.
    (document: SanityDocumentStub) => {
      // switch (document._type) {
      //   case 'post':
      //     return document;
      //   default:
      return document;
      // }
    },
    // Visibility function (optional).
    //
    // The third parameter is an optional visibility function. Returning `true`
    // for a given document here specifies that it should be indexed for search
    // in Algolia. This is handy if for instance a field value on the document
    // decides if it should be indexed or not. This would also be the place to
    // implement any `publishedAt` datetime visibility rules or other custom
    // visibility scheme you may be using.
    (document: SanityDocumentStub) => {
      if (document.isHidden) {
        return !document.isHidden;
      }
      return true;
    }
  );

  // Finally connect the Sanity webhook payload to Algolia indices via the
  // configured serializers and optional visibility function. `webhookSync` will
  // inspect the webhook payload, make queries back to Sanity with the `sanity`
  // client and make sure the algolia indices are synced to match.

  const postId = req.body._id;
  const query = `* [_id == $postId && !(_id in path("drafts.**"))][]._id`;

  return sanity.fetch(query, { postId }).then((id) =>
    sanityAlgolia
      // @ts-expect-error Issue with types
      .webhookSync(sanity, {
        ids: { created: [], updated: id, deleted: [] },
      })
      .then(() => res.status(200).json({ success: true, id }))
      .catch((err) => {
        res.status(500).json({ success: false, message: err.message });
      })
  );
};

export default handler;
