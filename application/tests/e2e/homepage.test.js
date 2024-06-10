import { test, expect, _electron as electron } from '@playwright/test';

/** @type {import('@playwright/test').ElectronApplication} */
let electronApp;

/** @type {import('@playwright/test').Page} */
let page;

const TEXT_INPUT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas eu metus commodo, rutrum lacus a, semper sem. Nunc aliquam iaculis viverra. Aliquam congue purus dolor, eu porta elit cursus vel. Praesent sagittis imperdiet mauris, non hendrerit est. Vestibulum aliquam at ex sit amet laoreet. Nulla eleifend justo...';

test.beforeAll(async () => {
	electronApp = await electron.launch({ args: ['.'] })


	// Wait for the first BrowserWindow to open
	// and return its Page object
	page = await electronApp.firstWindow()
	await new Promise(resolve => setTimeout(resolve, 2000));// eslint-disable-line
});

test.afterAll(async () => {
	// close app
	await electronApp.close()
});

test.beforeEach(async () => {
    // Reload the page before each test
    await page.reload();
    await new Promise(r => setTimeout(r, 2000)); // eslint-disable-line
  });


test('Can write and read 1 journal entry', async () => {
	test.slow();
	const newJournalButton = await page.locator('.new-journal');
	await newJournalButton.click();

	const newEntryButton = await page.locator('.add-note');
	await newEntryButton.click();

	const textArea = await page.locator('.CodeMirror-lines');
	await textArea.click();
	await textArea.pressSequentially(TEXT_INPUT);

	const saveJournalButton = await page.locator('#save-entry');
	await saveJournalButton.click();

	const oldJournalButton = await page.locator('.past-entries > button');
	await oldJournalButton.click();

	/* TODO: small bug where leading whitespace is stripped not sure if bug or feature */ //eslint-disable-line
	const entryArticle = await page.locator('.selected-entry-article');
	expect(await entryArticle.innerText()).toBe(TEXT_INPUT);
});

test('Can update journal entry', async () => {
	test.slow();
	const newJournalButton = await page.locator('.new-journal');
	await newJournalButton.click();

	const newEntryButton = await page.locator('.add-note');
	await newEntryButton.click();

	const textArea = await page.locator('.CodeMirror-lines');
	await textArea.click();
	await textArea.pressSequentially('123');

	const saveJournalButton = await page.locator('#save-entry');
	await saveJournalButton.click();

	const oldJournalButton = await page.locator('.past-entries > button');
	await oldJournalButton.click();

	const entryArticle = await page.locator('.selected-entry-article')
	expect(await entryArticle.innerText()).toBe(`${TEXT_INPUT}123`);
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
    //check that one entry is properly created in past-entries div
    expect(entrySize).toBe(1);
    //check that the entry button has the proper title
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

test('Name of current journal should be reflected on homepage', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();
    const JournalTitle = await page.locator('#journal-title');
    await expect(JournalTitle).toHaveText('Journal #0');
    await newJournalBtn.click();
    const SecondJournalTitle = await page.locator('#journal-title');
    await expect(SecondJournalTitle).toHaveText('Journal #1');
});

test('Entry Name and Date Logged text should appear after creating a journal', async() => {
    const newJournalBtn = await page.locator('#new-journal-button');
    await newJournalBtn.click();
    const EntryNameText = await page.locator('entry-name');
    const DateLoggedText = await page.locator('date-logged');
    await expect(EntryNameText).toHaveText('Entry Name');
    await expect(DateLoggedText).toHaveText('Date Logged');
});
