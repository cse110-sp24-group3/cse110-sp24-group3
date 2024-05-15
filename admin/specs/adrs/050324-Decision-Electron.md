# Decision Electron ADR

## Issue
- We have limited tech stack that we can use to deploy our overall project
- Many of us do not have experience in DevOps or Deployment of projects
    - Some of us only knows Electron
- We want our project to be a web-based application, not really supporting mobile application

## Assumptions
- Web based application, only on the deskstop
- Local first, data will be stored in the browser or in user's device

## Decision
- Use Electron to deploy our application since we are only limited to HTML, CSS, and JavaScript
- Use Electron's packages and distribution to make CI/CD easier
- Cameron will be mainly working on this since he knows the most about Electron's framework

## Status
- Approved: using Electron to deploy the journal app
- Approved: Cameron will be the PIC in charge of creating the framework to deploy and other packages that needs to be integrated

## Argument
- Cameron knows most about Electron since he has used it at work
    - Great desktop application framework to deploy web technologies such as HTML, CSS, JavaScript
- There are many packages in the application that we, as a team, can use to deploy faster, and easier
    - This means that deployment will be safer because there are a lot of layers to go through for checking purposes before the application is deployed for users to use
- Easy usability and maintainability for our project