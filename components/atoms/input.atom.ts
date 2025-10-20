import { Locator } from '@playwright/test';
import { BaseAtom } from './base.atom';

export class InputAtom extends BaseAtom {
  constructor(locator: Locator) {
    super(locator);
  }

  async fill(value: string) {
    await this.locatorInstance().fill(value);
  }

  async clear() {
    await this.locatorInstance().clear();
  }
}
