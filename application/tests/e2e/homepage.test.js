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

