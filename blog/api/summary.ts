import { NowRequest, NowResponse } from '@vercel/node'

export default (request: NowRequest, response: NowResponse) => {
  // const { postId } = request.query

  // Fetch _rawBody, post id, slug and publishedAt from Sanity

  // If post not modified or created within the past 10 seconds, return 304 Not Modified and quit

  // Compose an HTML file of the _rawBody

  // Feed this HTML to ML

  // Take results feed them to Algolia and to generatedDescription field in Sanity to be used as post metadata

  response.status(200).send(JSON.stringify(request.headers))
}
