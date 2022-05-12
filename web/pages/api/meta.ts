import metascraper from 'metascraper';
import title from 'metascraper-title';
import siteUrl from 'metascraper-url';
import image from 'metascraper-image';
import description from 'metascraper-description';
import clearbit from 'metascraper-clearbit';
import logo from 'metascraper-logo';
import publisher from 'metascraper-publisher';
import got from 'got';
import { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const targetUrl = req.query.url as string;

  try {
    if (targetUrl === undefined || targetUrl === '')
      throw new Error('URL not provided');
    const { body: html, url } = await got(targetUrl);

    const configuredMetascraper = metascraper([
      title(),
      siteUrl(),
      publisher(),
      image(),
      logo(),
      description(),
      clearbit(),
    ]);

    const metadata = await configuredMetascraper({ html, url });
    res.status(200).send({ metadata });
  } catch (error: any) {
    console.error(error);
    res.status(400).send({ error: error?.message || error });
  }
}
