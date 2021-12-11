import { VercelRequest, VercelResponse } from '@vercel/node';
import slugify from 'slugify';
import chromium from 'chrome-aws-lambda';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinary = require('cloudinary').v2;

interface OpenGraph {
  readonly query: { title: string };
  readonly imageUrl: string;
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (!req.query) {
    return res.status(400).send({ status: 'No query params provided' });
  }

  const title = slugify(req.query.title as OpenGraph['query']['title']);

  const forwardResponse = (imageUrl: OpenGraph['imageUrl']) => {
    console.log(imageUrl);
    res.redirect(308, imageUrl);
  };
  const local = process.env.NODE_ENV === 'development';
  cloudinary.config({
    cloud_name: 'rosnovsky',
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const url = local
    ? `http://${req.headers.host}`
    : `https://${req.headers.host}`;
  const imageParams = objectToParams(req.query);

  const uploadImage = async function (
    title: OpenGraph['query']['title'],
    buffer: string
  ) {
    const cloudinaryOptions = {
      public_id: `social-images/${title}`,
      unique_filename: false,
    };
    console.log(`uploading ${title} to cloudinary`);
    return await cloudinary.uploader
      .upload(buffer, cloudinaryOptions)
      .then((response) => response.url);
  };

  const takeScreenshot = async function (url) {
    const browser = await chromium.puppeteer.launch({
      executablePath: local
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : await chromium.executablePath,
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      headless: chromium.headless,
    });
    const page = await browser.newPage();
    await page.setViewport({ height: 630, width: 1200 });
    await page.goto(url);
    const buffer = await page.screenshot();
    await browser.close();
    return `data:image/png;base64,${buffer.toString('base64')}`;
  };

  const checkImage = async function (title: string) {
    const url = `https://res.cloudinary.com/rosnovsky/image/upload/social-images/${title}.png`;
    return await fetch(url).then((result) => {
      console.log(
        `Checked if ${title} exists in Cloudinary, got ${result.status} in return`
      );
      if (result.status !== 404) {
        return true;
      } else {
        return false;
      }
    });
  };

  const existingImage = await checkImage(title);
  if (existingImage) {
    console.log(`yay, ${title} already existed`);
    return forwardResponse(
      'https://res.cloudinary.com/rosnovsky/image/upload/social-images/${title}.png'
    );
  }

  const screenshotBuffer = await takeScreenshot(
    `${url}/generateOgImage?${imageParams}`
  );
  const newImage = await uploadImage(title, screenshotBuffer);

  function objectToParams(object: any) {
    const params = new URLSearchParams();
    Object.entries(object).map((entry) => {
      const [key, value]: [key: any, value: any] = entry;
      params.set(key, value);
    });
    return params.toString();
  }

  function paramsToObject(paramString: any) {
    const params = new URLSearchParams(paramString);
    const object = {};
    for (const [key, value] of params.entries()) {
      object[key] = value;
    }
    return object;
  }

  console.log(`done with ${title}`);
  return forwardResponse(newImage);
};
