import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://memorandum.es/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'public/projects/memorandum.png' });
  await browser.close();
})();
