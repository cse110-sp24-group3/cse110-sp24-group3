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

test.beforeEach(async () => {
    // Reload the page before each test
    await page.reload();
    await new Promise(r => setTimeout(r, 2000)); // Wait for the page to fully reload
  });


// testing the no journal text component
test('No journal text is present at launch', async() => {
    const noJournalText = await page.locator('#no-entry-text');
    expect(await noJournalText.isHidden()).toBe(false);
});
test('No journal text is absent when new journal is clicked', async() => {
    const noJournalText = await page.locator('#no-entry-text');
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();
    expect(await noJournalText.isHidden()).toBe(true);
});

//testing the no entry text component
test('No entry text is present after new journal is created', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();
    const noEntryText = await page.locator('.no-entry-text');
    expect(await noEntryText.isHidden()).toBe(false);
});

test('No entry text is absent when pressing new entry button', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();
    const noEntryText = await page.locator('.no-entry-text');
    const addEntryBtn = await page.locator('.add-note');
    await addEntryBtn.click();
    expect(await noEntryText.isHidden()).toBe(true);
});

test('No entry text is present after clicking new entry and discarding without creating an entry', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();
    const noEntryText = await page.locator('.no-entry-text');
    const addEntryBtn = await page.locator('.add-note');
    await addEntryBtn.click();

    const cancelChangeBtn = await page.locator('#myButton');
    await cancelChangeBtn.click();

    const cancelNoteBtn = await page.locator('#cancel-note');
    await cancelNoteBtn.click();
    expect(await noEntryText.isHidden()).toBe(false);
});

test('No entry text is absent after clicking new entry and saving a new entry', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();
    const noEntryText = await page.locator('.no-entry-text');
    const addEntryBtn = await page.locator('.add-note');
    await addEntryBtn.click();

    const saveBtn = await page.locator('#save-entry');
    await saveBtn.click();
    expect(await noEntryText.isHidden()).toBe(true);
});
