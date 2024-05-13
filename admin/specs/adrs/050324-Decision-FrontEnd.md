# Decision Front End Tech Stack ADR

## Issue
- We wanted a minimalistic journal app, but we only have about 3-4 weeks to finish
- We have a lot of features that we wanted to add that could add as a cool feature, but don't have the time to do it
- It is a User Focused, Local First, and CRUD application

## Assumptions
- Don't have a lot of time to create lots of new features
- Testing will be difficult to do if we add too many features on the app
- CRUD, Local First, and User Focused topics will be important

## Decision
- Focus on using raw HTML, CSS, and Javascript (no framework)
- Add important features in the MVP
    - Timeline journal entries (chronologically)
    - Basic journal creation interace
    - viewing past journal

## Status
- Approved: adding ONLY important features in the MVP
    - Timeline journal entries (chronologically)
    - Basic journal creation interace
    - viewing past journal

## Argument
- The project requirement stated that the journal app is a developer's journal meaning it needs to be created for developers
- The basic requirement of a journal is:
    - creating entries
    - creating new journals with the options to specify the name of it
    - viewing past journals (chronologically)
- We cannot have one interace to create both the journal and the entries, separate columns