const { test, expect, _electron: electron } = require('@playwright/test')

/** @type {import('@playwright/test').ElectronApplication} */
let electronApp;

/** @type {import('@playwright/test').Page} */
let page;

test.beforeAll(async () => {
  electronApp = await electron.launch({ args: ['.'] })


  // Wait for the first BrowserWindow to open
  // and return its Page object
  page = await electronApp.firstWindow()
  await new Promise(r => setTimeout(r, 2000));
});

test.afterAll(async () => {
  // close app
  await electronApp.close()
});

test('No journals exist', async () => {
  const text = await page.locator('.new-journal > span');
  expect(await text.innerText()).toBe('New Journal')
});