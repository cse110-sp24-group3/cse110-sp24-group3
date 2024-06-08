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

// testing the past entries component

test('Past entry component is correctly added to homepage with correct title', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();

    const addEntryBtn = await page.locator('.add-note');
    await addEntryBtn.click();

    const titleInput = await page.locator('#title-input');
    await titleInput.fill('test-title');

    const saveBtn = await page.locator('#save-entry');
    await saveBtn.click();

    const pastEntries = await page.locator('.past-entries');
    const entry = pastEntries.locator('button');
    expect(await entry.innerText()).toBe('test-title');

});

test('Correct number of past entries are created and displayed', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();

    const addEntryBtn = await page.locator('.add-note');
    await addEntryBtn.click();

    const titleInput = await page.locator('#title-input');
    await titleInput.fill('test-title');

    const saveBtn = await page.locator('#save-entry');
    await saveBtn.click();

    await addEntryBtn.click();
    await titleInput.fill('test-title-2');
    await saveBtn.click();

    const pastEntries = await page.locator('.past-entries');
    const entrySize = await pastEntries.locator('button').count();
    //check that 2 entries are properly created in past-entries div
    expect(entrySize).toBe(2);
    //check that the entry buttons have the proper respective titles
    expect(await pastEntries.locator('button').first().innerText()).toBe('test-title');
    expect(await pastEntries.locator('button').nth(1).innerText()).toBe('test-title-2');

});

test('Correct number of past entries are displayed when an entry is discarded', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();

    const addEntryBtn = await page.locator('.add-note');
    await addEntryBtn.click();

    const titleInput = await page.locator('#title-input');
    await titleInput.fill('test-title');

    const saveBtn = await page.locator('#save-entry');
    await saveBtn.click();

    await addEntryBtn.click();
    await titleInput.fill('test-title-2');
    const cancelNoteBtn = await page.locator('#cancel-note');
    await cancelNoteBtn.click();
    
    const pastEntries = await page.locator('.past-entries');
    const entrySize = await pastEntries.locator('button').count();
    //check that 2 entries are properly created in past-entries div
    expect(entrySize).toBe(1);
    //check that the entry buttons have the proper respective titles
    expect(await pastEntries.locator('button').first().innerText()).toBe('test-title');
});

test('Creating two entries with the same title should be allowed', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();

    const addEntryBtn = await page.locator('.add-note');
    await addEntryBtn.click();

    const titleInput = await page.locator('#title-input');
    await titleInput.fill('test-title');

    const saveBtn = await page.locator('#save-entry');
    await saveBtn.click();

    await addEntryBtn.click();
    await titleInput.fill('test-title');
    await saveBtn.click();

    const pastEntries = await page.locator('.past-entries');
    const entrySize = await pastEntries.locator('button').count();
    //check that 2 entries are properly created in past-entries div
    expect(entrySize).toBe(2);
    //check that the entry buttons have the same title
    expect(await pastEntries.locator('button').first().innerText()).toBe('test-title');
    expect(await pastEntries.locator('button').nth(1).innerText()).toBe('test-title');

});