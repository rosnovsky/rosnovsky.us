import chromium from 'chromium';

import { format } from 'date-fns';

export async function GenerateSocialCards(posts) {
  posts.map((post) => {
    const { socialCard, publishedAt, categories, mainImage, title } = post;
    const socialTitle = socialCard?.title || title;
    const socialSubtitle = socialCard?.subtitle || 'Read More...';
    const fetchUrl = fetch(
      `https://rosnovsky.us/api/generateOgImage?title=${encodeURIComponent(
        socialTitle
      )}&date=${format(Date.parse(publishedAt), 'dd MMM yyyy')}&category=${
        categories[0].title
      }&subtitle=${encodeURIComponent(
        socialSubtitle
      )}&coverImage=${encodeURIComponent(mainImage?.asset.url)}`,
      {
        mode: 'cors',
      }
    );
    const url = fetchUrl;
    return url;
  });
}

export const takeScreenshot = async function (url) {
  const browser = await chromium.puppeteer.launch({
    executablePath:
      process.env.NODE_ENV !== 'production'
        ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
        : await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  await page.setViewport({ height: 474, width: 843 });
  await page.goto(url);
  const buffer = await page.screenshot();
  await browser.close();
  return `data:image/png;base64,${buffer.toString('base64')}`;
};
