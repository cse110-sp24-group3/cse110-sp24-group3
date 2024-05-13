# MVP Creation 05/03/2024
### Attendance

**Members Present:**
- [Cameron B]
- [James O]
- [Jesus A]
- [Logan C]
- [Nicholas Q]
- [Pranav R]
- [Rei L]

**Members Absent:**
- [Sean T]
- [Isabelle L]
- [Aaron A]
- [Benjamin H]

### Location & Time
- Location: Zoom
- Time: 8 - 8:45 PM

### Meeting Agenda
1. Discuss the User Personas, and project files
2. Create the MVP: Front End, Back End, Actions/Flows, Platform

### Discussion Points
- Front End:
    - Different journals on the left
    - Timeline journal entries (chronological) homepage
    - Create journal’ entry button
    - Basic journal creation interface
    - Viewing past journal
- Back End:
    - Use CodeMirror
    - Save user’s journals and entries in local storage
    - Ability to export journals and import journals
- Actions/Flow:
    - Clicking the + button from the main page would bring the user to the Entry page
    - Clicking the save button in the Entry page would add the entry to the Main Page with the Timeline View
    - Selecting an entry from the Main page would then clicking the Edit button would bring the user back to the Entry page with all of the data populated such as Title, date, any texts in the text field
    - Clicking the import icon, would bring up the Import page, allowing users to import files from their computer
    - Clicking the export icon, would zip all of the selected documents and save it on the user’s computer
- Platform:
    - Electron JS application which is served on OSX / Windows operating system
    - Markdown processing via https://www.npmjs.com/package/codemirror?activeTab=dependencies core package is code mirror and internal dependencies.