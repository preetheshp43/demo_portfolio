import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\PC - 06\\.gemini\antigravity\\brain\\27a4b3c7-26a6-4156-b0c8-df099e177149\\screenshots';

async function verify() {
  console.log('Starting visual verification of InfiniteSpiral...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--use-gl=angle', '--use-angle=d3d11']
  });

  const page = await browser.newPage();
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.error('[BROWSER ERROR]', msg.text());
    }
  });

  page.on('pageerror', err => {
    consoleErrors.push(err.message);
    console.error('[PAGE ERROR]', err.message);
  });

  // Desktop view
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/');
  await page.evaluate(() => {
    try { sessionStorage.setItem('pp_portfolio_loaded', 'true'); } catch (e) {}
  });
  await page.goto('http://localhost:5173/#projects', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1200));

  // Scroll to SpiralShowcase element
  const showcaseElem = await page.$('.infinite-spiral');
  if (showcaseElem) {
    await showcaseElem.scrollIntoView();
    await new Promise(r => setTimeout(r, 800));
  }

  const desktopShot = 'C:\\Users\\PC - 06\\.gemini\\antigravity\\brain\\27a4b3c7-26a6-4156-b0c8-df099e177149\\screenshots\\spiral_desktop.png';
  await page.screenshot({ path: desktopShot });
  console.log('Saved:', desktopShot);

  // Mobile view
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/#projects', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 1000));
  const mobileShowcase = await page.$('.infinite-spiral');
  if (mobileShowcase) {
    await mobileShowcase.scrollIntoView();
    await new Promise(r => setTimeout(r, 800));
  }

  const mobileShot = 'C:\\Users\\PC - 06\\.gemini\\antigravity\\brain\\27a4b3c7-26a6-4156-b0c8-df099e177149\\screenshots\\spiral_mobile.png';
  await page.screenshot({ path: mobileShot });
  console.log('Saved:', mobileShot);

  await browser.close();
  console.log('Verification finished. Total console errors:', consoleErrors.length);
}

verify().catch(console.error);
