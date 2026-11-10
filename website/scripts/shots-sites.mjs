import { chromium } from 'playwright';
import { mkdir } from 'node:fs/promises';

const targets = [
  ['wizzibiz', 'https://wizzibiz.hheylau.workers.dev/', 2500],
  ['gcf', 'https://gcf.hheylau.workers.dev/', 1500],
  ['rask', 'https://rask-bias.hheylau.workers.dev/', 2000],
  ['ats', 'https://altcar.github.io/ATS-bias-mitigate/', 1500],
  ['bus', 'https://altcar.github.io/Bus-live-feed/', 2500],
  ['learntk', 'https://learntk.vercel.app', 1500],
  ['ttsky', 'https://altcar.github.io/ttsky-sesh/', 1200],
];

await mkdir('shots/sites', { recursive: true });
const browser = await chromium.launch();

for (const [name, url, wait] of targets) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(wait);
    await page.screenshot({ path: `shots/sites/${name}.png` });
    console.log('captured', name);
  } catch (error) {
    console.log('failed', name, String(error).slice(0, 120));
  }
  await page.close();
}

await browser.close();
