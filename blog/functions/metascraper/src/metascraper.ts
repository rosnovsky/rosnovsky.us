import { APIGatewayProxyEvent, APIGatewayProxyCallback } from 'aws-lambda'
const metascraper = require('metascraper')([
  require('metascraper-author')(),
  require('metascraper-date')(),
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-logo')(),
  require('metascraper-clearbit')(),
  require('metascraper-publisher')(),
  require('metascraper-title')(),
  require('metascraper-url')()
])

const got = require('got')

exports.handler = async function(event: APIGatewayProxyEvent) {
  const targetUrl = event.queryStringParameters.url

  const { body: html, url } = await got(targetUrl)
  const metadata = await metascraper({ html, url })
  console.log(metadata)
  console.log(event)

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: metadata
    })
  }
}
