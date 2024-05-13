# Decision Back End Tech StackADR

## Issue
- Some of the requirements for the journal app project is that we Markdown as the main language for the users to take notes. That means we have to be able to parse all of the markdown syntax
- We wanted to save the developer's journal, and entries
- Ability to export and import journals

## Assumptions
- Creating a parser from scratch in 3-4 weeks is very time consuming, and very hard to do in terms of testing and implementation
- It's important for users to be able to view past journals and entries

## Decision
- Two decisions for markdown parser came up where we find a parser that doesn't have a lot of dependencies or we write our own parser
- Another decision we made was saving the journal and entries in local storage

## Status
- Approved: we use CodeMirror as our Back End services to be able to do live rendering of all Markdown syntax such as Bolding, Italic, import images, etc
- Approved: saving journal and entries in local storage

## Argument
- Using CodeMirror allows us developers to use the live rendering implementation meaning that when a user clicks enter or space after using any Markdown syntax, it will automatically convert the text to a markdown file
- Using localStorage will allow any journals and entries to be saved locally, and not have to use any database framework
- CodeMirror allows the journals, entries to be exported and imported to match the file type