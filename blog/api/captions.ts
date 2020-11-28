import { NowRequest, NowResponse } from '@vercel/node'
import sanityClient from '@sanity/client'

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

export default async (request: NowRequest, response: NowResponse) => {
  // Triggered on publish from Sanity via a webhook
  
  // TODO: validate body
  const { ids }: Payload = request.body;
  
  // @ts-ignore
  const image = await client.getDocument(ids.updated[0])
  .then(image => {
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
