import { VercelRequest, VercelResponse } from '@vercel/node';
import sanityClient from '@sanity/client';

const client = sanityClient({
  projectId: 'n3o7a5dl',
  dataset: 'prod',
  apiVersion: '2021-10-21', // use current UTC date - see "specifying API version"!
  token: process.env.SANITY_TOKEN, // or leave blank for unauthenticated usage
  useCdn: process.env.NODE_ENV === 'production' ? true : false, // `false` if you want to ensure fresh data
});

const allowCors = (fn) => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = async (req: VercelRequest, res: VercelResponse) => {
  try {
    if (!req.body) {
      throw new Error('Body is required!');
    }

    const { title, image, _id } = req.body;

    const bookCover = await fetch(`${image}`, {
      method: 'GET',
      headers: {
        Authorization: process.env.ISBNDB_KEY || '',
      },
    });
    const blob = await bookCover.blob();
    const file = Buffer.from(await blob.arrayBuffer());

    await client.assets
      .upload('image', file, {
        filename: `${title}.jpg`,
      })
      .then(async (document) => {
        await client
          .patch(_id)
          .set({
            cover: {
              _type: 'image',
              asset: { _ref: document._id, _type: 'reference' },
            },
          })
          .commit()
          .then(() => {
            console.log(`✅ The cover image for '${title}' was uploaded!`);
          });
      })
      .catch((error) => {
        console.error('Upload failed:', error.message);
      });
    return res.status(200).send({ status: 'OK' });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ status: 'Oh no, something went wrong' });
  }
};

export default allowCors(handler);
