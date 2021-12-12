const chromium = require('chrome-aws-lambda');

const local = process.env.NODE_ENV === 'development';

export const takeScreenshot = async function (url) {
  const browser = await chromium.puppeteer.launch({
    executablePath: local
      ? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
      : await chromium.executablePath,
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    headless: chromium.headless,
  });
  const page = await browser.newPage();
  await page.setViewport({ height: 474, width: 843, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: 'load' });
  const buffer = await page.screenshot({
    type: 'jpeg',
    quality: 100,
  });
  await browser.close();
  return `data:image/jpg;base64,${buffer.toString('base64')}`;
};
