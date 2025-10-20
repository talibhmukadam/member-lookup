import { Locator } from '@playwright/test';
import { BaseAtom } from './base.atom';

export class ButtonAtom extends BaseAtom {
  constructor(locator: Locator) {
    super(locator);
  }

  async click(options?: Parameters<Locator['click']>[0]) {
    await super.click(options);
  }

  async evaluateClick() {
    await this.locatorInstance().evaluate((element: HTMLElement) => element.click());
  }
}
