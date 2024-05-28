import puppeteer from "puppeteer";
const browser = await puppeteer.launch({
  headless: false,
  defaultViewport: {width: 1920, height: 1080},
  slowMo: 10,
  userDataDir:"temporary"
});

const page = await browser.newPage();
await page.goto('https://duckduckgo.com', {waitUntil: 'networkidle2'});
await page.waitForSelector('#searchbox_input');

//console.log('ok');
await page.type('#searchbox_input', 'automation');

const btn = await page.waitForSelector('button[aria-label="Search"]');

await btn.click();

await page.waitForSelector('[data-testid="result-title-a"]');


const titleText = await page.evaluate(() => {
    const elements = document.querySelectorAll('[data-testid="result-title-a"]');
    const titleArr = [];

    elements.forEach(e=> {
        titleArr.push(e.querySelector('span').textContent);
    });
    return titleArr;
});

titleText.forEach((txt, i) => console.log(`${i+1}: ${txt}`));

await browser.close();
