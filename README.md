# Member Lookup

Minimal Playwright-based suite for verifying the Member Lookup experience.

## Getting Started
- Install dependencies: `npm install`
- Install Playwright browsers: `npx playwright install --with-deps`

## Usage
- Run end-to-end tests: `npx playwright test`
- Review artifacts in `test-results/` after a run

## Architecture
- Playwright test runner configured via `playwright.config.ts`
- Test data isolated under `testData/` and localized strings in `i18n/`
- Component page objects and helpers grouped within `components/`

## Folder Structure
- `tests/`: Specs and fixtures driving the Member Lookup scenarios
- `components/`: Shared UI interactions and utilities reused across specs
- `keywords/`: Domain-specific actions composed into reusable steps
- `testData/`: Static datasets referenced by tests
- `i18n/`: Locale bundles for translating inputs and expectations
