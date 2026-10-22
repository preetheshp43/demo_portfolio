import puppeteer from 'puppeteer-core';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const SCREENSHOT_DIR = 'C:\\Users\\PC - 06\\.gemini\\antigravity\\brain\\27a4b3c7-26a6-4156-b0c8-df099e177149\\screenshots';

async function run() {
  console.log('Launching browser...');
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--use-gl=angle',
      '--use-angle=d3d11',
      '--enable-webgl',
      '--enable-features=Vulkan,DefaultANGLEVulkan',
      '--in-process-gpu'
    ],
  });

  const page = await browser.newPage();

  // Capture console logs and errors
  const consoleErrors = [];
  page.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error') {
      consoleErrors.push(text);
      console.error('[BROWSER ERROR]', text);
    } else {
      console.log('[BROWSER LOG]', text);
    }
  });

  page.on('pageerror', (err) => {
    consoleErrors.push(err.message);
    console.error('[PAGE ERROR]', err.message);
  });

  // 1. Loader at 40%
  console.log('1. Capturing loader at 40%...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/?preview_loader=40', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  const loader40Path = path.join(SCREENSHOT_DIR, 'loader_40.png');
  await page.screenshot({ path: loader40Path });
  console.log('Saved:', loader40Path);

  // 2. Loader Exit
  console.log('2. Capturing loader exit...');
  await page.goto('http://localhost:5173/?preview_exit=true', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 600));
  const loaderExitPath = path.join(SCREENSHOT_DIR, 'loader_exit.png');
  await page.screenshot({ path: loaderExitPath });
  console.log('Saved:', loaderExitPath);

  // 3. Hero on Desktop
  console.log('3. Capturing hero on desktop...');
  // Clear session storage to show normal transition or jump to hero
  await page.evaluate(() => {
    try {
      sessionStorage.setItem('pp_portfolio_loaded', 'true');
    } catch (e) {}
  });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200)); // wait for Halftone canvas and StrokeText
  const heroDesktopPath = path.join(SCREENSHOT_DIR, 'hero_desktop.png');
  await page.screenshot({ path: heroDesktopPath });
  console.log('Saved:', heroDesktopPath);

  // 4. Hero on Mobile
  console.log('4. Capturing hero on mobile...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise((r) => setTimeout(r, 1200));
  const heroMobilePath = path.join(SCREENSHOT_DIR, 'hero_mobile.png');
  await page.screenshot({ path: heroMobilePath });
  console.log('Saved:', heroMobilePath);

  await browser.close();
  console.log('Screenshots complete!');
  console.log('Total console errors encountered:', consoleErrors.length);
}

run().catch((err) => {
  console.error('Fatal error during capture:', err);
  process.exit(1);
});
