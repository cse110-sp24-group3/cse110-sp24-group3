import puppeteer, { Puppeteer } from 'puppeteer';

describe('Entry Component Tests', () => {
  let browser;
  let page;

  beforeAll(async() => {
    browser = await puppeteer.launch({headless: true});
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:5500/application/web/index.html');
    await page.setViewport({ width: 1080, height: 1024 });
  });

  afterAll(async() => {
    await browser.close();
  })

  test('Does the page start by telling the user that there are no journals?', async() => {
    await page.waitForSelector('#no-entry-text');
    const noEntryText = await page.$eval('#no-entry-text', el => el.textContent);
    expect(noEntryText).toContain('You have no Journals');
  });

  test('Does creating a new journal entry work?', async () => {
    //Click the 'new journal' button
    await page.click('#new-journal-button');
    //Wait for a new journal to be created
    await page.waitForSelector('.journal');
    //Click the 'create new entry button'
    await page.click('#create-new-entry')
    //Wait for the text entry area to be created
    await page.waitForSelector('.CodeMirror', {timeout:5000});
    //This test expects the text entry to not be null.
    const entryStarted = await page.$('.CodeMirror') != null;
    expect(entryStarted);
  });
});