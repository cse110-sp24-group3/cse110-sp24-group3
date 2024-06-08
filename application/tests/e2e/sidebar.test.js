import { test, expect, _electron as electron } from '@playwright/test';

/** @type {import('@playwright/test').ElectronApplication} */
let electronApp;

/** @type {import('@playwright/test').Page} */
let page;

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ['.'] })


  // Wait for the first BrowserWindow to open
  // and return its Page object
  page = await electronApp.firstWindow()
  await new Promise(resolve => setTimeout(resolve, 2000));
});

test.afterAll(async () => {
  // close app
  await electronApp.close()
});

test('Journal Button exists', async () => {
  const text = await page.locator('.new-journal > span');
  expect(await text.innerText()).toBe('New Journal')
});

test('No journals exist', async () => {
  const journals = await page.locator('.journal');
  const journalArr = await journals.all();
  expect(journalArr).toHaveLength(0)
});

test('1 journal exists', async () => {
  const button = await page.locator('.new-journal');
  await button.click();
  const journals = await page.locator('.journal');
  const journalArr = await journals.all();
  expect(journalArr).toHaveLength(1)
});

test('Click changes title text', async () => {
  const titleText = await page.locator('#journal-title')
  await expect(await titleText.innerText()).toBe('Journal #0');
});

test('2 journals exists', async () => {
  const button = await page.locator('.new-journal');
  await button.click();
  const journals = await page.locator('.journal');
  const journalArr = await journals.all();
  expect(journalArr).toHaveLength(2);
});

