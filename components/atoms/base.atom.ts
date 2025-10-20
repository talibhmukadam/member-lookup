import { Locator } from '@playwright/test';

export class BaseAtom {
  constructor(protected readonly locator: Locator) {}

  async click(options?: Parameters<Locator['click']>[0]) {
    await this.locator.click(options);
  }

  async forceClick() {
    await this.locator.click({ force: true });
  }

  async scrollIntoViewIfNeeded() {
    await this.locator.scrollIntoViewIfNeeded();
  }

  locatorInstance() {
    return this.locator;
  }
}
