const puppeteer = require('puppeteer');

async function generatePDF(url) {
  const browser = await puppeteer.launch({ headless: true }); // Puppeteer can only generate pdf in headless mode.
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle2' });
  const pdfConfig = {
    path: 'resume.pdf', // Saves pdf to disk.
    format: 'letter',
    margin: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  };
  await page.emulateMediaType('print');
  await page.pdf(pdfConfig);
  await browser.close();
}

(async () => {
  const url = `file://${__dirname}/build/index.html`;
  await generatePDF(url);
})();
