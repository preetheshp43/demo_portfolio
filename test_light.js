import puppeteer from 'puppeteer-core';

async function run() {
  const browser = await puppeteer.launch({
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    headless: 'new',
    args: ['--use-gl=angle', '--use-angle=d3d11']
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:5173/');
  await page.evaluate(() => {
    try { sessionStorage.setItem('pp_portfolio_loaded', 'true'); } catch (e) {}
  });
  await page.goto('http://localhost:5173/', { waitUntil: 'networkidle0' });
  await new Promise(r => setTimeout(r, 600));

  const toggleBtn = await page.$('button[title*="mode"]');
  if (toggleBtn) {
    await toggleBtn.click();
    console.log('Clicked toggle button!');
    await new Promise(r => setTimeout(r, 800));
  }

  await page.screenshot({ path: 'C:/Users/PC - 06/.gemini/antigravity/brain/27a4b3c7-26a6-4156-b0c8-df099e177149/screenshots/portfolio_light_mode.png' });
  console.log('Saved portfolio_light_mode.png');
  await browser.close();
}

run().catch(console.error);
