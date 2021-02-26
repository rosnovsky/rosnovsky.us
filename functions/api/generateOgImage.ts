// @ts-nocheck
import { NowRequest, NowResponse } from '@vercel/node'
import slugify from 'slugify'
const fetch = require('node-fetch');
const chromium = require('chrome-aws-lambda');
const cloudinary = require('cloudinary').v2

export default async (req: NowRequest, res: NowResponse) => {
  if (!req.query) {
    res.status(400).send({ status: 'No query params provided' })
    return;
  }

  console.info("==== Query ====", req.query)

  const title = req.query.title ? slugify(req.query.title) : "test-title"

  const forwardResponse = (imageUrl: string) => {
    console.info("=== Forward response ===", imageUrl)
    res.redirect(308, imageUrl
    )
  }
  const local = process.env.NODE_ENV === 'development'

  cloudinary.config({
    cloud_name: "rosnovsky",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  })

  
  const url = `https://rosnovsky.us`
  const imageParams = objectToParams(req.query)
  console.log("==== Image Params ====", imageParams)


  const uploadImage = async function(title: string, buffer: Buffer) {
    const cloudinaryOptions = {
      public_id: `social-images/${title.toLowerCase()}`,
      unique_filename: false
    }
    console.log(`=== Uploading ${title} to Cloudinary ===`)
    return await cloudinary.uploader.upload(buffer, cloudinaryOptions)
      .then((response: Response) => response.url)
  }

  const takeScreenshot = async function(url: string) {
    console.info("==== Taking screenshot of this page ====", url)
    const browser = await chromium.puppeteer.launch({executablePath: local 
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,})
    const page = await browser.newPage()
    await page.setViewport({ height: 650, width: 1200 })
    await page.goto(url)
    const buffer: Buffer = await page.screenshot()
    await browser.close()
    return `data:image/png;base64,${buffer.toString('base64')}`
  }

  const getImage = async function(title: string) {
    const url = `https://res.cloudinary.com/rosnovsky/image/upload/social-images/${title}.png`
    return await fetch(url)
      .then((result: Response) => {
        if (result.status !== 404) {
          console.info(`Checked if ${title} exists in Cloudinary. It does, returning url: ${url}`)
          return url
        } else {
          return null
        }
      })
  }

  const existingImage: string = await getImage(title)
  if (existingImage) {
    console.log(`yay, ${title} already existed`)
    return forwardResponse(await getImage(title))
  }

  const screenshotBuffer = await takeScreenshot(`${url}/generateOgImage?${imageParams}`)

  const newImage: string = await uploadImage(title, screenshotBuffer)

  function objectToParams(object: any) {
    const params = new URLSearchParams()
    Object.entries(object).map((entry) => {
      let [key, value]: [key, value] = entry
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
