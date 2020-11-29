import { SanityAssetDocument, SanityImageAssetDocument } from '@sanity/client'
import { SanityAsset } from '@sanity/image-url/lib/types/types'
import { NowRequest, NowResponse } from '@vercel/node'
const sanityClient = require('@sanity/client')
// import { SanityDocument } from '';

const client = sanityClient({
  projectId: 'n3o7a5dl',
  dataset: 'production',
  token: '', // or leave blank to be anonymous user
  useCdn: false // `false` if you want to ensure fresh data
})

type Payload = {
  transactionId: string;
  projectId: string;
  dataset: string;
  ids: {
    created: string[],
    deleted: string[],
    updated: string[],
    all: string[]
  }
}

type failedValidations = {
  failure: boolean
  sanityPayload: boolean,
  ids: boolean
}

export default async (request: NowRequest, response: NowResponse) => {
  // Triggered on publish from Sanity via a webhook

  const validationStatus = payloadValidation(request)

  if (validationStatus.failure === true) {
    return response.status(400).send(JSON.stringify({error: "Bad Request", message: `Request payload is missing ${validationStatus.sanityPayload ? "Project ID or Dataset (or the entire request body)" : "document ids (created, updated, deleted, or all"}`}))
  }

  const { ids }: Payload = request.body;

  // @ts-ignore
  const image = await client.getDocument(ids.updated[0])
  .then((image: SanityImageAssetDocument) => {
    response.status(200).send(JSON.stringify(image))
  })
  
  // if alt text === "none", proceed, otherwise return 304 Not Modified

  // Submit images to Azure Computer Vision
  
  // Process the response (create image objects with new metadata)
  
  // Save images with new metadata back to Sanity

  // client
  // .patch('bike-123') // Document ID to patch
  // .set({inStock: false}) // Shallow merge
  // .inc({numSold: 1}) // Increment field by count
  // .commit() // Perform the patch and return a promise
  // .then(updatedBike => {
  //   console.log('Hurray, the bike is updated! New document:')
  //   console.log(updatedBike)
  // })
  // .catch(err => {
  //   console.error('Oh no, the update failed: ', err.message)
  // })
  
  // Eventually, move to Cloudflare Timed functions: a cron job would run periodically and update image captions

}

const payloadValidation = (payload: NowRequest): failedValidations => {
  // Payload Validation
  if(payload.body === undefined) return {failure: true, sanityPayload: true, ids: false}

  if(payload.body.ids === undefined || payload.body.projectId === undefined || payload.body.dataset === undefined) return {failure: true, ids: false, sanityPayload: true} 

  const { ids }: Payload = payload.body;
  
  if (ids === undefined || !('created' in ids) || !('updated' in ids) || !('deleted' in ids) || !('all' in ids)) return {failure: true, ids: true, sanityPayload: false }

  if(ids.all.length === 0 || (ids.created.length === 0 && ids.updated.length === 0 && ids.deleted.length === 0)) return {failure: true, ids: true, sanityPayload: false }

  return {failure: false, sanityPayload: false, ids: false}
}
