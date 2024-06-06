# Decision Testing with Playwright ADR

## Issue
- Using Puppeteer for E2E testing with Electron is difficult and not supporter by Electron
- We need to create E2E testing in a short amount of time without too much work

## Assumptions
- Don't have a lot of time to setup testing with Puppeteer
- Playwright is only used for Electron E2E testing and we will still use jest for unit testing

## Decision


## Status

## Argument
- Electron offers support for Playwright: [https://www.electronjs.org/docs/latest/tutorial/automated-testing#using-playwright](https://www.electronjs.org/docs/latest/tutorial/automated-testing#using-playwright)
- The functionality of Playwright should be very similar to Puppeteer
- Playwright has its own test suite extremely similar to Jest
- Clear documentation so people can quickly get accustomed to it
- Pranav has already written examples for others to follow