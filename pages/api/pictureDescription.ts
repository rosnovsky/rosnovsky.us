import { VercelRequest, VercelResponse } from '@vercel/node';
import type { PictureDescription } from '../../index';

export default async (req: VercelRequest, res: VercelResponse) => {
  const ML_LINK =
    'https://westus.api.cognitive.microsoft.com/vision/v3.2/describe?maxCandidates=1&language=en&model-version=latest';

  if (req.query.image === undefined || req.query.image === '')
    return res.status(400).send({
      error: 400,
      message: `Image path not provided`,
      hint: `You need to provide a publically accessible image URL. Images could be JPG, PNG, GIF, or BMP (don't even ask). The function expects something like 'weekly-update-4/home.jpg' and prepends it with your site URL and path to the image folder, https://rosnovsky.us/static/images/ in my case. Resulting URL looks like this: https://rosnovsky.us/static/images/weekly-update-4/home.jpg.`,
    });

  console.log(`[API] Requesting description for ${req.query.image}`);
  try {
    const result: PictureDescription = await fetch(ML_LINK, {
      method: 'POST',
      body: JSON.stringify({
        url: `https://rosnovsky.us/static/images/${req.query.image}`,
      }),
      headers: [
        ['Ocp-Apim-Subscription-Key', process.env.AZURE_VISION_KEY],
        ['Content-Type', 'application/json'],
      ],
    }).then((result) =>
      result.status === 200
        ? result.json()
        : new Error(result.status.toString())
    );
    res.status(200).send({ result });
  } catch (error) {
    res.status(400).end({ error });
  }
};
