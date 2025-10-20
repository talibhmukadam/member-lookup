import { Locator } from '@playwright/test';
import { BaseAtom } from './base.atom';

export class TableRowAtom extends BaseAtom {
  constructor(locator: Locator) {
    super(locator);
  }

  async textContent(): Promise<string> {
    return (await this.locatorInstance().textContent())?.trim() ?? '';
  }

  async cellTexts(): Promise<string[]> {
    return this.locatorInstance().locator('td').allTextContents();
  }

  async click() {
    await super.click();
  }

  async hasText(fragment: string) {
    await this.locatorInstance().getByText(fragment, { exact: false }).waitFor();
  }
}
