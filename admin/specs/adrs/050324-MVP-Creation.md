# MVP Creation 05/03/2024

## Front End
1. Different journals on the left
2. Timeline journal entries (chronologically) homepage
3. Create journal entry button
4. Basic journal creation interface
5. Viewing past journal

## Back End
1. Use CodeMirror
2. Save user's journals and entries in local storage
3. Ability to export journals and import journals

## Actions/Flows
1. Clicking the + button from the main page would bring the user to the Entry page
2. Clicking the save button in the Entry page would add the entry to the Main Page with the Timeline View
3. Selecting an entry from the Main page would then clicking the Edit button would bring the user back to the Entry page with all of the data populated such as Title, date, any texts in the text field
4. Clicking the import icon, would bring up the Import page, allowing users to import files from their computer
5. Clicking the export icon, would zip all of the selected documents and save it on the user’s computer

## Platform
1. Electron JS application which is served on OSX / Windows operating system
2. Markdown processing via https://www.npmjs.com/package/codemirror?activeTab=dependencies core package is code mirror and internal dependencies.