// @ts-nocheck
import { NowRequest, NowResponse } from '@vercel/node'
import slugify from 'slugify'
const chromium = require('chrome-aws-lambda');
const cloudinary = require('cloudinary').v2

export default async (req: NowRequest, res: NowResponse) => {
  const local = process.env.NODE_ENV === 'development'
  cloudinary.config({
    cloud_name: "rosnovsky",
    api_key: "361781174966398",
    api_secret: "qqlNOlEcTHDGeeTQXEgKHzgsh2c"
  })

  const putImage = async function(title, buffer) {
    const cloudinaryOptions = {
      public_id: `social-images/${title}`,
      unique_filename: false
    }
    console.log(`uploading ${title} to cloudinary`)
    return await cloudinary.uploader.upload(buffer, cloudinaryOptions)
      .then(response => response.url)
  }

  const takeScreenshot = async function(url) {
    const browser = await chromium.puppeteer.launch({executablePath: local 
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,})
    const page = await browser.newPage()
    await page.setViewport({ height: 420, width: 780 })
    await page.goto(url)
    const buffer = await page.screenshot()
    await browser.close()
    return `data:image/png;base64,${buffer.toString('base64')}`
  }

  if (!req.query) {
    res.status(400).send({ status: 'No query params provided' })
    return;
  }

  const getImage = async function(title: string) {
    const url = `https://res.cloudinary.com/rosnovsky/image/upload/social-images/${title}.png`
    return await fetch(url)
      .then(result => {
        if (result.status !== 404) {
          return url
        } else {
          return null
        }
      })
  }

  const title = slugify(req.query.title)

  const forwardResponse = imageUrl => {
    res.redirect(308, imageUrl
    )
  }


  const existingImage = await getImage(title)
  if (existingImage) {
    console.log(`yay, ${title} already existed`)
    return forwardResponse(existingImage)
  }

  const url = local ? `http://${req.headers.host}` : `https://${req.headers.host}`
  const imageParams = objectToParams(req.query)
  const screenshotBuffer = await takeScreenshot(`${url}/generateOgImage?${imageParams}`)
  const newImage = await putImage(title, screenshotBuffer)

  function objectToParams(object: any) {
    const params = new URLSearchParams()
    Object.entries(object).map((entry) => {
      let [key, value]: [key: any, value: any] = entry
      params.set(key, value)
    })
    return params.toString()
  }

  function paramsToObject(paramString: any) {
    const params = new URLSearchParams(paramString)
    const object = {}
    // @ts-ignore
    for (const [key, value] of params.entries()) {
      // @ts-expect-error
      object[key] = value
    }
    return object
  }

  console.log(`done with ${title}`)
  return forwardResponse(newImage)
}
