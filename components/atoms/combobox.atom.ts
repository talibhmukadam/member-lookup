import { Locator, Page } from '@playwright/test';
import { BaseAtom } from './base.atom';
import { ButtonAtom } from './button.atom';

export class ComboboxAtom extends BaseAtom {
  constructor(locator: Locator, private readonly page: Page) {
    super(locator);
  }

  async open() {
    await this.locatorInstance().click();
  }

  async selectOptionByText(text: string) {
    const option = this.page.getByRole('option', { name: text, exact: true });
    const optionAtom = new ButtonAtom(option);
    await optionAtom.scrollIntoViewIfNeeded();
    await optionAtom.click();
  }
}
