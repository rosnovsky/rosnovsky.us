import { NowRequest, NowResponse } from '@vercel/node'

export default (request: NowRequest, response: NowResponse) => {
  // const { postId } = request.query

  // Fetch opengraph, title, date, excerpt and cover image from Sanity

  // If opengraph already exists and last updated date is not within the past 10 seconds, return 304 Not Modified and quit

  // Compose a string of parameters for Cloudinary to generate an opengraph image
  
  // Take results and put them back into Sanity as opengraph image for the post, opengraph description, URL, author and such

  response.status(200).send(request.body)
}
