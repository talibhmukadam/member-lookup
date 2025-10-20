import { Page, expect } from '@playwright/test';
import { LocaleStrings } from '../../i18n/types';

export class MemberNotFoundPage {
  constructor(private readonly page: Page, private readonly locale: LocaleStrings) {}

  async verifyMessage(message: string, heading = this.locale.ui.memberNotFoundHeading) {
    await expect(
      this.page.getByRole('heading', { name: heading, exact: true }),
    ).toBeVisible();
    await expect(this.page.getByText(message)).toBeVisible();
  }
}
